import express from 'express'

// import { registerUser, loginUser } from '../controllers/auth.controller.js'
import { getAllProducts, seedProducts } from '../controllers/product.controller.js';

const router = express.Router();

router.post('/', seedProducts)
router.get('/', getAllProducts)

export default router