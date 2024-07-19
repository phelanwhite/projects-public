import express from 'express'
import authRouter from './auth.js'
import myFavouriteRouter from './myFavourite.js'
import myListRouter from './myList.js'
import commentRouter from './comment.js'

const router = express.Router()
router.use(`/api/auth`,authRouter)
router.use(`/api/my-favourite`,myFavouriteRouter)
router.use(`/api/my-list`,myListRouter)
router.use(`/api/comment`,commentRouter)

export default router