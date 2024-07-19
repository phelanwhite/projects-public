import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import ConnectDB from './libs/connect.js'
import router from './routers/index.js'
import path from 'path'
import envConfig from './configs/env.config.js'

ConnectDB()
const port=envConfig.PORT
const app = express()
app.listen(port,()=>{
  console.log(`Server running on port ${port}`) 
})
app.use(cors({
    credentials: true,
    origin:"*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue:true
    // origin: ['http://localhost:3000','http://localhost:5173','http://localhost:5000']
    // origin:`*`
  })
)
  
app.use(cookieParser())
app.use(bodyParser.json())
app.use(router)

// deploy
const __dirname= path.resolve()
app.use(express.static(path.join(__dirname, `/frontend/dist`)));
app.use("*",(req, res, next) =>{
  try {
    res.cookie('tmdbToken',envConfig.TMDB_TOKEN,{
      httpOnly: true,
      sameSite: 'strict',
      secure: true, 
    })
    res.sendFile(path.join(process.cwd(), 'frontend','dist', 'index.html'));
  } catch (error) {
    next(error)
  }
})

// error handling middleware
app.use((err, req, res, next)=> {
  const status = err.status || 500;
  const message = err.message;
  return res.status(status).json({
    status: status,
    message: message,
  });
})