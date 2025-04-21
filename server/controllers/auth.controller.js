import { User } from "../models/user.model.js";

export const registerUser= async(req, res)=>{
    try {
        const {name, email, password, role}= req.body

    //check if user already exists
    const user= await User.findOne({email})
    if(user){
        return res.status(400).json({message:'User already exists'})
    }

    //if not exists
    //create one
    const newUser= await User.create({name, email, password,role})

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

///login a user
export const loginUser= async (req, res)=>{
    try {
        const {email, password}= req.body

        //check user exists or not
        const user =  await User.findOne({email})

        if(!user){
            res.status(401).json({message:"user not exists || invalid credentials"})
        }

        //if found
        //s1. commpare password
        const isMatch= await user.isPasswordCorrect(password);

        if(!isMatch){
            res.status(401).json({message:"user not exists || invalid credentials"})
        }

        //if password matches
        const token= user.generateJWT()
        res.status(200).json({
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
            },
            token,
          });
        } catch (error) {
          res.status(500).json({ message: 'Server error', error: error.message });
        }
}