import express from 'express'
import Joi from 'joi'
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from '../models/user.js'
import createHttpError from 'http-errors'
import envConfig from '../configs/env.config.js';
import { verifyToken } from '../middlewares/middeware.js';
import upload from '../configs/multer.config.js';
import { cloudinary_deleteFile, cloudinary_uploadFile } from '../configs/cloudinary.config.js';

const schemaRegister = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(new RegExp(`@gmail.com`)).email().required(),
    password: Joi.string().required()
})
const schemaLogin = Joi.object({
    email: Joi.string().pattern(new RegExp(`@gmail.com`)).email().required(),
    password: Joi.string().required()
})

const authRouter = express.Router()

authRouter.post(`/signup`,async(req,res,next)=>{
    try {
        const body = req.body

        // validate data
        const authValidate=schemaRegister.validate(body)
        if(authValidate.error){
            throw createHttpError(authValidate.error.message)
        }

        // check exists user
        const existsUser = await userModel.findOne({email: body.email})
        if(existsUser){
            throw createHttpError('User already exists')
        }

        // hash passwords
        const salt = await bcryptjs.genSalt(12)
        const hashedPassword = await bcryptjs.hash(body.password, salt)

        // create user
        await userModel.create({
            ...body,
            password: hashedPassword
        })

        return res.status(201).json({message:`User created`})
    } catch (error) {
        next(error)
    }
})

authRouter.post(`/signin`,async(req,res,next)=>{
    try {
        const body = req.body

        // validate data
        const authValidate=schemaLogin.validate(body)
        if(authValidate.error){
            throw createHttpError(authValidate.error.message)
        }

        // check exists user
        const existsUser = await userModel.findOne({email: body.email})
        if(!existsUser){
            throw createHttpError('Invalid email or password')
        }

        // check passwords
        const isMatch = await bcryptjs.compare(body.password, existsUser.password)
        if(!isMatch){
            throw createHttpError('Invalid email or password')
        }

        // create token and save token to cookie
        const token = jwt.sign({_id: existsUser._id}, envConfig.JWT_SECRET, {expiresIn: '1d'})
        res.cookie(`token`,token,{
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            maxAge: 2*24*60*60*1000
        })

        return res.status(200).json({
            message:`Login successfully`,
            data:existsUser
        })

    } catch (error) {
        next(error)
    }
})

authRouter.delete(`/signout`,async(req,res,next)=>{
    try {
        res.clearCookie("token")
        
        return res.status(200).json({
            message:`Logout successfully`
        })

    } catch (error) {
        next(error)
    }
})

authRouter.get(`/get-me`,verifyToken,async(req,res,next)=>{
    try {
        
        const user = req.user
        const resp = await userModel.findById(user._id)
        return res.status(200).json(resp)
    } catch (error) {
        next(error)
    }
})

authRouter.put(`/update-me`,verifyToken,upload.single('file'),async(req,res,next)=>{
    try {
        const body = req.body
        const user = req.user
        const file = req.file
        
        let avatar = body.avatar;
      if (file) {
        avatar = (await cloudinary_uploadFile(file, `user`)).url;
        await cloudinary_deleteFile(body.avatar, `user`);
      }
      
        const resp = await userModel.findByIdAndUpdate(user._id,{...body,avatar},{new:true})
        return res.status(200).json({
            message:`User updated successfully`,
            data:resp
        })
    } catch (error) {
        next(error)
    }
})

export default authRouter