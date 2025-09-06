import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    year: { type: Number, required: true },
    date: { type: String, required: true },
    weekendTitle: { type: String, required: true },
    Image: { type: String, required: true },
    Caption: { type: String, required: true },
    Emoji: { type: String, required: true },
    day: { type: String, required: true },
    User: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
})

const postModel = mongoose.model.posts || mongoose.model('posts', postSchema)

export default postModel;