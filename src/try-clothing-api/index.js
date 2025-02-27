import express from 'express';
import axios from 'axios';
import cors from 'cors';
import { Client } from '@gradio/client';
import { fal } from "@fal-ai/client";

const app = express();
app.use(express.json({ limit: '10mb' }));

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

fal.config({
  credentials: process.env.FAL_AI_API
});
// Utility function to fetch and return blob data from a URL
const fetchImageAsBlob = async (url, retries = 3) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    return await response.blob();
  } catch (error) {
    console.error(`Error fetching image from ${url}:`, error);
    if (retries > 0) {
      console.log(`Retrying... (${3 - retries + 1})`);
      return fetchImageAsBlob(url, retries - 1); // Retry fetching the image
    }
    throw error; // Rethrow the error if no retries left
  }
};

app.post('/process-images', async (req, res) => {
  try {
    const { amazon_img_url, model_img_url } = req.body;

    // Fetch the Amazon page and extract the image URL with a timeout
    const amazonResponse = await axios.get(amazon_img_url, {
      timeout: 5000, // 5 seconds timeout
      headers: {
        // Include necessary headers
      }
    });

    const htmlContent = amazonResponse.data;
    const imgPattern = /https:\/\/m\.media\-amazon\.com\/images\/[^"]+\.jpg/g;
    const imageUrls = htmlContent.match(imgPattern) || [];
    
    const pattern = /^https:\/\/m\.media-amazon\.com\/images\/I\/.+/;
    const amazonImageUrl = imageUrls.find(url => pattern.test(url)) || '';

    if (!amazonImageUrl) {
      return res.status(400).json({ error: "No valid Amazon image URL found" });
    }

    // Fetch images in parallel and handle potential errors
    const [exampleImage, exampleImage_a] = await Promise.all([
      fetchImageAsBlob(model_img_url),
      fetchImageAsBlob(amazonImageUrl)
    ]);

    console.log(exampleImage,exampleImage_a)

    // const client = await Client.connect("Kwai-Kolors/Kolors-Virtual-Try-On");
    // const result = await client.predict("/tryon", { 
		// 		person_img: exampleImage, 
		// 		garment_img: exampleImage_a, 		
		// seed: 0, 		
		// randomize_seed: true, 
    // }).catch(error => {
    //   console.error("Prediction Error Details:", JSON.stringify(error, null, 2));
    //   throw new Error(`Prediction Error: ${error.message || JSON.stringify(error)}`);
    // });

    const result = await fal.subscribe("fashn/tryon", {
      input: {
        model_image: exampleImage,
        garment_image: exampleImage_a,
        category: "tops"
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs.map((log) => log.message).forEach(console.log);
        }
      },
    });
    

    res.json(result.data);
  } catch (error) {
    console.error('Error:', error);
    if (error.code === 'ENOTFOUND') {
      return res.status(400).send('The specified URL could not be found. Please check the URL and try again.');
    }
    res.status(500).send(`An error occurred: ${error.message}`);
  }
});

app.listen(3005, () => {
  console.log('Backend service is running on port 3005');
});

export default app;
