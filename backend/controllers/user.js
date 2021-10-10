import express from 'express';
import mongoose from 'mongoose';

import User from '../models/user.js';
import Order from '../models/order.js';
import Client from '../models/client.js';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { ADMIN_USER, GENERAL_USER } from '../models/systemEnums.js';
import removeOrder from '../controllers/order.js';

const router = express.Router();

// Create user
export const createUser = async (req, res) => {
    const { 
        email, 
    } = req.body;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated!"});
    }

    if (!isAdmin(req.userId)) {
        return res.json({ message: "No permission!"});
    }

    try {
        const newUser = new User({
            email: email, 
        });

        await newUser.save();
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const signIn = async (req, res) => {
    const { 
        email, 
        nameFirst, 
        nameLast
    } = req.body;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated!"});
    }

    try {
        // 1. Check if account has already been authenticated with oatuh
        // This is an existing account
        const existingUser = await User.findOne({ oauthId: req.userId });
        
        if (existingUser) {
            res.status(201).json(oldUser);
            return;
        }


        // 2. Check if a "blank" account has been created with email by admin
        // This is a registered account but not fully created.
        const createdUser = await User.findOne({ email: email });
        if (!createdUser) {
            return res.status(403).send(
                "An admin needs to register an account with this email!"
            );
        }

        // 3. Update this existing user with oauthId + additional info
        createdUser.nameFirst = nameFirst;
        createdUser.nameLast = nameLast;
        createdUser.oauthId = req.userId;
        await createdUser.save();
        return res.status(201).json(createdUser);
    }
    catch (error) {
        res.status(409).json({message: error.message});
    }
}

export async function isAdmin(reqId) {
    const user = await User.findOne( { oauthId: reqId } );
    return user?.type == ADMIN_USER;
}

export async function isAdminOrSelf(reqId, oauthId) {
    // Find the user of reqId
    const user = await User.findOne( { oauthId: reqId } );
    return reqId == oauthId || user?.type == ADMIN_USER;
}

// Get user
export const getUser = async (req, res) => { 
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated!"});
    }

    try {
        const user = await User.findById(id);
        if (user == null) {
            return res.status(404).send(`No user with id: ${id}`);
        }

        // Check admin requested or is self
        if (!isAdminOrSelf(req.userId, user.oauthId)) {
            return res.json({ message: "No permission!"});
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
        nameFirst, 
        nameLast, 
        type
    } = req.body; 
    
    if (!req.userId) {
        return res.json({ message: "Unauthenticated!"});
    }

    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).send(`Invalid user id: ${id}`);

    const updatedUser = {
        email, 
        nameFirst, 
        nameLast, 
        type,
        _id: id
    };

    const user = await User.findByIdAndUpdate(id, updatedUser, { new: true });
    if (user == null) {
        return res.status(404).send(`No user with id: ${id}`);
    }

     // Check admin requested or is self
     if (!isAdminOrSelf(req.userId, user.oauthId)) {
        return res.json({ message: "No permission!"});
    }

    res.json(user);
}

// Delete user
export const deleteUser = async (req, res) => {
    const {id} = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated!"});
    }

    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).send(`No user with id: ${id}`);
    

    const user = await User.findById(id);
    // Check admin requested or is self
    if (!isAdminOrSelf(req.userId, user.oauthId)) {
        return res.json({ message: "No permission!"});
    }

    for (var i = 0; i < user.clients.length; i++){
        var clientId = user.clients[i];
        await Client.findByIdAndRemove(clientId);
    }

    for (var i = 0; i < user.orders.length; i++){
        var orderId = user.orders[i];
        removeOrder(orderId);
    }
    

    const toUser = await User.findByIdAndRemove(id);
    if (toUser == null) {
        return res.status(404).send(`No user with id: ${id}`);
    }

    
    res.json({message: "User deleted successfully."});
}

// Get all users
export const getAllUsers = async (req, res) => { 
    if (!req.userId) {
        return res.json({ message: "Unauthenticated!"});
    }

    try {
        console.log(req.userId);
        if (!(await isAdmin(req.userId))) {
            return res.json({ message: "No permission!" });
        }

        const allUsers = await User.find();
                
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addUserOrder = async (req, res) => {
    const { id } = req.params;
    const { orderId } = req.body;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated!"});
    }

    try {
        // need to check id and order exist
        const user = await User.findById(id);
        if (user == null) {
            return res.status(404).send(`No user with id: ${id}`);
        }

        // Check admin requested or is self
        if (!isAdminOrSelf(req.userId, user.oauthId)) {
            return res.json({ message: "No permission!"});
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

    if (!req.userId) {
        return res.json({ message: "Unauthenticated!"});
    }

    try {
        const user = await User.findById(id);
        if (user == null) {
            return res.status(404).send(`No user with id: ${id}`);
        }

        // Check admin requested or is self
        if (!isAdminOrSelf(req.userId, user.oauthId)) {
            return res.json({ message: "No permission!"});
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
        // here
        removeOrder(orderId);
        return res.json(user);


    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// returns orders as a list of what they are, so that frontend doesnt need
// to make several requests to get a list of orders.
export const getUserOrders = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated!"});
    }

    try {
        // need to check id and order exist
        const user = await User.findById(id);
        if (user == null) {
            // send error
        }

        // Check admin requested or is self
        if (!isAdminOrSelf(req.userId, user.oauthId)) {
            return res.json({ message: "No permission!"});
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

    if (!req.userId) {
        return res.json({ message: "Unauthenticated!"});
    }

    try {
        // need to check id and order exist
        const user = await User.findById(id);
        if (user == null) {
            return res.status(404).send(`No user with id: ${id}`);
        }

        // Check admin requested or is self
        if (!isAdminOrSelf(req.userId, user.oauthId)) {
            return res.json({ message: "No permission!"});
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

    if (!req.userId) {
        return res.json({ message: "Unauthenticated!"});
    }

    try {
        const user = await User.findById(id);
        if (user == null) {
            return res.status(404).send(`No user with id: ${id}`);
        }

        // Check admin requested or is self
        if (!isAdminOrSelf(req.userId, user.oauthId)) {
            return res.json({ message: "No permission!"});
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
        await Client.findByIdAndRemove(clientId)
        return res.json(user);


    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUserClients = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated!"});
    }

    try {
        // need to check id
        const user = await User.findById(id);
        if (user == null) {
            // send error
        }

        // Check admin requested or is self
        if (!isAdminOrSelf(req.userId, user.oauthId)) {
            return res.json({ message: "No permission!"});
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

    if (!req.userId) {
        return res.json({ message: "Unauthenticated!"});
    }
    
    try {
        const user = await User.findById(id);
        if (user == null) {
            return res.status(404).send(`No user with id: ${id}`);
        }

        // Check if either is admin, or is user self
        if (!isAdminOrSelf(req.userId, user.oauthId)) {
            return res.json({ message: "No permission!"});
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

export const promoteUser = async (req, res) => {
    const { id } = req.params;
    const { toUserId } = req.body;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated!"});
    }

    try {
        const user = await User.findById(id);

        if (!(await isAdmin(req.userId))) return res.status(403).json('Forbidden action');

        user.type = ADMIN_USER;
        await user.save();

        res.status(201).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export default router;