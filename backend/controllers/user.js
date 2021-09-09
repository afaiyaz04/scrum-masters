import express from 'express';
import mongoose from 'mongoose';

import User from '../models/user.js';

const router = express.Router();

// Create user
export const createUser = async (req, res) => {
    const {email, password, nameFirst, nameLast, type, clients, orders,
    contracts} = req.body;

    const newUser = new User({email, password, nameFirst, nameLast, type, 
        clients, orders, contracts})

    try {
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(409).json({message: error.message});
    }
}

// Get user
export const getUser = async (req, res) => { 
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Update user
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const {email, password, nameFirst, nameLast, type, clients, orders,
        contracts, _id: id}; 
    
    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).send(`No user with id: ${id}`);

    const updatedUser = {email, password, nameFirst, nameLast, type, clients, orders,
        contracts} = req.body;

    await User.findByIdAndUpdate(id, updatedUser, { new: true });

    res.json(updatedUser);
}

// Delete user
export const deleteUser = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).send(`No user with id: ${id}`);
    
    await User.findByIdAndRemove(id);

    res.json({message: "User deleted successfully."});
}

// Get all users
export const getAllUsers = async (req, res) => { 
    try {
        const allUsers = await User.find();
                
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
