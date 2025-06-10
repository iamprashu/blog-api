const mongoose = require('mongoose');
const Like = require('../models/likeModel');
const Post = require('../models/postModel');
const bcrypt = require('bcrypt')

exports.createLike = async(req,res)=>{

    try{
        const{post,user} = req.body;
        

        const newLike = new Like({
            post,user
        })

        const sentLike = await newLike.save();


        const likedPost = await Post.findByIdAndUpdate(post,{$push: {likes:sentLike._id}},{new:true}).populate("likes");

        res.status(200).json({
            success:true,
            data:likedPost,
            message:"Liked Post Success"
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Something Went Wrong!"
        })
    }
}