import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

const app = express();
const PORT = 4000;
dotenv.config()
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

console.log(process.env.MONGO_URI);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err))

app.post('/register', (req, res) => {
  const {username, password} = req.body
  console.log(username,password);
  res.json({ message: 'User received', username });
});

app.listen(PORT, () => {
  console.log(`✅ Listening on port ${PORT}`);
});
