import mongoose from 'mongoose';
import config from './environment';

export const connectDB = async () => {
  try {
    await mongoose.connect(config.dbUri);
    console.log('📦 Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}; 