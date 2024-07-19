import express from 'express'
import Joi from 'joi'
import createHttpError from 'http-errors'
import { verifyToken } from '../middlewares/middeware.js'
import envConfig from '../configs/env.config.js'
import axios from 'axios'
import myListModel from '../models/myList.js'

const myListRouter = express.Router()

myListRouter.post(`/`, verifyToken,async(req,res,next)=>{
    try {
        const body = req.body
        const user = req.user

        // create new myList
        const newFavourite = await myListModel.create({user:user?._id,...body})
        return res.status(201).json({
            message:`List created successfully`,
            data:newFavourite})
    } catch (error) {
        next(error)
    }
})

myListRouter.put(`/:id`, verifyToken,async(req,res,next)=>{
    try {
        const id = req.params.id
        const body = req.body

        // create new myList
        const newFavourite = await myListModel.findByIdAndUpdate(id,body,{new:true})
        return res.status(200).json({
            message:`List updated successfully`,
            data:newFavourite})
    } catch (error) {
        next(error)
    }
})

myListRouter.delete(`/:id`, verifyToken,async(req,res,next)=>{
    try {
        const id = req.params.id

        const resp = await myListModel.findByIdAndDelete(id,{new:true})

        return res.status(201).json({
            message:`My List deleted successfully`,
            data:resp})
    } catch (error) {
        next(error)
    }
})

myListRouter.get(`/`, verifyToken,async(req,res,next)=>{
    try {
        const user = req.user
        const resp = await myListModel.find({
            user:user._id
        })

        return res.status(200).json(resp)
    } catch (error) {
        next(error)
    }
})

myListRouter.get(`/:id`, verifyToken,async(req,res,next)=>{
    try {
        const id =req.params.id
        const resp = await myListModel.findById(id)
        
        const options = {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${envConfig.TMDB_TOKEN}`,
            },
          };
      
          const dataResp =  resp?.items?.length>0? await Promise.all(
            resp?.items?.map(async (item) => {
              const url = `https://api.themoviedb.org/3/${item?.type}/${item?.id}`;
      
              const resp = await (await axios.get(url, options)).data;
              const newItem = {
                id: item?.id,
                type: item?.type,
                data:resp
              };
              
              return newItem;
            })
          ) : []
          
          const data = {
            title: resp.title,
            description: resp.description,
            items: dataResp
          }

        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
})

myListRouter.put(`/:id/add-item`, verifyToken,async(req,res,next)=>{
    try {
        const id =req.params.id
        const body = req.body
        const resp = await myListModel.findById(id)
        // check
        const existingItemInMyList = await myListModel.findOne({
            _id:id,
            items:{
                $elemMatch: {
                    id: body.id,
                    type: body.type
                }
            }
        })

        if(existingItemInMyList){
            console.log(11);
            return res.status(200).json({
                message:`Item added successfully`})
        }

        // add item in my list
        const newItem = await myListModel.findByIdAndUpdate(id,{
            $push:{items: body}
        },{new:true})
        return res.status(200).json({
            message:`Item added successfully`,
            data:newItem})
    } catch (error) {
        next(error)
    }
})

myListRouter.delete(`/:id/remove-item/`, verifyToken,async(req,res,next)=>{
    try {
        const id =req.params.id
        const itemId = req.query.itemId
        const itemType = req.query.itemType
        
        // remove item in my list
        const newItem = await myListModel.findByIdAndUpdate(id,{
            $pull:{items: {id:Number(itemId),type:itemType}}
        },{new:true})

        return res.status(200).json({
            message:`Item removed successfully`,
            data:newItem})

    } catch (error) {
        next(error)
    }
})

export default myListRouter