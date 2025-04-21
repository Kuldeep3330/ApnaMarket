import express from 'express'

// import { registerUser, loginUser } from '../controllers/auth.controller.js'
import { createProduct, getAllProducts, getProductById, seedProducts, updateProduct } from '../controllers/product.controller.js';

const router = express.Router();

router.post('/', seedProducts)
router.get('/', getAllProducts)
router.get('/:id', getProductById)
router.post('/', createProduct)
router.put('/:id', updateProduct)

export default router