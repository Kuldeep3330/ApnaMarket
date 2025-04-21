import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

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

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10)
    next()    
})

// JWT token method
userSchema.methods.generateJWT = function () {
    return jwt.sign(
      { _id: this._id, email: this.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
  };

userSchema.methods.isPasswordCorrect= async function(password){
    return await bcrypt.compare(password, this.password);
}

export const User= mongoose.model("User", userSchema)
