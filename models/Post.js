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

module.exports = mongoose.model('Post', postSchema) 