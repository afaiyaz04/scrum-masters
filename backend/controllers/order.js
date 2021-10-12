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

    if (!req.userId) {
        return res.json({ message: "Unauthenticated!"});
    }

    const newOrder = new Order({ 
        client: mongoose.Types.ObjectId(client),
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

    if (!req.userId) {
        return res.json({ message: "Unauthenticated!"});
    }

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

    if (!req.userId) {
        return res.json({ message: "Unauthenticated!"});
    }

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

    if (!req.userId) {
        return res.json({ message: "Unauthenticated!"});
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No order with id: ${id}`);
    }

    if (!await removeOrder(id)) {
        return res.status(404).send(`No order with id: ${id}`);
    }
    res.json({ message: "Order deleted successfully." });
}


export const addLineProduct = async (req, res) => {
    const { orderId } = req.params;
    const { productId, quantity } = req.body;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated!"});
    }

    try {
        const [order, product] = await doesOrderProductExist(orderId, productId, res);
        if (order == null || product == null) return;

        // Check that product isnt already added
        const productIndex = order.lineProducts.findIndex((lineProduct) => {
            return lineProduct.productId == productId;
        });

        if (productIndex != -1) {
            return res.status(406).send('Cannot add product (already exists)');
        }

        const newLineProduct = {productId: product._id, quantity: quantity};
        order.lineProducts.push(newLineProduct);

        order.save();
        return res.json(order);
        
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}

export const updateLineProduct = async (req, res) => {
    const { orderId } = req.params;
    const { productId, quantity } = req.body;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated!"});
    }

    try {
        const [order, product] = await doesOrderProductExist(
            orderId, productId, res
        );
        if (order == null || product == null) return;
        
        // Check if product is in lineProducts
        const productIndex = order.lineProducts.findIndex((lineProduct) => {
            return lineProduct.productId == productId
        });

        if (productIndex == -1) {
            return res.status(404).send(
                'Product not found in lineProducts of order'
            );
        }

        order.lineProducts[productIndex].quantity = quantity;
        order.save();
        return res.json(order);

    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}

export const removeLineProduct = async (req, res) => {
    const { orderId } = req.params;
    const { productId } = req.body;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated!"});
    }

    try {
        const [order, product] = await doesOrderProductExist(orderId, productId, res);
        if (order == null || product == null) return;

        // Check if product is in lineProducts
        const productIndex = order.lineProducts.findIndex((lineProduct) => {
            return lineProduct.productId == productId
        });
        if (productIndex == -1) {
            return res.status(404).send(
                'Product not found in lineProducts of order'
            );
        }
        order.lineProducts.splice(productIndex, 1);
        order.save();
        await Product.findByIdAndRemove(productId);
        return res.json(order);

    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}

export const getLineProducts = async (req, res) => {
    const { orderId } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated!"});
    }

    try {
        const order = await Order.findById(orderId);
        if (order == null) {

        }

        const getLineProducts = async () => {
            return Promise.all(
                order.lineProducts.map(async (lineProduct) => {
                    const productId = lineProduct.productId;
                    const quantity = lineProduct.quantity;
                    const product = await Product.findById(productId);
                    return { product, quantity: quantity };
                })
            )
        }
        getLineProducts().then((products) => {
            res.json(products);
        })

    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

async function doesOrderProductExist(orderId, productId, res) {
    // Find the order
    const order = await Order.findById(orderId);
    if (order == null) {
        res.status(404).send(`No order with id: ${orderId}`);
        return [null, null];
    }
    
    // Find the product
    const product = await Product.findById(productId);
    if (product == null) {
        res.status(404).send(`No product with id: ${productId}`);
        return [null, null];
    }

    return [order, product];
}

export async function removeOrder(orderId) {
    const order = await Order.findById(orderId);
    if (!order) return false;

    const orderProducts = order.lineProducts;
    for (var i = 0; i < orderProducts.length; i++) {
        var productId = orderProducts[i].productId;
        await Product.findByIdAndRemove(productId);
    }
    await Order.findByIdAndRemove(orderId);
    return true;
}

export default router;