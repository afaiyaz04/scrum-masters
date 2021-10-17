import express from "express";
import { signIn } from "../controllers/signIn.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, signIn);

export default router;
