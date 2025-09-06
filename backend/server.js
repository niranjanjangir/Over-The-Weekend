import express from 'express'
import cors from 'cors'
import 'dotenv/config' 
import connectDB from './config/mongoDB.js';
import connectCloudinary from './config/Cloudinary.js'
import userRouter from './routes/userRoute.js';
import postRouter from './routes/postRoute.js';

// app config 
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();
//middlewares
app.use(express.json());
app.use(cors()); //connect to frontend



app.use('/api/posts',postRouter);
app.use('/api/users',userRouter);

app.get('/',(req, res)=>{
    res.send("API WORKING!")
})

app.listen(port, ()=>{
    console.log("Server started at ",port);
});