import mongoose, {Schema} from "mongoose";

const orderItemSchema= new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      priceAtPurchase: {
        type: Number,
        required: true
      }
    });
    
    const orderSchema = new mongoose.Schema({
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    
      items: [orderItemSchema],
    
      total: {
        type: Number,
        required: true
      },
    
      status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered'],
        default: 'pending'
      }

},{timestamps:true})

export const Order= mongoose.model("Order", orderSchema)