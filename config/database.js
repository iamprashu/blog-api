const mongoose = require('mongoose');

exports.connectDb = ()=>{
    mongoose.connect(process.env.DBURI)
    .then(()=>{
        console.log("Database Connected To the application");
    }).catch((error)=>{
        console.log("Something Went Wrong")
    })

}