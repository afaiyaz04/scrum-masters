import express from 'express'

import {
        createOrder, 
        getOrder, 
        updateOrder, 
        deleteOrder,
        addLineProduct,
        updateLineProduct,
        removeLineProduct
} from '../controllers/order.js';
 
const router = express.Router();

router.post("/", createOrder);
router.get("/:id", getOrder);
router.patch("/:id", updateOrder);
router.delete("/:id", deleteOrder);
router.post("/:orderId/product/:productId", addLineProduct);
router.patch("/:orderId/product/:productId", updateLineProduct);
router.delete("/:orderId/product/:productId", removeLineProduct);

export default router;