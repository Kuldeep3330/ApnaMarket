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



// – Add/update item
// - DELETE /api/cart/:itemId