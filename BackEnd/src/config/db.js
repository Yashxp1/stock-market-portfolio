import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`🟢 MONGODB CONNECTED SUCCESSFULLY! ${conn.connection.host}`);
  } catch (error) {
    console.error('🔴 MONGODB CONNECTION ERROR!! ', error);
    process.exit(1);
  }
};
