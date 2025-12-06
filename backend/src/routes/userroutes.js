import express, { response } from 'express'
import User from '../models/usermodel.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

const router=express.Router();

router.post("/signup",async(req,res)=>{
    const {username,email,password}=req.body

    try {
        const existinguser=await User.findOne({email})
        if(existinguser){
            return res.status(400).json({message:"user already exists"})

        }

        const bcrypt = await import ('bcryptjs')
        const hashedpass=await bcrypt.hash(password,10)

        const newuser= new User({username,email,password:hashedpass})
        await newuser.save();
        res.status(201).json({message:"signup completed"})
    } catch (error) {
        res.status(500).json({message:"server error"})
    }
})

router.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"user not found"})
            
        }
        const ismatch=await bcrypt.compare(password,user.password);
        if(!ismatch){
            return res.status(401).json({message:"invalid credentials"})

        }
        const token=jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )
        res.json({message:"login successfull",
            token,
            username:user.username
        })

    } catch (error) {
        res.json({message:"server error"})
    }
})

router.get("/all",async(req,res)=>{
    try {
        
        const getusers=await User.find()
        res.json(getusers)
    } catch (error) {
        res.send("couldn't get ")
    }
})

router.delete("/all",async(req,res)=>{
    await User.deleteMany({})
    res.json({message:"deleted all users"})
})

export default router