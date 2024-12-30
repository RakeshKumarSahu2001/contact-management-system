import { user } from "../Models/user.model.js"
import { validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({ path: "./.env" })

export const Register = async (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }

    const { email, password, name } = req.body;

    try {
        const isUserExist = await user.findOne({ email })
        if (isUserExist) {
            return res.status(400).json({ error: [{ msg: "User already exits" }] })
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new user({
            name: name,
            password: hashedPassword,
            email: email
        })
        const result = await newUser.save()
        //If u want to return the user detail then for privacy u have to make the password undefined else other people find out use password
        result._doc.password = undefined
        return res.status(201).json({ success: true, ...result._doc })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err.message })
    }




    // const body=req.body
    // if(!body){
    //     return res.status(400).json({error:"All field must be filled"})
    // }
    // console.log("Body",body)
    // try{
    //     const isExistEmail=user.findOne({email:body.email})
    //     if(!isExistEmail){
    //         return res.status(400).json({error:"User is already exist"})
    //     }
    //     const newUser=await user.create({
    //         name:body.name,
    //         email:body.email,
    //         password:body.password
    //     })
    //     return res.status(201).json({ msg: "User registered successfully", user: newUser })
    // }catch(err){
    //     // console.log(err)
    //     return res.status(500).json({ error: "Internal server error" });
    // }
}



export const Login = async (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }

    const { email, password } = req.body;

    try {
        const isUserExist = await user.findOne({ email })
        if (!isUserExist) {
            return res.status(400).json({ error: [{ msg: "User isn't registered" }] })
        }

        //hash the password
        const isPassword = await bcrypt.compare(password, isUserExist.password)
        if (!isPassword) {
            return res.status(400).json({ error: [{ msg: "Invalid password" }] })
        }

        const token = jwt.sign({ _id: isUserExist._id }, process.env.JWT_SECRET_KEY, { expiresIn: "3h" })


        //If u want to return the user detail then for privacy u have to make the password undefined else other people find out use password
        const isUser = { ...isUserExist._doc, password: undefined }
        return res.status(201).json({ success: true, isUser, token })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err.message })
    }
}


export const Auth = (req, res) => {
    return res.status(200).json({ success: true, user: { ...req.user._doc } })
}


export const userProfile = async (req, res) => {
    // console.log("body info :",req.user)
    if (!req.user) {
        return res.status(400).json({ error: "data not found" })
    }
    return res.status(200).json({ success: true, user: { ...req.user._doc } })
}


// Improved editprofile function
export const editprofile = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "No id found" });
    }
    try {
        const profileInfo = await user.findById(id).select('-password');
        if (!profileInfo) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json({ success: true, user: profileInfo });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Improved updatedUserProfile function
export const updatedUserProfile = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "User id not found" });
    }
    try {
        const updatedUserInformation = await user.findByIdAndUpdate(id, req.body, { new: true }).select('-password');
        if (!updatedUserInformation) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json({ success: true, updatedUserInformation });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
