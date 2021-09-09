import express from 'express';

import { createProduct, getProduct, updateProduct, deleteProduct } from '../controllers/product.js';

const router = express.Router();

router.post('/product', createProduct);
router.get('/product/:productId', getProduct);
router.patch('/product/:productId', updateProduct);
router.delete('/product/:productId', deleteProduct);

export default router;