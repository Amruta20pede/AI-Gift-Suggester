import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import ArtworkPost from '../mongodb/models/ArtworkPost.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route('/').get(async (req, res) => {
  try {
    const posts = await ArtworkPost.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
  }
});

router.route('/').post(async (req, res) => {
  try {
    const {  prompt, image } = req.body;
    const imageUrl = await cloudinary.uploader.upload(image);
    console.log('Image URL:', imageUrl); 
    const newPost = await ArtworkPost.create({
      
      prompt,
      image: imageUrl.url,
    });

    res.status(200).json({ success: true, data: newPost });
    console.log('Image URL:', imageUrl); 
  } catch (err) {
    res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
    console.log(err);
  }
});

export default router;