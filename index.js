const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const imageRoutes = require("./routers/image")
const db = require("./config/dbconfig");

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

function middleware(req,res,next){
    req.db=db;
    req.db.connect();
    next();
}

app.use('/image',middleware,imageRoutes);
app.all('*',(req,res)=> {
    res.sendStatus(404);
  });

const PORT = process.env.PORT || 3000;


app.get('/ping',(req,res)=>{
    res.send("Hello World");
});


app.listen(PORT,()=>console.log("server is running"))
