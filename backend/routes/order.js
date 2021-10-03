import express from 'express'

import {
        createOrder, 
        getOrder, 
        updateOrder, 
        deleteOrder,
        addLineProduct,
        updateLineProduct,
        removeLineProduct,
        getLineProducts
} from '../controllers/order.js';
 
const router = express.Router();

router.post("/", createOrder);
router.get("/:id", getOrder);
router.patch("/:id", updateOrder);
router.delete("/:id", deleteOrder);
router.post("/:orderId/product", addLineProduct);
router.patch("/:orderId/product", updateLineProduct);
router.delete("/:orderId/product", removeLineProduct);
router.get("/:orderId/products", getLineProducts);

export default router;