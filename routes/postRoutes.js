const express = require('express')
const Post = require('../models/Post')
const router = express.Router()


router.get('/', async (req, res) => {
    const posts = await Post.find().sort({createdAt: -1})
    res.json(posts)
})

router.post('/', async (req, res) => {
    const newPost = new Post(req.body)
    const savedPost = await newPost.save()
    res.status(201).json(savedPost)
})

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({ message: 'Comment not found' })
        }
        res.json(post)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


router.post('/:id/comments', async (req,res)=>{
    const {author, content} = req.body

    try {
        const post = await Post.findById(req.params.id)
        post.comments.push({author, content})
        await post.save()

        // res.status(201).json(updatedPost); 

    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// router.get('/:id', async (req,res)=>{
//     try {
//         const post = await Post.findById(req.params.id)
//         res.json(post)
//     } catch (error) {
//         res.status(404).json({message: 'Post not found !'})
//     }
// })


router.post('/:id/like', async (req,res)=>{
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            {$inc : {likes: 1}},
            {new: true}
        )
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.get('/:id/like', async (req,res)=>{
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            {$inc : {likes: 1}},
            {new: true}
        )
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// Supprimer un post (et tous ses commentaires automatiquement car ils sont embarqués)
router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post non trouvé' });
    }

    res.status(200).json({ message: 'Post supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Supprimer un commentaire spécifique d'un post
router.delete('/:postId/comments/:commentId', async (req, res) => {
  const { postId, commentId } = req.params;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post non trouvé' });
    }

    // Supprimer le commentaire du tableau
    post.comments = post.comments.filter(comment => comment._id.toString() !== commentId);
    
    await post.save();

    res.status(200).json({ message: 'Commentaire supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router