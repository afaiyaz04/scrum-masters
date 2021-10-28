import express from "express";
import mongoose from "mongoose";

import User from "../models/user.js";
import Order from "../models/order.js";
import { isAdmin, isAdminOrSelf } from "../controllers/user.js";

const router = express.Router();

export const viewReport = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated!" });
    }

    try {
        const user = await User.findById(id);
        if (user == null) {
            return res.status(404).send(`No user with id: ${id}`);
        }

        if (!isAdminOrSelf(req.userId, user)) {
            return res.json({ message: "No Permission!" });
        }

        const report = await generateReport(user);
        return res.json(report);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

export const viewAllReports = async (req, res) => {
    if (!req.userId) {
        return res.json({ message: "Unauthenticated!" });
    }

    if (!isAdmin(req.userId)) {
        return res.json({ message: "No Permission!" });
    }

    try {
        const allUsers = await User.find();
        const allReports = [];
        for (var i = 0; i < allUsers.length; i++) {
            const userReport = await generateReport(allUsers[i]);
            allReports.push(userReport);
        }
        res.json(allReports);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

async function generateReport(user) {
    const name = user.nameFirst + " " + user.nameLast;

    // number of total clients
    const totalClients = user.clients.length;
    const totalOrders = user.orders.length;

    // aggregate order properties
    const orderStatus = {};
    var totalRevenue = 0;
    let orders = [];

    for (var i = 0; i < user.orders.length; i++) {
        var orderId = user.orders[i];
        var order = await Order.findById(orderId);

        if (order == null) {
            return {};
        }
        // count orders by status
        var currStatus = order.status;
        if (!orderStatus.hasOwnProperty(currStatus)) {
            orderStatus[currStatus] = 1;
        } else {
            orderStatus[currStatus] += 1;
        }

        // get revenue
        for (var j = 0; j < order.lineProducts.length; j++) {
            var quantity = order.lineProducts[j].quantity;

            var productPrice = order.lineProducts[j].price;
            totalRevenue += quantity * productPrice;
        }
        var orderFee = order.totalFee;
        totalRevenue += orderFee;

        orders.push(order);
    }

    return {
        id: user._id,
        name: name,
        orderStatus: orderStatus,
        totalOrders: totalOrders,
        totalClients: totalClients,
        totalRevenue: totalRevenue,
        orders: orders,
    };
}

export default router;
