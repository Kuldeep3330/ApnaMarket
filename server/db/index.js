import mongoose from 'mongoose'

const connectDB= async () =>{
    try {
        await mongoose.connect('mongodb://localhost:27017/apnamarket');
        console.log('MongoDB Connected ✅');        
    } catch (error) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit on failure
    }
}