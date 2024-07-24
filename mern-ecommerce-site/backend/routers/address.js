import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { responseHandler } from '../helpers/response.js'
import addressModel from '../models/address.js'
import { verifyToken } from '../middlewares/verifyToken.js'

const addressRoute = express.Router()

addressRoute.get(`/`,verifyToken,async(req,res,next)=>{
    try {
        const user = req.user
        const q= req.query.q
        const page= Number(req.query.page) || 1
        const limit= Number(req.query.limit) ||20
        const skip = (page - 1) * limit

        const resp = await addressModel.find({
            _id: user._id,
            title:{$regex:q, $options:'i'}
        }).skip(skip).limit(limit)


        return responseHandler(res,{status:StatusCodes.OK, result:resp})
    } catch (error) {
        next(error)
    }
})
addressRoute.get(`/:id`,verifyToken,async(req,res,next)=>{
    try {
        const id = req.params.id
        const resp = await addressModel.findById(id)

        return responseHandler(res,{status:StatusCodes.OK,result:resp})
        
    } catch (error) {
        next(error)
    }
})

addressRoute.post(`/`, verifyToken,async(req,res,next)=>{
    try {
        const user= req.user
        const body = req.body

        const resp = await addressModel.create({...body,user:user?._id})

        return responseHandler(res,{status:StatusCodes.OK,
            message:`Address created successfully`,
            result:resp})
    } catch (error) {
        next(error)
    }
})

addressRoute.put(`/:id`,verifyToken, async(req,res,next)=>{
    try {
        const id = req.params.id
        const body = req.body

        const resp = await addressModel.findByIdAndUpdate(id,{...body},{new:true})

        return responseHandler(res,{status:StatusCodes.OK,
            message:`Address updated successfully`,
            result:resp})
        
    } catch (error) {
        next(error)
    }
})

addressRoute.delete(`/:id`,async(req,res,next)=>{
    try {
        const id = req.params.id
        const resp = await addressModel.findByIdAndDelete(id,{new:true})

        return responseHandler(res,{status:StatusCodes.OK,
            message:`Address deleted successfully`,
            result:resp})
        
    } catch (error) {
        next(error)
    }
})


export default addressRoute