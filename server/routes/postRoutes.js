
import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route('/').get(async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
  }
});

router.route('/').post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;

    if (!name || !prompt || !photo) {
      console.log("something wrong");
      return res.status(400).json({ success: false, message: 'Required fields are missing' });
    }
console.log(name);
    const photoUrl = await cloudinary.uploader.upload(photo).catch(error => {
      console.error('Error uploading photo to Cloudinary:', error);
      throw new Error('Photo upload failed');
    });
    console.log(photoUrl.secure_url);

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.secure_url,
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    console.error('Error creating a post:', err);
    res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
  }
});


export default router;
