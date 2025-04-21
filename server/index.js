import express from "express";
import { connectDB } from "./db/index.js";
import dotenv from 'dotenv'

dotenv.config({
    path:'./env'
})
const app= express()

connectDB()
.then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`server is running on PORT :${process.env.PORT}`);
    })

})
.catch((err)=>{
    console.log("MongoDB connection failed", err);
    
})