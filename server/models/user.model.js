import mongoose, { Schema } from "mongoose";

const userSchema= new Schema({
    name:{
        type:String,
        required:[true, 'name is required'],
        trim:true,
    },
    email:{
        type:String,
        required:[true, 'email is required'],
        unique:true,
        lowercase:true,
        trim:true,
    },
    password: {
        type: String,
        required: true,
      },
    
      role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
      }

},{timestamps:true})

export const User= mongoose.model("User", userSchema)
