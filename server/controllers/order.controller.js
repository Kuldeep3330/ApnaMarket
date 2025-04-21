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
            userId: req.user._id,
            items: orderItems,
            total,
        })

        const saved=await newOrder.save();
        // console.log('order placed', saved);        

        await CartItem.deleteMany({ userId: req.user._id, });          
        res.status(201).json(saved);
            
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

//get order by id
export const getOrderById= async (req, res)=>{
    try {
        
        const order= await Order.findById(req.params.id).populate('items.productId')

        if(!order)
            return res.status(404).json({error:'Order not found'})

        //stoping unauthorized user to access data
        if (order.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Forbidden' });
          }

          res.status(200).json(order);
        
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch order' });
    }
}

//get all orders
export const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find().populate('userId').populate('items.productId');
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch all orders' });
    }
  };

//change order status 
export const updateOrderStatus = async (req, res)=>{
    try {
        const order = await Order.findById(req.params.id);

        if (!order) return res.status(404).json({ error: 'Order not found' });

        order.status = req.body.status

        await order.save();
        res.status(200).json({ message: 'Order status updated', order });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update order status' });
    }
}