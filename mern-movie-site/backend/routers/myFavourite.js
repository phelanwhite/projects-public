import express from 'express'
import Joi from 'joi'
import myFavouriteModel from '../models/myFavourite.js'
import createHttpError from 'http-errors'
import { verifyToken } from '../middlewares/middeware.js'
import envConfig from '../configs/env.config.js'
import axios from 'axios'

const schema = Joi.object({
    user: Joi.string().required(),
    favouriteId: Joi.any().required(),
    favouriteType: Joi.string().required()
})

const myFavouriteRouter = express.Router()

myFavouriteRouter.post(`/`, verifyToken,async(req,res,next)=>{
    try {
        const body = req.body
        const user = req.user
        
        // validate data
        const favouriteValidate=schema.validate({user:user?._id,...body})
        if(favouriteValidate.error){
            throw createHttpError(favouriteValidate.error.message)
        }

        // check
        const existingFavourite = await myFavouriteModel.findOne({user:user._id,favouriteId:body.favouriteId, favouriteType:body.favouriteType})
        if(existingFavourite){
            return res.status(201).json({
                message:`Favourite added successfully`})
        }

        // create new favourite
        const newFavourite = await myFavouriteModel.create({user:user?._id,...body})
        return res.status(201).json({
            message:`Favourite added successfully`,
            data:newFavourite})
    } catch (error) {
        next(error)
    }
})

myFavouriteRouter.delete(`/:id`, verifyToken,async(req,res,next)=>{
    try {
        const id = req.params.id

        const resp = await myFavouriteModel.findByIdAndDelete(id,{new:true})

        return res.status(201).json({
            message:`Favourite deleted successfully`,
            data:resp})
    } catch (error) {
        next(error)
    }
})

myFavouriteRouter.get(`/`, verifyToken,async(req,res,next)=>{
    try {
        const user = req.user
        const resp = await myFavouriteModel.find({
            user:user._id
        })
        const options = {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${envConfig.TMDB_TOKEN}`,
            },
          };
      
          const movieList = await Promise.all(
            resp.map(async (item) => {
              const url = `https://api.themoviedb.org/3/${item?.favouriteType}/${item?.favouriteId}`;
      
              const resp = await (await axios.get(url, options)).data;
              const newMovie = {
                _id: item?._id,
                favouriteType: item?.favouriteType,
                data:resp
              };
      
              return newMovie;
            })
          );

        return res.status(200).json(movieList)
    } catch (error) {
        next(error)
    }
})

export default myFavouriteRouter