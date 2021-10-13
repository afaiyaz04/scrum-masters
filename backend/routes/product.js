import express from "express";

import {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createProduct);
router.get("/:id", auth, getProduct);
router.patch("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);

export default router;
