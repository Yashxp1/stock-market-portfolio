import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
    console.log("auth middleware!!") //--------------cmt
  } catch (error) {
    res.status(401).json({ error: 'Invalid Token' });
  }
};

export default verifyToken;
