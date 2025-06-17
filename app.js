const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
// const connectDB = require('./lib/db')

require('dotenv').config()


const postRoutes = require('./routes/postRoutes')
const userRoutes = require('./routes/userRoutes')
const dashRoutes = require('./routes/dashRoutes')
const fileRoutes = require('./routes/fileRoutes')
const loginRoutes = require('./routes/auth')

const app = express()
app.use(cors({
    origin: 'https://alain-news-front.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log('MongoDB connected !'))

// connection to DB
// connectDB()

app.use('/api/posts', postRoutes)
app.use('/api/users', userRoutes)
app.use('/api/auth', loginRoutes)
app.use('/api/dashboard', dashRoutes)
app.use('/api/file', fileRoutes)

app.listen(5000, ()=> console.log('Server started on port 5000'))
// if (require.main === module) {
//   app.listen(5000, () => console.log('Server running on port 5000'));
// }

module.exports = app
