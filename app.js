const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
// const connectDB = require('./lib/db')

require('dotenv').config()


const postRoutes = require('./routes/postRoutes')

const app = express()
app.use(cors({
//   origin: 'http://localhost:3000'
  origin: 'https://alain-news-front.vercel.app/'
  
}))
app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log('MongoDB connected !'))

// connection to DB
// connectDB()

app.use('/api/posts', postRoutes)

app.listen(5000, ()=> console.log('Server started on port 5000'))
// if (require.main === module) {
//   app.listen(5000, () => console.log('Server running on port 5000'));
// }

module.exports = app