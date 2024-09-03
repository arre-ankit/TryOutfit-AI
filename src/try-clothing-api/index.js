import express from 'express';
import axios from 'axios';
import cors from 'cors';
import { Client } from '@gradio/client';

const app = express();
app.use(express.json({ limit: '10mb' }));

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.post('/process-images', async (req, res) => {
  try {
    const { amazon_img_url, model_img_url } = req.body;

    // Fetch the Amazon page and extract the image URL
    const amazonResponse = await axios.get(amazon_img_url, {
      headers: {
        // Include necessary headers
      }
    });

    const htmlContent = amazonResponse.data;
    const imgPattern = /https:\/\/m\.media\-amazon\.com\/images\/[^"]+\.jpg/g;
    const imageUrls = htmlContent.match(imgPattern) || [];
    
    // Extract the first image URL
    const pattern = /^https:\/\/m\.media-amazon\.com\/images\/I\/.+/;
    const amazonImageUrl = imageUrls.find(url => pattern.test(url)) || '';

    // Fetch images from URLs
    const response0 = await fetch(model_img_url);
    const exampleImage = await response0.blob();

    const response1 = await fetch(amazonImageUrl);
    const exampleImage_a = await response1.blob();

    const client = await Client.connect("Nymbo/Virtual-Try-On");

    // Improved error handling with detailed error logging
    const result = await client.predict("/tryon", [
      {"background":exampleImage,"layers":[],"composite":null}, 
      exampleImage_a,
      "Hello!!",
      true,
      true,
      25,
      25,
    ]).catch(error => {
      console.error("Prediction Error Details:", JSON.stringify(error, null, 2));
      throw new Error(`Prediction Error: ${error.message || JSON.stringify(error)}`);
    });

    // Return result
    res.json(result.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send(`An error occurred: ${error.message}`);
  }
});

app.listen(3001, () => {
  console.log('Backend service is running on port 3001');
});

export default app;
