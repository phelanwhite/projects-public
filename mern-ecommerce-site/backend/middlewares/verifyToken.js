import jwt from 'jsonwebtoken'
import envConfig from '../configs/env.js';
import createHttpError from 'http-errors';

export const verifyToken = async(req,res,next)=>{
    try {
        const token = req.cookies.token

    jwt.verify(token, envConfig.JWT_SECRET,(error,decode)=>{
        if(error){
            throw createHttpError.Forbidden(error.message)
        }
        req.user = decode
        next()
    })

    } catch (error) {
        next(error);
    }
}

export const verifyTokenAdmin = async(req,res,next)=>{
    try {
        const token = req.cookies.token

    jwt.verify(token, envConfig.JWT_SECRET,(error,decode)=>{
        if(error){
            throw createHttpError.Forbidden(error.message)
        }
        if(decode?.role!==`admin`){
            throw createHttpError.Forbidden(`Admin access denied`)
        }
        req.user = decode
        next()
    })

    } catch (error) {
        next(error);
    }
}