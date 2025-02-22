import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import errorHandler from './middlewares/middleware.errorHandler.js';
import router from './routes/route.stock.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use("/api", router);


connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('🔴 Failed to start server due to MongoDB connection error:', err);
  });
