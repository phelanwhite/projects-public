import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectDatabase from './configs/connect.js'
import envConfig from './configs/env.js'
import routers from './routers/index.js'

await connectDatabase()
const app = express()
app.listen(envConfig.PORT,()=>{
    console.log(`Server is running on port ${envConfig.PORT}`)
})

app.use(cors({
    credentials:true
}))
app.use(cookieParser())
app.use(bodyParser.json())

app.use(routers)
app.use(`/`,async(req,res,next)=>{
    try {
        next()
    } catch (error) {
        next(error)
    }
})