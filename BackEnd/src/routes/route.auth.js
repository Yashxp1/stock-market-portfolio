import express from 'express';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
// import { Router } from 'express';
import verifyToken from '../middlewares/middleware.auth.js';

dotenv.config();
//auth
const authRouter = express.Router();

// authRouter.get('/', verifyToken, (req, res) => {
//   res.status(200).json({ message: 'Protected route accessed' });
// });

authRouter.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({ message: 'Please fill the fields' });
    }

    if (password.lenght < 6) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 6 characters' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({
      _id: user._id,
      username: user.username,
      password: user.password,
    });

  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

authRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
  
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed!' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    res.status(200).json({ message: 'LOGGED IN', token });
  } catch (error) {
    return res.status(500).json({ error: 'Login failed!' });
  }
});

export default authRouter;
