import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';
import User from './user.js';
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';

export async function RegisterUser(req,res) {
    const {username,password} = req.body

    if(!username || !password){
        return res.status(400).json({error: 'User and or passowrd required'})
    }

    try{
        const hashedPassword = bcrypt.hashSync(password, 10)
        const userDoc = await User.create ({ username,password:hashedPassword})

        const token = jwt.sign(
            {id: userDoc._id, username: userDoc.username},
            JWT_SECRET,
            {}
        );

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        }).json({id: userDoc._id, username})

        console.log('✅ Registered and logged in:', username);
    }catch(err){
        if(err.code == 11000){
            return res.status(400).json({error: 'Username allready exists'})
        }
        console.error('❌ Registration error:', err)
        res.status(500).json({ error: 'User registration failed' });
    }
}