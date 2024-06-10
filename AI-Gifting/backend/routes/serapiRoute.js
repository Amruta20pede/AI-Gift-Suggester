import express from 'express';
import { getJson } from "serpapi";
import * as dotenv from 'dotenv';

dotenv.config();


const router = express.Router();

router.route('/').get((req, res) => {
  res.status(200).json('Hello from Serapi !');
});

router.route('/').post( async (req, res) => {
  try {
    const productKeyword = req.query.q; 
    const serpapiKey = process.env.SERPAPI_KEY;

    const params = {
    
      api_key: serpapiKey,
      engine: 'google_shopping',
      google_domain: 'google.com',
      q: productKeyword,
      hl: 'en',
      gl: 'in',
      location: 'India',
      tbs: 'mr:1,price:1,ppr_max:50000,merchagg:g113872638|m114193152|m7388148',
      num: '2',
    };

    //getJson(params, (json) => {
    //  console.log(json["organic_results"]);
      // Return the shopping results for this product
//const shoppingResults = json["organic_results"] || [];
     // res.json(shoppingResults);
   // });
   const response= await getJson(params);
  //console.log(response);
  res.json(response);

   //getJson(params, (json) => {
    //if (json && json["organic_results"]) {
    //  console.log(json);
      // Return the shopping results for this product
     // const shoppingResults = json["organic_results"];
     // console.log(shoppingResults);
     // res.json(shoppingResults);
      
   // } else {
      
    //  res.status(500).json({ error: 'Invalid response from SerpApi' });
    //}
 // });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
