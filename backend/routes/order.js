import express from 'express'

import { createOrder, 
         getOrder, 
         updateOrder, 
         deleteOrder,
         getAllOrders} from '../controllers/order.js';
 
const router = express.Router();

router.get("/order", getAllOrders);
router.post("/order", createOrder);
router.get("/order/:orderId", getOrder);
router.patch("/order/:orderId", updateOrder);
router.delete("/order/:orderId", deleteOrder);