const mongoose = require('mongoose')

const commentsSchema = new mongoose.Schema({
    author: String,
    content: String,
    createdAt: {type: Date, default: Date.now}
})

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    createdAt: {type:Date, default: Date.now},
    comments: [commentsSchema],
    likes: {type:Number, default:0}
})

// module.exports = mongoose.model('Post', postSchema) 

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
const Post = mongoose.model('Post', postSchema)
const User = mongoose.model('User', userSchema)

// Export multiple
module.exports = { Post, User }