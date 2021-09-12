import express from 'express';
import mongoose from 'mongoose';

import Order from '../models/order.js';

const router = express.Router();

export const createOrder = async (req, res) => {
    const { 
        client, 
        lineProducts, 
        timePlaced, 
        timeDue, 
        totalFee, 
        status, 
        description, 
        log 
    } = req.body;

    const newOrder = new Order({ 
        client, 
        lineProducts, 
        timePlaced, 
        timeDue, 
        totalFee, 
        status, 
        description, 
        log 
    });

    try {
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const getOrder = async (req, res) => {
    const { id } = req.params;

     try {
        const order = await Order.findById(id);
        if (order == null) {
            return res.status(404).send(`No order with id: ${id}`);
        }
        res.status(200).json(order);
     } catch (error) {
        res.status(404).json({message: error.message});
     }
}

export const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { 
        client, 
        lineProducts, 
        timePlaced, 
        timeDue, 
        totalFee, 
        status, 
        description, 
        log 
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No order with id: ${id}`);
    }

    const updatedOrder = { 
        client, 
        lineProducts, 
        timePlaced, 
        timeDue, 
        totalFee, 
        status, 
        description, 
        log, 
        _id: id 
    };

    const order = await Order.findByIdAndUpdate(id, updatedOrder, {new: true});
    if (order == null) {
        return res.status(404).send(`No order with id: ${id}`);
    }
    res.json(order);
}

export const deleteOrder = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No order with id: ${id}`);
    }

    const order = await Order.findByIdAndRemove(id);
    if (order == null) {
        return res.status(404).send(`No order with id: ${id}`);
    }
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