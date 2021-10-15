import mongoose from "mongoose";

import {
    ORDER_CREATED,
    ORDER_DISCUSSED,
    ORDER_AGREED,
    ORDER_SIGNED,
} from "./systemEnums.js";

// define the ProductItem child schema
const lineProductSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	quantity: { type: Number, default: 1, required: true },
});

// define the log child scheme
const logSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        timeCreated: { type: Date, required: true, default: Date.now },
        text: { type: String, required: true },
    },
    { _id: false }
);

// define the Order schema
const orderSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
        required: true,
    },
    lineProducts: { type: [lineProductSchema], required: true },
    timePlaced: { type: Date, required: true, default: Date.now },
    timeDue: { type: Date, required: true },
    totalFee: { type: Number, required: true },
    status: {
        type: String,
        enum: [ORDER_CREATED, ORDER_DISCUSSED, ORDER_AGREED, ORDER_SIGNED],
        default: ORDER_CREATED,
        required: true,
    },
    orderNumber: { type: Number, required: true },
    description: { type: String, required: false, default: null },
    log: { type: [logSchema], required: true },
    lastModified: { type: Date, required: true, default: Date.now },
});

// compile into Model
const Order = mongoose.model("Order", orderSchema);

export default Order;
