import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { responseHandler } from '../helpers/response.js'
import categoryModel from '../models/category.js'
import upload from '../configs/multer.js'
import { verifyTokenAdmin } from '../middlewares/verifyToken.js'

const categoryRoute = express.Router()

categoryRoute.get(`/`,async(req,res,next)=>{
    try {
        const q= req.query.q
        const page= Number(req.query.page) || 1
        const limit= Number(req.query.limit) ||20
        const skip = (page - 1) * limit

        const resp = await categoryModel.find({
            title:{$regex:q, $options:'i'}
        }).skip(skip).limit(limit)


        return responseHandler(res,{status:StatusCodes.OK, result:resp})
    } catch (error) {
        next(error)
    }
})
categoryRoute.get(`/:id`,async(req,res,next)=>{
    try {
        const id = req.params.id
        const resp = await categoryModel.findById(id)

        return responseHandler(res,{status:StatusCodes.OK,result:resp})
        
    } catch (error) {
        next(error)
    }
})

categoryRoute.post(`/`,verifyTokenAdmin ,upload.single("file"),async(req,res,next)=>{
    try {
        const body = req.body
        const file = req.file
        let thumbnail = body?.thumbnail
        if(file){
            thumbnail = (await uploadFileToCloudinary(file,`category`)).secure_url
        }
        const resp = await categoryModel.create({...body,thumbnail})

        return responseHandler(res,{status:StatusCodes.OK,
            message:`Category created successfully`,
            result:resp})
    } catch (error) {
        next(error)
    }
})

categoryRoute.put(`/:id`,verifyTokenAdmin, async(req,res,next)=>{
    try {
        const id = req.params.id
        const body = req.body
        const file = req.file
        let thumbnail = body?.thumbnail
        if(file){
            thumbnail = (await uploadFileToCloudinary(file,`category`)).secure_url
            await deleteFileFromCloudinary(body.thumbnail,`category`)
        }
        const resp = await categoryModel.findByIdAndUpdate(id,({...body,thumbnail}),{new:true})

        return responseHandler(res,{status:StatusCodes.OK,
            message:`Category updated successfully`,
            result:resp})
        
    } catch (error) {
        next(error)
    }
})

categoryRoute.delete(`/:id`,verifyTokenAdmin, async(req,res,next)=>{
    try {
        const id = req.params.id
        const resp = await categoryModel.findByIdAndDelete(id,{new:true})

        return responseHandler(res,{status:StatusCodes.OK,
            message:`Category deleted successfully`,
            result:resp})
        
    } catch (error) {
        next(error)
    }
})


export default categoryRoute