import express from "express";

import {
  createClient,
  deleteClient,
  getClient,
  updateClient,
  makeFavourite,
} from "../controllers/client.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createClient);
router.get("/:id", auth, getClient);
router.patch("/:id", auth, updateClient);
router.delete("/:id", auth, deleteClient);
router.patch("/:id/fav", auth, makeFavourite);

export default router;
