export const errorHandler =async(error,req,res,next)=>{
    const status = error.status||500
    const message = error.message
    return res.status(status).json({status,message})
}

export const responseHandler =(res,{
    status,message,result
})=>{
    return res.status(status).json({status,message,result})
}