
const Post = require('./../models/postModel');
const { HTTPError } = require("../models/errorModel");
const fs = require("fs");
const path = require('path')
const { v4: uuid } = require('uuid');
const User = require('../models/userModel');

const createPost = (req, res, next) => {
    try {
        let { title, category, description } = req.body;
        if (!title || !category || !description || !req.files) {
            return next(new HTTPError('Fill in all the fields'));
        }

        const { thumbnail } = req.files;
        //check the file size
        if (thumbnail.size > 2000000)
            return next(new HTTPError('Thumbnail too big.File should be less than 2mb'));

        let filename;
        filename = thumbnail.name
        let splittedName = filename.split('.');
        let newFilename = splittedName[0] + uuid() + '.' + splittedName[splittedName.length - 1];

        thumbnail.mv(path.join(__dirname, '..', '/upload', newFilename), async (err) => {
            if (err) {
                return next(new HTTPError(err))
            }

            else {

                const newPost = await Post.create({ title, category, description, thumbnail: newFilename, creator: req.user.id })
                if (!newPost) {
                    return next(new HTTPError('Post could not be created....', 422))
                }

                //find user and increase post count
                const currentUser = await User.findById(req.user.id);
                const userPostCount = currentUser.posts + 1;
                await User.findByIdAndUpdate(req.user.id, { posts: userPostCount }, { new: true });

                return res.status(201).json(newPost);
            }

        })

    } catch (error) {
        return next(new HTTPError(error))
    }
}

const getPosts = async (req, res, next) => {
    try {
        const post = await Post.find().sort({ updatedAt: -1 });
        res.status(200).json(post)

    } catch (error) {
        return next(new HTTPError(error));
    }
}


const getPost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) {
            return next(new HTTPError("Post not found", 404))
        }
        res.status(200).json(post);

    } catch (error) {
        return next(new HTTPError(error))
    }
}


const getCategoryPosts = async (req, res, next) => {
    try {
        const { category } = req.params;
        const catPosts = await Post.find({ category }).sort({ createdAt: -1 });
        if (!catPosts) {
            return next(new HTTPError('No posts found', 404))
        }
        return res.status(200).json(catPosts);
    } catch (error) {
        return next(new HTTPError(error))
    }
}

const getUserPosts = async (req, res, next) => {
    try {
        const { id } = req.params;
        const posts = await Post.find({ creator: id }).sort({ createdAt: -1 });
        if (!posts) {
            return next(new HTTPError('No post found', 404));
        }

        return res.status(200).json(posts);
    } catch (error) {
        return next(new HTTPError(error))
    }
}

const editPost = async (req, res, next) => {
    try {
        let filename;
        let newFilename;
        let updatedPost;

        const postId = req.params.id;
        let { title, category, description } = req.body;

        if (!title || !category || description.length < 12) {
            return next(new HTTPError('Fill in all the fields', 422));
        }
        const oldPost = await Post.findById(postId);
        //others should not be able to delete our posts
        //dont use strong equality operator
        if (req.user.id == oldPost.creator) {
            if (!req.files) {
                updatedPost = await Post.findByIdAndUpdate(postId, { title, category, description }, { new: true })
            }
            else {
                //get old post from database

                //delete old thumbnail from upload
                fs.unlink(path.join(__dirname, '..', 'upload', oldPost.thumbnail), async (err) => {
                    if (err) {
                        return next(new HTTPError(err))
                    }
                })

                //const upload new thumbnail
                const { thumbnail } = req.files;
                //check file size
                if (thumbnail.size > 2000000) {
                    return next(new HTTPError('Thumbnail too big. Should be less than 2mb'))
                }

                filename = thumbnail.name;
                let splittedName = filename.split('.');
                newFilename = splittedName[0] + uuid() + '.' + splittedName[splittedName.length - 1];


                thumbnail.mv(path.join(__dirname, '..', 'upload', newFilename), async (err) => {
                    if (err) {
                        return next(new HTTPError(err))
                    }

                })
                updatedPost = await Post.findByIdAndUpdate(postId, { title, category, description, thumbnail: newFilename }, { new: true });
            }
        }
        if (!updatedPost) {
            return next(new HTTPError('Couldnt update post', 422))
        }
        return res.status(200).json(updatedPost);
    } catch (error) {
        return next(new HTTPError(error))
    }
}


const deletePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return next(new HTTPError('Post unavailaible', 400))
        }
        const post = await Post.findById(id);
        const fileName = post?.thumbnail;
        //delete thumbnail from uploads folder
        if (req.user.id == post.creator) {

            fs.unlink(path.join(__dirname, '..', 'upload', fileName), async (err) => {
                if (err) {
                    return next(new HTTPError(err))
                }
                else {
                    await Post.findByIdAndDelete(id);
                    //find user and reduce post count
                    const currentUser = await User.findById(req.user.id);
                    const userPostCount = currentUser?.posts - 1;
                    await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });
                    return res.json(`Post ${id} deleted successfully`)
                }
            })
        }
        else
            return next(new HTTPError('Post couldnt be deleted'))
    } catch (error) {
        return next(new HTTPError(error));
    }
}

module.exports = { editPost, createPost, deletePost, getCategoryPosts, getPost, getPosts, getUserPosts };