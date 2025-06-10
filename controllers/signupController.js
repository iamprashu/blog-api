const Signup = require('../models/signupModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signupController = async(req,res)=>{

    try{
        const{name,email,password,role} = req.body;

        const isRegustered = await Signup.findOne({email:email});

        if(isRegustered){
            res.status(400).json({
                success:false,
                message:"Email Already Registered"
            })
        }

        const encPass = await bcrypt.hash(password,10);

        const newUser = new Signup({
            name,email,password:encPass,role
        });
        const userSaved = await newUser.save();

        res.status(200).json({
            success:true,
            data:userSaved,
            message:"Created User"
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error had done"
        })
    }
}

exports.loginController = async(req,res)=>{

    try{
        //request me 2 cheej aa rhai hai email and password
        const{email,password} = req.body;

        console.log(email)
        console.log(password)

        if(!email || !password){
            return res.status(404).json({
                success:false,
                messsage:"Please Enter correct details."
            })
        }

        let user = await Signup.findOne({email:email});

        if(!user){
            return res.status(400).json({
                success:false,
                message:"Sorry User not Found"
            })
        }

        const verifyPassword = await bcrypt.compare(password,user.password);

        if(verifyPassword){
            
            const payload = {
                email:user.email,
                id:user._id,
                role:user.role
            };

            let token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h"
            })

            user = user.toObject();
            user.token = token,
            user.password = undefined;
            
            const options = {
                expires: new Date( Date.now() + 3 * 24 * 60 * 60 * 1000 ),
                httpOnly:true
            }

            res.cookie("AuthToken",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"login success"
            });


        }else{
            return res.status(401).json({
                success:false,
                message:"Invalid Password"
            })
        }
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
    
}