const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    // Nombre total de posts
    const nbrePosts = await Post.countDocuments();

    // Nombre total d'utilisateurs
    const nbreUsers = await User.countDocuments();

    // Nombre total de commentaires (en parcourant tous les posts)
    const allPosts = await Post.find({}, 'comments'); // récupérer uniquement les commentaires
    const nbreComments = allPosts.reduce((total, post) => total + post.comments.length, 0);

    // 5 derniers posts
    const lastPosts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title createdAt');

    // 5 derniers utilisateurs
    const lastUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('username email createdAt');

    res.json({
      nbrePosts,
      nbreUsers,
      nbreComments,
      lastPosts,
      lastUsers
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
