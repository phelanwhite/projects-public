import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import envConfig from "../configs/env.config.js";

export const verifyToken =async(req,res,next)=>{
    try {
        const token = req.cookies.token
        
        if(!token){
            throw createHttpError.Forbidden(`Invalid token`)
        }
        
        jwt.verify(token, envConfig.JWT_SECRET,(error, decoded)=>{
            if(error){
                throw createHttpError.Unauthorized(error.message)
            }
            req.user=decoded
            next()
        })

    } catch (error) {
        next(error);
    }
}