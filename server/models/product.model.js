import mongoose, { Schema } from "mongoose";

const productSchema=  new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
      },
    
      description: {
        type: String,
        required: true,
      },
    
      price: {
        type: Number,
        required: true,
        min: 0,
      },
    
      images: {
        type: [String], // array of image URLs
        validate: [(val) => val.length > 0, 'At least one image is required'],
      },
    
      stock: {
        type: Number,
        required: true,
        min: 0,
      }
    
},{timestamps:true})

export const Product= mongoose.model("Product", productSchema)
