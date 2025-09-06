import express from 'express'
import { createPost, deletePost, getPost } from '../controllers/postController.js'
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';

// Instance of the router
const postRouter = express.Router()
// End point to create a post
postRouter.post('/create',upload.single('Image'), authUser, createPost);
// End point to get all posts
postRouter.get('/get', authUser, getPost);
// End point to delete a post
postRouter.delete('/delete/:id',authUser, deletePost);

export default postRouter;