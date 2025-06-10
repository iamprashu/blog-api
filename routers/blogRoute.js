const express = require('express');
const router = express.Router();

const postControllers = require("../controllers/postControllers");
const createPost = postControllers.createPost;
const getBlogs = postControllers.getPosts;
const {signupController, loginController} = require('../controllers/signupController')
const {auth,isAdmin,isStudent} = require('../middlewares/auth');
const likesController = require('../controllers/likesController');
const createLike = likesController.createLike;

router.post('/post/create',createPost);
router.get('/allBlogs',getBlogs);

router.post('/like/create',createLike);

router.post('/signup',signupController);
router.post('/login',loginController);


//protected routes
router.get('/simple',auth,(req,res)=>{
    res.send("welcome")
});

router.get('/admin',auth,isAdmin,(req,res)=>{
    res.status(200).json({
        success:true,
        message:'Welcome Admin'
    })
})

router.get('/student',auth,isStudent,(req,res)=>{
    res.status(200).json({
        success:true,
        message:'Welcome Student'
    })
})

module.exports = router;