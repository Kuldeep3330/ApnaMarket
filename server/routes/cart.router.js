import express from 'express'

import { addOrUpdateCartItem, getCart,deleteCartItem } from '../controllers/cart.controller.js'
import { isAuthenticated } from '../middleware/auth.middleware.js';
const router = express.Router();

router.use(isAuthenticated);

router.get('/', getCart)
router.post('/', addOrUpdateCartItem)
router.delete('/:id', deleteCartItem)



export default router