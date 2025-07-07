

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
// const User = require('../models/user');?

export const signin = async (req,res) =>{
//   console.log("sinin");
  
    const {email,password}=req.body;
    
    try {
        const existingUser = await User.findOne({email});
        if(!existingUser) return res.status(404).json({message:"User dosen't exist."});

        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({message:"Invalid credentials."})

        // const token = jwt.sign({email:existingUser.email,id:existingUser._id},'test',{expiresIn: "10h"});
        const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id, name: existingUser.name }, 
        'test', 
        { expiresIn: "10h" }
        );

        res.status(200).json({result:existingUser,token});
    } catch (error) {
        res.status(500).json({message:'Something went wrong.'});
    }
}

export const signup = async (req,res) =>{
//   console.log("signup");
    const {email,password,confirmPassword,name} = req.body;

    try {
        const existingUser = await User.findOne({email});

        if(existingUser) return res.status(400).json({message:"User already exist."});

        if(password !== confirmPassword) return res.status(400).json({message:"Passwords don't match."});

        const hashedPassword = await bcrypt.hash(password,12);

        const result = await User.create({email,password:hashedPassword,name:name})

        // const token = jwt.sign({email:result.email,id:result._id},'test',{expiresIn: "1h"});
        const token = jwt.sign(
        { email: result.email, id: result._id, name: result.name }, 
        'test', 
        { expiresIn: "1h" }
        );
        console.log(result);

        return res.status(200).json({result,token});
    } catch (error) {
        console.log(error);
        
        res.status(500).json({message:'Something went wrong.'});
    }
}