const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
    if (isConnected) return; // ✅ bien écrit maintenant

    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log('✅ MongoDB connected');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        throw error;
    }
};

module.exports = connectDB;
