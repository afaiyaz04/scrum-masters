import express from 'express';
import mongoose from 'mongoose';

import Product from '../models/product.js';

const router = express.Router();

export const createProduct = async (req, res) => {
    const { name, description, price } = req.body;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated!"});
    }

    const newProduct = new Product({ name, description, price });

    try {
        await newProduct.save();

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getProduct = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated!"});
    }

    try {
        const product = await Product.findById(id);
        
        if (product == null) {
            return res.status(404).send(`No product with id: ${id}`);
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated!"});
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`Invalid id: ${id}`);
    }

    const updatedProduct = { name, description, price, _id: id };

    const product = await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
    
    if (product == null ) {
        return res.status(404).send(`No product with id: ${id}`);
    }
    res.json(product);
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated!"});
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No product with id: ${id}`);
    }

    const product = await Product.findByIdAndRemove(id);

    if (product == null ) {
        return res.status(404).send(`No product with id: ${id}`);
    }
    res.json({ message: "Product deleted successfully." });
}

export default router;