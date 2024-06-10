import express from 'express';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.route('/').get((req, res) => {
  res.status(200).json('Hello from Poem generator Route!');
});
/*
router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const apiKey = process.env.OPENAI_API_KEY;

    // Make a POST request to the OpenAI API to generate artwork.
    const response = await axios.post(
      'https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions',
      {
        prompt,
        max_tokens: 300,
        
      },
      {
        
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    if (response.status === 200) {
        const responseData = response.data;
        const generatedText = responseData.choices[0].text; 
        //console.log('Generated text:', responseData.choices[0].text);
        res.status(200).json({ suggestions: generatedText });
      } else {
        console.error('API request failed with status:', response.status);
        res.status(response.status).json({ error: 'API request failed' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
    

});
*/
router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const apiKey = process.env.OPENAI_API_KEY;

    // Make a POST request to the OpenAI API using chat/completions
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            "role": "user",
            "content": prompt
          }
        ],
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );
  
    if (response.status === 200 && response.data.choices.length > 0 ) {
      const generatedText = JSON.stringify(response.data.choices[0], null, 2);
      //console.log(generatedText);
      res.status(200).json({ suggestions: generatedText });
    } else {
      res.status(500).json({ error: 'API request failed' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
