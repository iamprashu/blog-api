const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.auth = (req,res,next)=>{

   try{
    // console.log(req);
     const token = req.cookies.AuthToken;

     if(!token){
        return res.status(400).json({
            success:false,
            message:"Token Not Found"
        })
     }

     try{
        const verifyToken = jwt.verify(token,process.env.JWT_SECRET); // decrypted user data
        req.user = verifyToken; // user data added to the request
        
     }catch(error){
        console.log(error)
     }

     next();

   }catch(error){
        res.status(500).json({
            success:false,
            message:"Error in Server"
        })
   }
}

exports.isAdmin = (req,res,next)=>{
    try{
        const role = req.user.role;

        if(role !== "admin"){
            return res.status(403).json({
                succcess:false,
                message:"Sorry you are not authorized or this"
            })
        }

        next();
    }catch(error){
        res.json({
            success:false,
            message:"Failure"
        })
    }

}

exports.isStudent = (req,res,next)=>{
    try{
        const role = req.user.role;
        // console.log(req.user);

        if(role !== "student"){
            return res.status(404).json({
                message:"You are unauthoraised or token expired please login again"
            })
        }

        next();

    }catch(error){
        console.log(error);
    }
}