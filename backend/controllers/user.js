import express from 'express';
import mongoose from 'mongoose';

import User from '../models/user.js';
import Order from '../models/order.js';
import Client from '../models/client.js';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const router = express.Router();

const secret = 'test';

// Create user
export const createUser = async (req, res) => {
    const { 
        email, 
        password, 
        nameFirst, 
        nameLast, 
        type
    } = req.body;

    // const newUser = new User({
    //     email, 
    //     password, 
    //     nameFirst, 
    //     nameLast, 
    //     type
    // });

    // try {
    //     await newUser.save();
    //     res.status(201).json(newUser);
    // }
    // catch (error) {
    //     res.status(409).json({message: error.message});
    // }

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ email, password: hashedPassword, nameFirst, nameLast });

    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
}

// Get user
export const getUser = async (req, res) => { 
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (user == null) {
            return res.status(404).send(`No user with id: ${id}`);
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Update user
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const {
        email, 
        password, 
        nameFirst, 
        nameLast, 
        type
    } = req.body; 
    
    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).send(`Invalid user id: ${id}`);

    const updatedUser = {
        email, 
        password, 
        nameFirst, 
        nameLast, 
        type,
        _id: id
    };

    const user = await User.findByIdAndUpdate(id, updatedUser, { new: true });
    if (user == null) {
        return res.status(404).send(`No user with id: ${id}`);
    }

    res.json(user);
}

// Delete user
export const deleteUser = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).send(`No user with id: ${id}`);
    
    const user = await User.findByIdAndRemove(id);
    if (user == null) {
        return res.status(404).send(`No user with id: ${id}`);
    }
    
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

export const addUserOrder = async (req, res) => {
    const { id } = req.params;
    const { orderId } = req.body;

    try {
        // need to check id and order exist
        const user = await User.findById(id);
        if (user == null) {
            return res.status(404).send(`No user with id: ${id}`);
        }

        const order = await Order.findById(orderId);
        if (order == null) {
            return res.status(404).send(`No order with id: ${orderId}`);
        }

        
        if (user.orders.indexOf(orderId) != -1) {
            return res.status(406).send('Cannot add order (already exists)');
        }

        user.orders.push(orderId);
        user.save();
        res.json(user);

    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}


export const deleteUserOrder = async (req, res) => {
    const { id } = req.params;
    const { orderId } = req.body;

    try {
        const user = await User.findById(id);
        if (user == null) {
            return res.status(404).send(`No user with id: ${id}`);
        }

        const order = await Order.findById(orderId);
        if (order == null) {
            return res.status(404).send(`No order with id: ${orderId}`);
        }

        const orderIndex = user.orders.indexOf(orderId);
        if (orderIndex ==  -1) {
            return res.status(406).send('Cannot remove order (does not exist)');
        }
        user.orders.splice(orderIndex, 1);
        user.save();
        return res.json(user);


    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// returns orders as a list of what they are, so that frontend doesnt need
// to make several requests to get a list of orders.
export const getUserOrders = async (req, res) => {
    const { id } = req.params;

    try {
        // need to check id and order exist
        const user = await User.findById(id);
        if (user == null) {
            // send error
        }

        const getOrders = async () => { 
            return Promise.all(
                user.orders.map(async (orderId) => {
                    return await Order.findById(orderId);
                })
            )
        }; 

        getOrders().then((orders) => {
            res.json(orders);
        });
        

    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

export const addUserClient = async (req, res) => {
    const { id } = req.params;
    const { clientId } = req.body;

    try {
        // need to check id and order exist
        const user = await User.findById(id);
        if (user == null) {
            return res.status(404).send(`No user with id: ${id}`);
        }

        const client = await Client.findById(clientId);
        if (client == null) {
            return res.status(404).send(`No client with id: ${clientId}`);
        }

        
        if (user.clients.indexOf(clientId) != -1) {
            return res.status(406).send('Cannot add client (already exists)');
        }

        user.clients.push(clientId);
        user.save();
        res.json(user);

    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

export const deleteUserClient = async (req, res) => {
    const { id } = req.params;
    const { clientId } = req.body;

    try {
        const user = await User.findById(id);
        if (user == null) {
            return res.status(404).send(`No user with id: ${id}`);
        }

        const client = await Client.findById(clientId);
        if (client == null) {
            return res.status(404).send(`No client with id: ${clientId}`);
        }

        const clientIndex = user.clients.indexOf(clientId);
        if (clientIndex ==  -1) {
            return res.status(406).send('Cannot delete client (doesnt exists)');
        }
        user.clients.splice(clientIndex, 1);
        user.save();
        return res.json(user);


    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUserClients = async (req, res) => {
    const { id } = req.params;
    try {
        // need to check id
        const user = await User.findById(id);
        if (user == null) {
            // send error
        }

        const getClients = async () => { 
            return Promise.all(
                user.clients.map(async (clientId) => {
                    return await Client.findById(clientId);
                })
            )
        }; 

        getClients().then((clients) => {
            res.json(clients);
        });
        

    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

export const transferOrder = async (req, res) => {
    const { id } = req.params;
    const { orderId, toUserId} = req.body;
    
    try {
        const user = await User.findById(id);
        if (user == null) {
            return res.status(404).send(`No user with id: ${id}`);
        }

        const order = await Order.findById(orderId);
        if (order == null) {
            return res.status(404).send(`No order with id: ${orderId}`);
        }
        
        const toUser = await User.findById(toUserId);
        if (toUser == null) {
            return res.status(404).send(`No transfer user with id: ${toUserId}`);
        }

        const userOrders = user.orders;
        const toUserOrders = toUser.orders;

        if (userOrders.includes(orderId)) {
            if (!(toUserOrders.includes(orderId))) {
                var orderIndex = userOrders.indexOf(orderId);
                // Remove from user
                if (orderIndex !== -1) {
                    userOrders.splice(orderIndex, 1);
                }
                // Add to new user
                toUserOrders.push(orderId);
                user.save();
                toUser.save();
                return res.json({fromUser: user, toUser: toUser});
            }
        }
        return res.status(404).send(
            "User does not have order or toUser already contains this order!"
        );
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

export const authUserEmail = async (req, res) => {
    const { email } = req.params;

    try {
        const userId = await User.findOne({}, { email });
        const user = await User.findById(userId._id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



export default router;