import express from 'express'
import { verifyToken } from '../middlewares/middeware.js'
import envConfig from '../configs/env.config.js'
import axios from 'axios'
import commentModel from '../models/comment.js'

const commentRouter = express.Router()

commentRouter.post(`/`, verifyToken,async(req,res,next)=>{
    try {
        const body = req.body
        const user = req.user

        // create new comment
        const newFavourite = await commentModel.create({user:user?._id,...body})
        return res.status(201).json({
            message:`Comment created successfully`,
            data:newFavourite})
    } catch (error) {
        next(error)
    }
})

commentRouter.put(`/:id`, verifyToken,async(req,res,next)=>{
    try {
        const id = req.params.id
        const body = req.body

        // update new comment
        const newFavourite = await commentModel.findByIdAndUpdate(id,body,{new:true})
        return res.status(200).json({
            message:`Comment updated successfully`,
            data:newFavourite})
    } catch (error) {
        next(error)
    }
})

commentRouter.delete(`/:id`, verifyToken,async(req,res,next)=>{
    try {
        const id = req.params.id

        // delete comment
        const resp = await commentModel.findByIdAndDelete(id,{new:true})

        return res.status(200).json({
            message:`Comment deleted successfully`,
            data:resp})
    } catch (error) {
        next(error)
    }
})

commentRouter.get(`/`,async(req,res,next)=>{
    try {
        const id = req.query.id
        const type = req.query.type
        const resp = await commentModel.find({
            id:id,
            type:type
        }).populate('user').sort({
            updatedAt:"desc"
        })
        
        const options = {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${envConfig.TMDB_TOKEN}`,
            },
          };
      
        const url = `https://api.themoviedb.org/3/${type}/${id}/reviews?language=en-US&page=1`;
         const respReview = await (await axios.get(url,options)).data
         const convertReview = respReview?.results?.map((item)=>({
            _id:item?.id,
            user:{
                avatar:`https://image.tmdb.org/t/p/original/`+item?.author_details?.avatar_path,
                name:item?.author
            },
            comment:item?.content,
            updatedAt:item?.created_at
         }))

        return res.status(200).json([...resp,...convertReview])
    } catch (error) {
        next(error)
    }
})

export default commentRouter