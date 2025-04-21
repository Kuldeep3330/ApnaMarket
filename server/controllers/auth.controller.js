import { User } from "../models/user.model.js";

export const registerUser= async(req, res)=>{
    try {
        const {name, email, password}= req.body

    //check if user already exists
    const user= await User.findOne({email})
    if(user){
        return res.status(400).json({message:'User already exists'})
    }

    //if not exists
    //create one
    const newUser= await User.create({name, email, password})

    const token= newUser.generateJWT();

    res.status(201).json({
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
        token,
      });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }

}