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

    // Connect to Gradio client
    const client = await Client.connect("Kwai-Kolors/Kolors-Virtual-Try-On");
    const result = await client.predict("/tryon", {
      person_img: exampleImage,
      garment_img: exampleImage_a,
      seed: 0,
      randomize_seed: true,
    });

    // Return result
    res.json(result.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred');
  }
});

app.listen(3001, () => {
  console.log('Backend service is running on port 3001');
});

export default app;
