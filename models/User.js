
const mongoose = require('mongoose')


// === Schéma des utilisateurs ===
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
})

// Création des modèles
const User = mongoose.model('User', userSchema)

module.exports = User
