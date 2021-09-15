import express from 'express';
import mongoose from 'mongoose';

import Order from '../models/order.js';
import Product from '../models/product.js';

const router = express.Router();

export const createOrder = async (req, res) => {
    const { 
        client, 
        timeDue, 
        totalFee, 
        description
    } = req.body;

    const newOrder = new Order({ 
        client,
        timeDue, 
        totalFee, 
        description
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
        timeDue, 
        totalFee, 
        status, 
        description
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No order with id: ${id}`);
    }

    const updatedOrder = { 
        client,
        timeDue, 
        totalFee, 
        status, 
        description,
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
    res.json({ message: "Order deleted successfully." });
}

export const productInOrder = async (req, res) => {
    const { orderId, productId} = req.params;
    const { quantity } = req.body;
    
    try {
        // Find the order
        const order = await Order.findById(orderId);
        if (order == null) {
            return res.status(404).send(`No order with id: ${orderId}`);
        }
        
        // Find the product
        const product = await Product.findById(productId);
        if (product == null) {
            return res.status(404).send(`No product with id: ${productId}`);
        }

        // Remove any products that match this id
        const newLineProducts = order.lineProducts.filter(obj => {
            return obj.productId != productId;
        });

        // Only re-add if qty is more than 0
        if (quantity > 0) {
            // Add new
            const newLineProduct = {productId: productId, quantity: quantity};
            newLineProducts.push(newLineProduct);
        }
        
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId, 
            {lineProducts: newLineProducts}, 
            {new: true}
        );
        
        return res.json(updatedOrder);
        
     } catch (error) {
        return res.status(404).json({message: error.message});
     }

}

export default router;