const express = require('express');
const router = express.Router();

const likesController = require('../controllers/likesController');
const createLike = likesController.createLike;

const postControllers = require("../controllers/postControllers");
const createPost = postControllers.createPost;
const getBlogs = postControllers.getPosts;

const {signupController} = require('../controllers/signupController')
const {loginController} = require('../controllers/loginController');
const {auth} = require('../middlewares/auth');



router.post('/post/create',createPost);
router.get('/allBlogs',getBlogs);

router.post('/like',auth,createLike);

router.post('/signup',signupController);
router.post('/login',loginController);



// //protected routes
// router.get('/simple',auth,(req,res)=>{
//     res.send("welcome")
// });

// router.get('/admin',auth,isAdmin,(req,res)=>{
//     res.status(200).json({
//         success:true,
//         message:'Welcome Admin'
//     })
// })

// router.get('/student',auth,isStudent,(req,res)=>{
//     res.status(200).json({
//         success:true,
//         message:'Welcome Student'
//     })
// })

module.exports = router;