import express from "express";

import {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getUserOrders,
    addUserOrder,
    getUserClients,
    addUserClient,
    transferOrder,
    deleteUserOrder,
    deleteUserClient,
    promoteUser,
    getFavourites,
    acceptOrder,
    declineOrder,
} from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();
// CRUD
router.get("/s/:id", auth, getAllUsers);
router.post("/", auth, createUser);
router.get("/:id", auth, getUser);
router.patch("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);

// Adding an order to a user
router.get("/:id/orders", auth, getUserOrders);
router.post("/:id/orders", auth, addUserOrder);
router.delete("/:id/orders", auth, deleteUserOrder);

// Adding a client to a user
router.get("/:id/clients", auth, getUserClients);
router.post("/:id/clients", auth, addUserClient);
router.delete("/:id/clients", auth, deleteUserClient);
router.get("/:id/favourites", auth, getFavourites);

// Management
router.patch("/:id/transfer", auth, transferOrder);
router.patch("/:id/transfer/accept", auth, acceptOrder);
router.patch("/:id/transfer/reject", auth, declineOrder);
router.patch("/:id/promote", auth, promoteUser);

export default router;
