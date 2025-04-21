import express from 'express'

import { placeOrder, getUserOrders, getOrderById, getAllOrders, updateOrderStatus } from '../controllers/order.controller.js'
import { isAdmin, isAuthenticated } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/',isAuthenticated, placeOrder)
router.get('/',isAuthenticated, getUserOrders)
router.get('/:id',isAuthenticated, getOrderById)

router.get('/admin/orders',isAuthenticated,isAdmin, getAllOrders)
router.put('/admin/orders/:id',isAuthenticated, isAdmin, updateOrderStatus)


export default router