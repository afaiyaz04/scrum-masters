import express from 'express';
import mongoose from 'mongoose';

import User from '../models/user.js'
import Order from '../models/order.js'
import Product from '../models/product.js'

const router = express.Router();

//export const viewReport = async (req, res) => {

//};

//export const viewAllReports = async (req, res) => {

//};

export const generateReport = async (req, res) => {
    const { id } = req.params;
    try {
        // user name
        const user = await User.findById(id);
        if (user == null) {
            return res.status(404).send(`No user with id: ${id}`);
        }
        const userName = user.userName;

        // number of total clients
        const totalClients = user.clients.length;

        // number of orders according to status
        const orderStatus = {}
        for (var i = 0; i < user.orders.length; i++) {
            var currStatus = user.orders[i].status;
            if (!(orderStatus.hasOwnProperty(currStatus))){
                orderStatus[currStatus] = 0;
            }
            else {orderStatus[currStatus] += 1;}
        }

        // number of clients with active orders (may not implement)

        // total revenue for the user
        const totalRevenue = 0;
        for (var i = 0; i < user.orders.length; i++) {
            var order = user.orders[i];
            var quantity = order.lineProducts.quantity;
            const product = await Product.findById(order.lineProducts.productId);
            const productPrice = product.price;
            const productFee = order.totalFee;
            totalRevenue += ((quantity * productPrice) + productFee)

        }
     res.json({User: userName, orderStatus: orderStatus, 
        totalClients: totalClients, totalRevenue: totalRevenue});

    } catch (error) {
        res.status(404).json({ message: error.message});
    }
    
};

export default router;