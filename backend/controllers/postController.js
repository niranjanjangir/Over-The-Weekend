import { Mongoose } from 'mongoose';
import postModel from '../models/postModel.js';
import {v2 as cloudinary} from "cloudinary";
import mongoose from 'mongoose';
const createPost = async (req, res) => {
    try {
        const {year, date, weekendTitle, day, Caption, Emoji } = req.body;
        const Image = req.file
        if (!Image || !Caption || !Emoji) {
            console.log(Image, Caption, Emoji);
            return res.json({ success: false, message: "Please fill all the fields" });
        }
        const imageUpload = await cloudinary.uploader.upload(Image.path, { resource_type: 'image' });
        const imageURL = imageUpload.secure_url;
        const postData = {
            year,
            date,
            weekendTitle,
            day,
            Image:imageURL,
            Caption,
            Emoji,
            User: req.body.userId
        };

        const newPost = new postModel(postData);
        const post = await newPost.save();
        
        return res.json({ success: true, post });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
};

const getPost = async (req, res) => {
    try {
        const posts = await postModel.find().populate('User', 'email').sort({ createdAt: -1 });
        return res.json({ success: true, posts });
    }
    catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
};

const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await postModel.findById(new mongoose.Types.ObjectId(postId));
        
        if (!post) {
            return res.json({ success: false, message: "Post not found" });
        }

        if (post.User.toString() !== req.body.userId) {
            return res.json({ success: false, message: "You are not authorized to delete this post" });
        }

        await postModel.findByIdAndDelete(postId);
        return res.json({ success: true, message: "Post deleted successfully" });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export { createPost, getPost, deletePost }
