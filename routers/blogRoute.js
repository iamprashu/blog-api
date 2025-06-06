const express = require('express');
const router = express.Router();

const postControllers = require("../controllers/postControllers");
const createPost = postControllers.createPost;
const getBlogs = postControllers.getPosts;

const likesController = require('../controllers/likesController');
const createLike = likesController.createLike;

router.post('/post/create',createPost);
router.get('/allBlogs',getBlogs);

router.post('/like/create',createLike);

module.exports = router;