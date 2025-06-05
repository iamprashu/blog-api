const express = require('express');
const app = express();

const {connectDb} = require('./config/database')

require('dotenv').config(); 
const PORT = process.env.PORT;

app.use(express.json());


//Routes


//run app server
app.listen(PORT,()=>{
    console.log(`Backend is Running on port ${PORT}`)
})

connectDb();