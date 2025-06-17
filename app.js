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
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

// Headers supplémentaires (optionnel mais souvent utile)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://alain-news-front.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,Accept');
  next();
});


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
