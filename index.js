const express = require('express');
const app = express();
const cors = require('cors')

const {connectDb} = require('./config/database');
const router = require('./routers/blogRoute');

//cookie parser
const cookieParser = require('cookie-parser');

app.use(cookieParser());


require('dotenv').config(); 
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors())
//Routes
app.use(router);
//run app server
app.listen(PORT,()=>{
    console.log(`Backend is Running on port ${PORT}`)
})

connectDb();