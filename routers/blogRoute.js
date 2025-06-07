const express = require('express');
const router = express.Router();

const postControllers = require("../controllers/postControllers");
const createPost = postControllers.createPost;
const getBlogs = postControllers.getPosts;
const {signupController} = require('../controllers/signupController')

const likesController = require('../controllers/likesController');
const createLike = likesController.createLike;

router.post('/post/create',createPost);
router.get('/allBlogs',getBlogs);

router.post('/like/create',createLike);
router.post('/user/new',createLike);

router.post('/signup/new',signupController);

module.exports = router;