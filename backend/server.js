import express from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import User from './user.js';
import { LoginUser, RegisterUser } from './accountRegisterAssets.js';

dotenv.config(); // ✅ Must be called before using process.env

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';

const allowedOrigins = [
  "http://localhost:3000",
  "https://gigibuy.vercel.app"
]

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.get('/profile', async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, {}, async (err, decoded) => {
    if (err) {
      console.error('❌ JWT verify error:', err);
      return res.status(403).json({ error: 'Token verification failed' });
    }

    try {
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (dbError) {
      console.error('❌ Database error:', dbError);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});

app.post('/register', RegisterUser);
app.post('/login', LoginUser);
app.post('/logout', (req, res) => {
  res.cookie('token', '').json('ok');
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
