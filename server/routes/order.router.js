import express from 'express'

import { placeOrder, getUserOrders, getOrderById, getAllOrders, updateOrderStatus } from '../controllers/order.controller.js'

const router = express.Router();

router.post('/', placeOrder)
router.get('/', getUserOrders)
router.get('/:id', getOrderById)

router.get('/admin/orders', getAllOrders)
router.put('/admin/orders/:id', updateOrderStatus)


export default router