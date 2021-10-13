import mongoose from "mongoose";

import { ADMIN_USER, GENERAL_USER } from "./systemEnums.js";

const receivedOrdersSchema = new mongoose.Schema(
    {
        fromUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },
    },
    { _id: false }
);

// define the User schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    oauthId: { type: String, required: false },
    nameFirst: { type: String, required: false },
    nameLast: { type: String, required: false },
    type: {
        type: String,
        enum: [ADMIN_USER, GENERAL_USER],
        default: GENERAL_USER,
        required: true,
    },
    clients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Client" }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    receivedOrders: { type: [receivedOrdersSchema], required: true },
});

// compile into Model
const User = mongoose.model("User", userSchema);

export default User;
