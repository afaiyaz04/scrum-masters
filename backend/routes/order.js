import express from "express";

import {
    createOrder,
    getOrder,
    updateOrder,
    deleteOrder,
    addLineProduct,
    updateLineProduct,
    removeLineProduct,
    getLineProducts,
    addLog,
} from "../controllers/order.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createOrder);
router.get("/:id", auth, getOrder);
router.patch("/:id", auth, updateOrder);
router.delete("/:id", auth, deleteOrder);

// Line products
router.post("/:orderId/products", auth, addLineProduct);
router.patch("/:orderId/products", auth, updateLineProduct);
router.delete("/:orderId/products", auth, removeLineProduct);
router.get("/:orderId/products", auth, getLineProducts);

// Log
router.post("/:id/log", auth, addLog);

export default router;
