import express from 'express';

import { createProduct, getProduct, updateProduct, deleteProduct } from '../controllers/product.js';

const router = express.Router();

router.post('/', createProduct);
router.get('/:id', getProduct);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;