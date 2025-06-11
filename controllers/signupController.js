const Signup = require('../models/userModel');
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
