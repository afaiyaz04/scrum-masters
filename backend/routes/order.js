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
router.post("/:orderId/product", addLineProduct);
router.patch("/:orderId/product", updateLineProduct);
router.delete("/:orderId/product", removeLineProduct);

export default router;