const express = require('express');
const Post = require('../models/Post');
const upload = require('../lib/cloudinary'); // 👈 import upload
const router = express.Router();

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, content } = req.body;
    const imageUrl = req.file.path; // ✅ URL Cloudinary

    const newPost = new Post({
      title,
      content,
      imageUrl,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router