import express from 'express';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.route('/').get((req, res) => {
  res.status(200).json('Hello from ArtworkRoute!');
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const apiKey = process.env.OPENAI_API_KEY;

    // Make a POST request to the OpenAI API to generate artwork.
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        prompt,
        n: 1,
        size: "512x512",
      },
      {
        responseType: 'arraybuffer', // Specify the response type as binary data
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    const imageBuffer = response.data; // The response data will be binary image data

    if (!imageBuffer || imageBuffer.length === 0) {
      res.status(500).json({ error: 'No artwork data available' });
      return;
    }

    // Set the appropriate content type header based on the image format you receive
    res.setHeader('Content-Type', 'image/jpeg'); // Adjust the content type as needed
    res.status(200).send(imageBuffer);
  } catch (error) {
    console.error('Error from OpenAI API:', error.message);

    if (error.response && error.response.data) {
      console.error('Response data:', error.response.data); // Log the response data for debugging
    } else {
      console.error('No response data available.'); // Log a message if no response data is available
    }

    res.status(500).send(error.message || 'Something went wrong');
  }
});

export default router;
