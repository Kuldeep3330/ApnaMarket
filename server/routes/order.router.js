import express from 'express'

import { placeOrder, getUserOrders, getOrderById } from '../controllers/order.controller.js'

const router = express.Router();

router.post('/', placeOrder)
router.get('/', getUserOrders)
router.get('/:id', getOrderById)


export default router