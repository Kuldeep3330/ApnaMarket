import express from 'express'

// import { registerUser, loginUser } from '../controllers/auth.controller.js'
import { seedProducts } from '../controllers/product.controller.js';

const router = express.Router();

router.post('/product', seedProducts)

export default router