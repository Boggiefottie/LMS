import express from "express"
import { User } from "../model/user.model.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../util/generateToken.js"

export const register = async (req,res) => {
    try {
        const {name , email ,password} = req.body
        if (!name||!email||!password) {
            return res.status(400).json({
                success : false,
                message : "All fields required"
            })
        }
        const user = await User.findOne({email})
        if (user) {
           return res.status(400).json({
             succcess : false,
             message : "User already registered with this email"
           }) 
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({
            name : name ,
            email : email  ,
            password : hashedPassword
        })
        return res.status(201).json({
            success: true,
            message : "Account successfully created"
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Failed to register"
        })
    }
}
export const login = async (req,res) =>{
    try {
      const {email,password} = req.body
      if (!email||!password) {
        return res.status(400).json({
            success : false,
            message : "All fields required"
        })
    }
    const user = await User.findOne({email:email})
    if (!user) {
        return res.status(400).json({
            success : false,
            message : "Incorrect email or password"
        })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if(!isPasswordMatch) {
        return res.status(400).json({
            success : false,
            message : "Incorrect email or password"
        })
    }
    generateToken(res, user, `Welcome back ${user.name}`)

        
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Failed to login"
        })
    }
}