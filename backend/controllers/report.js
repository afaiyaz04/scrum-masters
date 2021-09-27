import express from 'express';
import mongoose from 'mongoose';

import User from '../models/user.js'
import Order from '../models/order.js'
import Product from '../models/product.js'

const router = express.Router();

export const viewReport = async (req, res) => {
    const { id } = req.params;
    const report = await generateReport(id, res);
    res.json(report);
};

export const viewAllReports = async (req, res) => {
    const allUsers = await User.find();
    const allReports = [];
    for (var i = 0; i < allUsers.length; i++){
        const userReport = await generateReport(allUsers[i].id, res);
        allReports.push(userReport);
    }
    res.json(allReports);

};

async function generateReport(userId, res) {
    try {
        const user = await User.findById(userId);
        if (user == null) {
            return res.status(404).send(`No user with id: ${userId}`);
        }
        const name = user.nameFirst + " " + user.nameLast;

        // number of total clients
        const totalClients = user.clients.length;
        const totalOrders = user.orders.length;

        // aggregate order properties
        const orderStatus = {}
        var totalRevenue = 0;
        for (var i = 0; i < user.orders.length; i++) {
            var orderId = user.orders[i];
            var order = await Order.findById(orderId);
            
            // count orders by status
            var currStatus = order.status;
            if (!(orderStatus.hasOwnProperty(currStatus))) {
                orderStatus[currStatus] = 1;
            }
            else { 
                orderStatus[currStatus] += 1;
            }
            
            // get revenue
            for (var j = 0; j < order.lineProducts.length; j++) {
                var quantity = order.lineProducts[j].quantity;
                var product = await Product.findById(
                    order.lineProducts[j].productId
                );
                var productPrice = product.price;
                totalRevenue += (quantity * productPrice)
            }
            var orderFee = order.totalFee;
            totalRevenue += orderFee;
        }
        
        return { 
            name: name, 
            orderStatus: orderStatus, 
            totalOrders: totalOrders,
            totalClients: totalClients, 
            totalRevenue: totalRevenue
        };

    } catch (error) {
        res.status(404).json({ message: error.message});
    }
    
};

export default router;