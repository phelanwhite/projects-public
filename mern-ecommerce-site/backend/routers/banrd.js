import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { responseHandler } from '../helpers/response.js'
import banrdModel from '../models/banrd.js'
import upload from '../configs/multer.js'
import { deleteFileFromCloudinary, uploadFileToCloudinary } from '../configs/cloudinary.js'
import { verifyTokenAdmin } from '../middlewares/verifyToken.js'

const brandRoute = express.Router()

brandRoute.get(`/`,async(req,res,next)=>{
    try {
        const q= req.query.q
        const page= Number(req.query.page) || 1
        const limit= Number(req.query.limit) ||20
        const skip = (page - 1) * limit

        const resp = await banrdModel.find({
            title:{$regex:q, $options:'i'}
        }).skip(skip).limit(limit)


        return responseHandler(res,{status:StatusCodes.OK, result:resp})
    } catch (error) {
        next(error)
    }
})
brandRoute.get(`/:id`,async(req,res,next)=>{
    try {
        const id = req.params.id
        const resp = await banrdModel.findById(id)

        return responseHandler(res,{status:StatusCodes.OK,result:resp})
        
    } catch (error) {
        next(error)
    }
})

brandRoute.post(`/`, verifyTokenAdmin, upload.single('file'), async(req,res,next)=>{
    try {
        const body = req.body
        const file = req.file
        let thumbnail = body?.thumbnail
        if(file){
            thumbnail = (await uploadFileToCloudinary(file,`brand`)).secure_url
        }
        const resp = await banrdModel.create({...body,thumbnail})

        return responseHandler(res,{status:StatusCodes.OK,
            message:`Brand created successfully`,
            result:resp})
    } catch (error) {
        next(error)
    }
})

brandRoute.put(`/:id`, verifyTokenAdmin, upload.single(`file`), async(req,res,next)=>{
    try {
        const id = req.params.id
        const body = req.body
        const file = req.file
        let thumbnail = body?.thumbnail
        if(file){
            thumbnail = (await uploadFileToCloudinary(file,`brand`)).secure_url
            await deleteFileFromCloudinary(body.thumbnail,`brand`)
        }
        const resp = await banrdModel.findByIdAndUpdate(id,{...body,thumbnail},{new:true})

        return responseHandler(res,{status:StatusCodes.OK,
            message:`Brand updated successfully`,
            result:resp})
        
    } catch (error) {
        next(error)
    }
})

brandRoute.delete(`/:id`, verifyTokenAdmin, async(req,res,next)=>{
    try {
        const id = req.params.id
        const resp = await banrdModel.findByIdAndDelete(id,{new:true})

        return responseHandler(res,{status:StatusCodes.OK,
            message:`Brand deleted successfully`,
            result:resp})
        
    } catch (error) {
        next(error)
    }
})


export default brandRoute