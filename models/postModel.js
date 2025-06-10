const mongoose = require("mongoose");

const postModel = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Like"
    }]
})

module.exports = mongoose.model("Post",postModel);