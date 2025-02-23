import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import errorHandler from './middlewares/middleware.errorHandler.js';
import stockRouter from './routes/route.stock.js';

import authRouter from './routes/route.auth.js';
import verifyToken from './middlewares/middleware.auth.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

const PORT = process.env.PORT || 3000;

app.use('/auth', authRouter);
app.use('/stocks', stockRouter);
// app.use('/api', stockRouter);
app.use('/protected', verifyToken, stockRouter);

app.use(errorHandler)




connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(
      '🔴 Failed to start server due to MongoDB connection error:',
      err
    );
  });
