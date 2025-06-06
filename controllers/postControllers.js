const Post = require('../models/postModel');

exports.createPost = async (req,res)=>{
    
    try{
        const{title,description} = req.body;

        const newPost = new Post({
            title,description
        });

        const savedPost = await newPost.save();

        res.status(200).json({
            success:true,
            data:savedPost,
            message:"Post Saved Successfully"
        })

    }catch(error){
        res.status(500).json({
            success:false,
            data:error,
            message:"Something Went Wrong"
        })

    }
 }

exports.getPosts = async(req,res)=>{
    try{
        const posts = await Post.find({}).populate("likes");

        res.status(200).json({
            success:true,
            data:posts,
        })
    }catch(error){
        res.status(500).json({
            success:false,
            data:"NULL"
        })
    }
}