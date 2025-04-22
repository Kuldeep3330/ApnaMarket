import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js';

const connectDB= async () =>{
    try {
        const connectionInst=await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          });
        console.log('MongoDB Connected ', connectionInst.connection.host);        
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

export {connectDB}