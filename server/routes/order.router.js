import express from 'express'

import { placeOrder, getUserOrders, getOrderById, getAllOrders } from '../controllers/order.controller.js'

const router = express.Router();

router.post('/', placeOrder)
router.get('/', getUserOrders)
router.get('/:id', getOrderById)

router.get('/admin/orders', getAllOrders)



export default router