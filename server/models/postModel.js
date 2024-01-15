const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, enum: ['Agriculture', 'Business', 'Education', 'Art', 'Investment', 'Uncategorised', 'Weather'], message: "{VALUE is not supported}" },
    description: { type: String, required: true },
    creator: { type: mongoose.Schema.ObjectId, ref: "User" },
    thumbnail: { type: String }
}, { timestamps: true });


module.exports = mongoose.model("Post", PostSchema);