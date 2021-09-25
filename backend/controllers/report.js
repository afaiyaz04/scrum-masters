import express from 'express';
import mongoose from 'mongoose';

import User from '../models/user.js'
import Order from '../models/order.js'
import Product from '../models/product.js'

const router = express.Router();

export const viewReport = async (req, res) => {
    const {id} = req.params();
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
        // user name
        const user = await User.findById(userId);
        if (user == null) {
            return res.status(404).send(`No user with id: ${userId}`);
        }
        const userName = user.userName;

        // number of total clients
        const totalClients = user.clients.length;

        // number of orders according to status
        const orderStatus = {}
        for (var i = 0; i < user.orders.length; i++) {
            var currStatus = user.orders[i].status;
            if (!(orderStatus.hasOwnProperty(currStatus))){
                orderStatus[currStatus] = 1;
            }
            else {orderStatus[currStatus] += 1;}
        }

        // number of clients with active orders (may not implement)

        // total revenue for the user
        const totalRevenue = 0;
        for (var i = 0; i < user.orders.length; i++) {
            var orderId = user.orders[i];
            const order = Order.findById(orderId);
            
            for (var j = 0; j < order.lineProducts.length; j++){
                var quantity = order.lineProducts[j].quantity;
                const product = await Product.findById(
                    order.lineProducts[j].productId
                );
                const productPrice = product.price;
                totalRevenue += (quantity * productPrice)
            }
            const orderFee = order.totalFee;
            totalRevenue += orderFee;
        }
     return {User: userName, orderStatus: orderStatus, 
        totalClients: totalClients, totalRevenue: totalRevenue};

    } catch (error) {
        res.status(404).json({ message: error.message});
    }
    
};

export default router;