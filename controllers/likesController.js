const Like = require('../models/likeModel');
const Post = require('../models/postModel');


exports.createLike = async(req,res)=>{

    try{
        const{post} = req.body;
        const user = req.user.id;
    
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
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}