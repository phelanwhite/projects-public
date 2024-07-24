import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { responseHandler } from '../helpers/response.js'
import userModel from '../models/user.js'
import upload from '../configs/multer.js'
import { deleteFileFromCloudinary, uploadFileToCloudinary } from '../configs/cloudinary.js'
import { signin, signup } from '../helpers/validate.js'
import createHttpError from 'http-errors'
import envConfig from '../configs/env.js'
import jwt from 'jsonwebtoken'
import { verifyToken } from '../middlewares/verifyToken.js'

const authRoute = express.Router()

authRoute.post(`/signup`,async(req,res,next)=>{
    try {
        const body = req.body
        const schema = signup.validate(body)
        if(schema.error){
            throw createHttpError(schema.error.message)
        }

        const userExists = await userModel.findOne({ email: req.body.email})
        if(userExists){
            throw createHttpError(StatusCodes.CONFLICT, 'User already exists')
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const user = await userModel.create({
            ...body,
            password: hashedPassword
        })

        return responseHandler(res,{status:StatusCodes.CREATED, message:'User registered successfully'})

    } catch (error) {
        next(error)
    }
})

authRoute.post(`/signin`,async(req,res,next)=>{
    try {
        const body = req.body
        const schema = signin.validate(body)
        if(schema.error){
            throw createHttpError(schema.error.message)
        }

        const userExists = await userModel.findOne({ email: req.body.email})
        if(!userExists){
            throw createHttpError(StatusCodes.NOT_FOUND, 'User not found')
        }

        const isMatch = await bcrypt.compare(body.password, userExists.password)
        if(!isMatch){
            throw createHttpError(StatusCodes.NOT_FOUND, 'Invalid credentials')
        }

        const token = jwt.sign({ userId: userExists._id, role:userExists?.role }, envConfig.JWT_SECRET, { expiresIn: '1d' })
        res.cookie(`token`, token,{
            httpOnly: true,
            maxAge: 2*24*60*60*1000,
            sameSite:"strict",
            // secure:true
        })

        return responseHandler(res,{status:StatusCodes.OK, message:'User logged in successfully', result: userExists})

    } catch (error) {
        next(error)
    }
})

authRoute.post(`/signout`,async(req,res,next)=>{
    try {
        res.clearCookie(`token`)
        return responseHandler(res,{status:StatusCodes.OK, message:'User logged out successfully'})

    } catch (error) {
        next(error)
    }
})

authRoute.post(`/update-me`, verifyToken, upload.single('file'),async(req,res,next)=>{
    try {
        const user = req.user
        const body = req.body
        let avatar = body?.avatar
        if(file){
            avatar = (await uploadFileToCloudinary(file,`user`)).secure_url
            await deleteFileFromCloudinary(body.avatar,`user`)
        }

        const updatedUser = await userModel.findByIdAndUpdate(user._id, {...body, avatar }, { new: true })

        return responseHandler(res,{status:StatusCodes.OK, message:'User updated successfully', result: updatedUser})

    } catch (error) {
        next(error)
    }
})

export default authRoute