import express from "express";
import mongoose from "mongoose";

import Order from "../models/order.js";
import User from "../models/user.js";
import { isAdminOrSelf } from "./user.js";

const router = express.Router();

export const createOrder = async (req, res) => {
    const { client, timeDue, totalFee, description } = req.body;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated!" });
    }

    // find an order number
    const orders = await Order.find();
    const orderNumbers = orders.map((order) => order.orderNumber);

    var nextOrderNum = orderNumbers.length + 1;

    while (orderNumbers.findIndex((on) => on == nextOrderNum) != -1) {
        nextOrderNum++;
    }

    const newOrder = new Order({
        client: mongoose.Types.ObjectId(client),
        timeDue: timeDue,
        totalFee: totalFee,
        description: description,
        orderNumber: nextOrderNum,
    });

    try {
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const getOrder = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated!" });
    }

    try {
        const order = await Order.findById(id);
        if (order == null) {
            return res.status(404).send(`No order with id: ${id}`);
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { client, timeDue, totalFee, status, description } = req.body;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated!" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No order with id: ${id}`);
    }

    const updatedOrder = {
        client: client,
        timeDue: timeDue,
        totalFee: totalFee,
        status: status,
        description: description,
        lastModified: Date.now(),
        _id: id,
    };

    const order = await Order.findByIdAndUpdate(id, updatedOrder, {
        new: true,
    });
    if (order == null) {
        return res.status(404).send(`No order with id: ${id}`);
    }
    res.json(order);
};

export const deleteOrder = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated!" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No order with id: ${id}`);
    }

    const order = await Order.findByIdAndRemove(id);

    if (order == null) {
        return res.status(404).send(`No order with id: ${id}`);
    }
    res.json({ message: "Order deleted successfully." });
};

export const addLineProduct = async (req, res) => {
    const { orderId } = req.params;
    const { name, description, price, quantity } = req.body;
    try {
        const order = await Order.findById(orderId);
        if (order == null) {
            return res.status(404).send(`No order with id: ${orderId}`);
        }

        const newLineProduct = {
            name: name,
            description: description,
            price: price,
            quantity: quantity,
        };
        order.lineProducts.push(newLineProduct);
        order.lastModified = Date.now();
        order.save();
        return res.json(order);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

export const updateLineProduct = async (req, res) => {
    const { orderId, productId } = req.params;
    const { name, description, price, quantity } = req.body;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated!" });
    }

    try {
        const order = await Order.findById(orderId);
        if (order == null) {
            return res.status(404).send(`No order with id: ${orderId}`);
        }

        // Check if product is in lineProducts
        const lineProduct = findLineProduct(order, productId);

        if (lineProduct == null) {
            return res.status(404).send(`No product with id: ${productId}`);
        }

        const product = lineProduct.product;

        product.name = name ? name : product.name;
        product.description = description ? description : product.description;
        product.price = price ? price : product.price;
        product.quantity = quantity ? quantity : product.quantity;

        order.lastModified = Date.now();
        await order.save();
        return res.json(order);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

export const removeLineProduct = async (req, res) => {
    const { orderId, productId } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated!" });
    }

    try {
        const order = await Order.findById(orderId);
        if (order == null) {
            return res.status(404).send(`No order with id: ${orderId}`);
        }

        // Check if product is in lineProducts
        const lineProduct = findLineProduct(order, productId);

        if (lineProduct == null) {
            return res.status(404).send(`No product with id: ${productId}`);
        }

        order.lineProducts.splice(lineProduct.index);

        order.lastModified = Date.now();
        await order.save();
        return res.json(order);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

function findLineProduct(order, productId) {
    const productIndex = order.lineProducts.findIndex((lineProduct) => {
        return lineProduct._id == productId;
    });

    if (productIndex == -1) {
        return null;
    }
    return { product: order.lineProducts[productIndex], index: productIndex };
}

export const addLog = async (req, res) => {
    const { id } = req.params;
    const { userId, text } = req.body;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated!" });
    }

    try {
        const order = await Order.findById(id);
        if (order == null) {
            return;
        }

        const user = await User.findById(userId);
        if (user == null) {
            return;
        }

        if (!(await isAdminOrSelf(req.userId, user))) {
            return res.json({ message: "No permission!" });
        }

        const newLog = {
            user: userId,
            text: text,
            userName: `${user.nameFirst} ${user.nameLast}`,
        };
        order.log.push(newLog);

        order.lastModified = Date.now();
        await order.save();
        res.json(order);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export default router;
