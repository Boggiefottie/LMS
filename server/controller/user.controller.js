import express from "express"
import { User } from "../model/user.model.js"
import { Course } from "../model/course.model.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../util/generateToken.js"
import { deleteMedia, uploadMedia } from "../util/cloudinary.js"

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

export const logout = async (req,res) => {
    try {
       return res.status(200).cookie("token","",{maxAge:0}).json({
        message : "Logged out successfully",
        success : true
       }) 
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Failed to logout"
        })
        
    }
}
export const getUserProfile = async (req,res) => {
    try {
        const userId = req.id;// middleware isAuthenticated agr loggedin user hai to uske andr save hoga(user) in req.id
        const user = await User.findById(userId).select("-password").populate("enrolledCourses");// id se course ki info nikalni hai jo enrolledCourses se aegi to uske liye .populate use kiya hai
        if(!user){
            return res.status(404).json({
                message:"Profile not found",
                success:false
            })
        }
        return res.status(200).json({
            success:true,
            user
        })

        
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return res.status(500).json({
            success : false,
            message : "Failed to get the user's profile"
        })

    }
}
export const updateProfile = async (req,res) => {
    try {
        const userId = req.id;
        const {name} = req.body;
        const profilePhoto = req.file

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({
                success : false,
                message : "User not found"
            })
        }
        // extract public id of the old image from the url is it exists;
        if(user.photoUrl){
            const publicId = user.photoUrl.split("/").pop().split(".")[0] // extract public id from the url
            deleteMedia(publicId)
        }
         // upload new photto to cloudinary
         const cloudResponse  = await uploadMedia(profilePhoto.path)
         console.log(cloudResponse)
         const photoUrl = cloudResponse.secure_url;

        const updatedData = {name,photoUrl}

        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {new:true}).select("-password");

        return res.status(200).json({
            success:true,
            user:updatedUser,
            message:"Profile updated successfully."
        })
        
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return res.status(500).json({
            success : false,
            message : "Failed to update the user's profile"
        })
    }
}