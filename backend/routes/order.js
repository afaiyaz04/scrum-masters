import express from 'express'

import { createOrder, 
         getOrder, 
         updateOrder, 
         deleteOrder} from '../controllers/order.js';
 
const router = express.Router();

router.post("/", createOrder);
router.get("/:id", getOrder);
router.patch("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;