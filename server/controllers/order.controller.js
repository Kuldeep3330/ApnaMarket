import { CartItem } from "../models/cart.model.js";
import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";

export const placeOrder= async (req, res)=>{
    try {
        const cartItems= await CartItem.find({userId:req.user._id}).populate('productId');

        if(cartItems.length === 0){
            return res.status(400).json({error:'Cart empty'})
        }

        const orderItems=cartItems.map(item=>({
            productId: item.productId._id,
            quantity: item.quantity,
            priceAtPurchase: item.productId.price,
        }))

        const total = orderItems.reduce(
            (acc, item) => acc + item.quantity * item.priceAtPurchase,0);

        const newOrder= new Order({
            userId,
            items: orderItems,
            total,
        })

        const saved=await newOrder.save();
        console.log('order placed', saved);        

        await CartItem.deleteMany({ userId });         
            
    } catch (error) {
        res.status(500).json({ error: 'Failed to place order' });
    }
}

//get current's user orders
export const getUserOrders = async (req, res) =>{
    try {
        const orders = await Order.find({ userId: req.user._id }).populate('items.productId');
        res.status(200).json(orders);
        
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
}