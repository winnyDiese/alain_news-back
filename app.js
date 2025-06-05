const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const postRoutes = require('./routes/postRoutes')

const app = express()
app.use(cors({
  origin: 'http://localhost:3000'
}))
app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log('MongoDB connected !'))

app.use('/api/posts', postRoutes)

// app.listen(5000, ()=> console.log('Server started on port 5000'))
if (require.main === module) {
  app.listen(5000, () => console.log('Server running on port 5000'));
}

module.exports = app