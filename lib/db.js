
const mongoose = require('mongoose')

let isConnected = false

const connectDB = async () => {
    if(isConnected) return

    try {
        await mongoose.connect(process.env.MONGO_URL)
        isConnected = true
        console.log('✅ MongoDB connected');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        throw error;
    }
}

module.exports = connectDB
