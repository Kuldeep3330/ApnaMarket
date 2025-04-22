import { CartItem } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";

// - GET /api/cart
export const getCart = async (req, res) => {
    try {
      const items = await CartItem.find({ userId: req.user._id }).populate('productId');

      const updatedData = items.map(item => {
        // Rename productId to product
        return {
          ...item,
          product: item.productId,
          productId: undefined 
        };
      });
      
      const cleanedData = updatedData.map(({ productId, ...rest }) => rest);
      console.log(cleanedData, updatedData);       

      res.status(200).json(updatedData);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch cart items' });
    }
  };

// - POST /api/cart
export const addOrUpdateCartItem= async (req, res)=>{
    const {productId, quantity} =req.body;

    if (!productId || !quantity) {
        return res.status(400).json({ error: 'Product ID and quantity are required' });
      }

    try {
        let cartItem= await CartItem.findOne({userId: req.user._id, productId})

        if(cartItem){
            cartItem.quantity=quantity
        }else{
            //creating new cart item
            cartItem= new CartItem({
                userId: req.user._id,
                productId,
                quantity
            })

        }
        await cartItem.save();

        const updatedData = cartItem.map(item => {
          return {
            ...item,
            product: item.productId,
            productId: undefined 
          };
        });

        const cleanedData = updatedData.map(({ productId, ...rest }) => rest);
        console.log(cleanedData, updatedData);       

        res.status(200).json(updatedData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add/update cart item' });
    }
}

// - DELETE /api/cart/:itemId
export const deleteCartItem = async (req, res) => {   
    try {

      const  itemId  = req.params.itemId;
      const deleted = await CartItem.findOneAndDelete({ productId: itemId, userId: req.user._id });
      console.log(deleted, itemId, req.params, req.user);
      
      if (!deleted) {
        
        return res.status(404).json({ error: 'Cart item not found' });
      }
    
  
      res.status(200).json({ message: 'Item removed from cart' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete cart item' });
    }
};

// DELETE /api/cart
export const clearCart = async (req, res) => {
    try {
      await CartItem.deleteMany({ userId: req.user._id });
      res.status(200).json({ message: 'Cart cleared' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to clear cart' });
    }
  };
