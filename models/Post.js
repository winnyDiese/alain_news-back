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


const Post = mongoose.model('Post', postSchema)

// Export multiple
module.exports = Post