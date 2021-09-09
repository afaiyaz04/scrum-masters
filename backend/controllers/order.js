import express, { Router } from 'express';
import mongoose from 'mongoose';

import Order from '../models/order';

const router = express.Router();

export const createOrder = async (req, res) => {
    const { client, lineProducts, 
            timePlaced, timeDue, 
            totalFee, status, 
            description } = req.body;

    const newOrder = new Order({ client, lineProducts, 
                                 timePlaced, timeDue, 
                                 totalFee, status, 
                                 description });

    try {
        await newOrder.save();
        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const getOrder = async (req, res) => {
    const { id } = req.params;
     try {
        const order = await postMessage.findById(id);
        res.status(201).json(order);
     } catch (error) {
         res.status(404).json({message: error.message});
     }
}

export const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { client, lineProducts, 
            timePlaced, timeDue, 
            totalFee, status, 
            description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No order with id: ${id}`);
    }

    const updatedOrder = { client, lineProducts, 
                           timePlaced, timeDue, 
                           totalFee, status, 
                           description, _id: id };

    await Order.findByIdAndUpdate(id, updatedORder, {new: true});
    res.json(updatedOrder);
}

export const deleteOrder = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No order with id: ${id}`);
    }

    await Order.findByIdAndRemove(id);
    res.json({ massage: "Order deleted." });
}


export const getAllOrders = async(req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);

    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export default router;