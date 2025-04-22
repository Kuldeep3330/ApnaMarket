import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export const isAuthenticated = async (req, res, next) => {
  console.log("isAuch checked",req.headers.authorization);
  
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'not authorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id).select('-password');
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin')
     return res.status(403).json({ error: 'Forbidden' });
  next();
};
