import express from 'express'
import { registerUser ,loginUser } from '../controllers/userController.js'

// Instance of the router
const userRouter = express.Router()

// End point to register the user
userRouter.post('/register', registerUser);
userRouter.post('/login',loginUser);

export default userRouter;