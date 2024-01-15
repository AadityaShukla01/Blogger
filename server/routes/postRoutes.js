const express = require('express');
const { createPost, getPosts, getUserPosts, getPost, editPost, getCategoryPosts, deletePost } = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware')


const router = express.Router();

router.post('/', authMiddleware, createPost);
router.get('/', getPosts);
router.get('/:id', getPost);
router.patch('/:id', authMiddleware, editPost);
router.get('/categories/:category', getCategoryPosts);
router.get('/users/:id', getUserPosts);
router.delete('/:id', authMiddleware, deletePost);

module.exports = router