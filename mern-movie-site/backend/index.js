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
  })
)
  
app.use(cookieParser())
app.use(bodyParser.json())
app.use(router)

// deploy
if (process.env.NODE_ENV === "production") {
  const __dirname= path.resolve()
  app.use(express.static(path.join(__dirname, `/frontend/dist`)));
  app.get("*", (req, res) => {
    const tmdbToken=envConfig.TMDB_TOKEN
    res.cookie('tmdbToken',tmdbToken)
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

// error handling middleware
app.use((err, req, res, next)=> {
  const status = err.status || 500;
  const message = err.message;
  return res.status(status).json({
    status: status,
    message: message,
  });
})