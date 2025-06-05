const express = require('express');
const router = express.Router();

const postControllers = require("../controllers/postControllers");
const createPost = postControllers.createPost;

router.post('/post/create',createPost);



module.exports = router;