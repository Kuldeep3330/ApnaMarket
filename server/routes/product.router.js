import express from 'express'

// import { registerUser, loginUser } from '../controllers/auth.controller.js'
import { createProduct, deleteProduct, getAllProducts, getProductById, seedProducts, updateProduct } from '../controllers/product.controller.js';
import { isAuthenticated, isAdmin } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/', seedProducts)
router.get('/', getAllProducts)
router.get('/:id', getProductById)
router.post('/', isAuthenticated, isAdmin, createProduct)
router.put('/:id', isAuthenticated, isAdmin, updateProduct)
router.delete('/:id', isAuthenticated, isAdmin, deleteProduct)

export default router