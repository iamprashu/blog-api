const jwt = require('jsonwebtoken');
require("dotenv").config();

// exports.auth = (req,res,next) =>{ //next is to move to next middleware
//     try{
//         const token = req.body.token

//         if(!token){
//             return res.status(401).json({
//                 success:false,
//                 message:"Token Missing Please Login"
//             })
//         }

//         //verify tht token

//         try{
//             const decode = jwt.verify(token,process.env.JWT_SECRET);
//             req.user = decode; // taki aage ke middleware me use kar pau

//         }catch(error){
//             return res.json({
//                 success:false,
//                 message:"Token is Invalid"
//             })

//         }

//         next();

//     }catch(error){

//         return res.status(401).json({
//             status:false,
//             message:"Someting went wront at api token"
//         })

//     }
// }

// exports.isStudent = (req,res,next)=>{
//     try{
//         if(req.user.role !== "student"){
//             return res.status(401).json({
//                 success:false,
//                 message:"This is a protected route for student only"
//             })
//         }
//         next();

//     }catch(error){
//         return res.status(500).json({
//             success:false,message:"Role of user error"
//         })
//     }
// }

// exports.isAdmin = (req,res,next)=>{
//     try{
//         if(req.user.role !== "admin"){
//             return res.status(401).json({
//                 success:false,
//                 message:"This is a protected route for Admin only"
//             })
//         }
//         next();

//     }catch(error){
//         return res.status(500).json({
//             success:false,message:"Role of Admin error"
//         })
//     }
// }


exports.auth = (req,res,next)=>{

   try{
     const token = req.body.token;

     if(!token){
        return res.status(400).json({
            success:false,
            message:"Token Not Found"
        })
     }

     try{
        const verifyToken = jwt.verify(token,process.env.JWT_SECRET);
        req.user = verifyToken; 
        // console.log(verifyToken);
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