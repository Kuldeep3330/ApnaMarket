import express from 'express'

import { addOrUpdateCartItem, getCart } from '../controllers/cart.controller.js'

const router = express.Router();

router.get('/', getCart)
router.post('/', addOrUpdateCartItem)



export default router