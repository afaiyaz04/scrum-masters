import express from 'express';
import mongoose from 'mongoose';

import User from '../models/user.js';
import Order from '../models/order.js';
import Client from '../models/client.js';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { ADMIN_USER, GENERAL_USER } from '../models/systemEnums.js';
import { removeOrder } from '../controllers/order.js';

const router = express.Router();

// Create user
export const createUser = async (req, res) => {
    const { 
        email, 
    } = req.body;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated!"});
    }

    if (!await await isAdmin(req.userId)) {
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
        if (!await isAdminOrSelf(req.userId, user)) {
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
     if (!await await isAdminOrSelf(req.userId, user)) {
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
    if (user == null) {
        return res.status(404).send(`No user with id: ${id}`);
    }
    // Check admin requested or is self
    if (!await await isAdminOrSelf(req.userId, user)) {
        return res.json({ message: "No permission!"});
    }

    for (var i = 0; i < user.clients.length; i++) {
        var clientId = user.clients[i];
        await Client.findByIdAndRemove(clientId);

    }

    for (var i = 0; i < user.orders.length; i++){
        var orderId = user.orders[i];
        await removeOrder(orderId);

    }

    const toUser = await User.findByIdAndRemove(id);
    // if (toUser == null) {
    //     return res.status(404).send(`No user with id: ${id}`);
    // }

    
    res.json({message: "User deleted successfully."});
}

// Get all users
export const getAllUsers = async (req, res) => { 
    if (!req.userId) {
        return res.json({ message: "Unauthenticated!"});
    }

    try {
        if (!(await await isAdmin(req.userId))) {
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
        if (!await await isAdminOrSelf(req.userId, user)) {
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
        if (!await await isAdminOrSelf(req.userId, user)) {
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
        await removeOrder(orderId);
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
        if (!await isAdminOrSelf(req.userId, user)) {
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
        if (!await isAdminOrSelf(req.userId, user)) {
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
        if (!await isAdminOrSelf(req.userId, user)) {
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
        if (!await isAdminOrSelf(req.userId, user)) {
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
        if (!await isAdminOrSelf(req.userId, user)) {
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

        const orderIndex = user.orders.findIndex(o => {return o._id == orderId});
        if (orderIndex != -1) {
            const receivedOrder = { fromUser: user._id, order: order._id };
            if (!toUser.receivedOrders.includes(receivedOrder)) {
                toUser.receivedOrders.push(receivedOrder);
                user.orders.splice(orderIndex, 1);

                await toUser.save();
                await user.save();
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


export const acceptOrder = async (req, res) => {
    const { id } = req.params;
    const { orderId, accept } = req.body;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated!"});
    }

    try {
        const user = await User.findById(id);
        if (user == null) {
            return res.status(404).send(`No user with id: ${id}`);
        }

        // Check if either is admin, or is user self
        if (!await isAdminOrSelf(req.userId, user)) {
            return res.json({ message: "No permission!"});
        }

        // Check if this order is in our received list
        const rOrderIndex = user.receivedOrders.findIndex(rOrder => {
            return rOrder.order == orderId;
        });

        if (rOrderIndex == -1) {
            return res.status(404).send("User doesn't contain order");
        }

        const receivedOrder = user.receivedOrders[rOrderIndex];

        const fromUser = await User.findById(receivedOrder.fromUser);
        const order = await Order.findById(orderId);
        if (fromUser == null || order == null) {
            // We need to maybe force an accept or kill order
            return res.status(404).send("Order or from user no longer exists");
        }

        
        if (accept === 'true') {
            user.orders.push(orderId);
        } else {
            // return to sender
            fromUser.receivedOrders.push({ 
                fromUser: user._id, 
                order: order._id
            });
        }

        // Remove from receivedOrders
        user.receivedOrders.splice(rOrderIndex, 1);
        await fromUser.save();
        await user.save();
        return res.json({fromUser: fromUser, toUser: user});

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
        if (user == null) {
            return res.status(404).send(`No user with id: ${id}`);
        }

        if (!(await isAdmin(req.userId))) return res.status(403).json('Forbidden action');

        const toUser = await User.findById(toUserId);
        if (toUser == null) {
            return res.status(404).send(`No user with id: ${toUserId}`);
        }
        toUser.type = ADMIN_USER;

        await toUser.save();
        res.status(201).json(toUser);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getFavourites = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated!"});
    }

    try {
        const user = await User.findById(id);
        if (user == null) {
            return res.status(404).send(`No user with id: ${id}`);
        }
        if (!await isAdminOrSelf(req.userId, user)) {
            res.status(403).json('Forbidden action');
        }

        const getClients = async () => { 
            return Promise.all(
                user.clients.map(async (clientId) => {
                    return await Client.findById(clientId);
                })
            )
        }; 

        getClients().then((clients) => {
            const favIds = clients.filter((client) => client.fav);
            res.status(200).json(favIds);
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export async function isAdmin(reqId) {
    const user = await User.findOne( { oauthId: reqId } );
    return user?.type == ADMIN_USER;
}

export async function isAdminOrSelf(reqId, user) {
    return await isAdmin(reqId) || reqId == user?.oauthId;
}


export default router;