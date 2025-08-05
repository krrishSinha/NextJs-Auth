import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// dotenv.config({ path: '../.env' }); // Ensure the path to your .env file is correct

const connectDB = async () => {
    
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }
        const response = await mongoose.connect(process.env.MONGODB_URI)

        console.log(`✅ MongoDB Connected: ${response.connection.host}`);

    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); // Exit process with failure
    }
}


export default connectDB;