import { CartItem } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";

// - GET /api/cart
export const getCart = async (req, res) => {
    try {
      const items = await CartItem.find({ userId: req.user._id }).populate('productId');
      res.status(200).json(items);
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
        res.status(200).json(cartItem);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add/update cart item' });
    }
}

// – Add/update item
// - DELETE /api/cart/:itemId