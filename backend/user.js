import mongoose from 'mongoose';
// import { type } from 'os';

const { Schema, model } = mongoose;

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: String,
  password: String,
}, { timestamps: true })

const User = model('User', UserSchema);
export default User;
