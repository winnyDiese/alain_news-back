const express = require('express')
const User = require('../models/Post') // ou '../models' si tu as suivi l'export multiple
const router = express.Router()

// GET tous les utilisateurs
router.get('/', async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 })
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// GET un utilisateur par ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' })
        res.json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// POST créer un nouvel utilisateur
router.post('/', async (req, res) => {
    const { username, email, password } = req.body
    try {
        const newUser = new User({ username, email, password })
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// PUT mettre à jour un utilisateur
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!updatedUser) return res.status(404).json({ message: 'Utilisateur non trouvé' })
        res.json(updatedUser)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// DELETE un utilisateur
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        if (!deletedUser) return res.status(404).json({ message: 'Utilisateur non trouvé' })
        res.json({ message: 'Utilisateur supprimé' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router
