import express from 'express';
import mongoose from 'mongoose';

import Client from '../models/client.js';

const router = express.Router();

export const createClient = async (req, res) => {
    const {
        nameFirst,
        nameLast,
        title,
        company,
        email,
        phoneNumber,
        address
    } = req.body;

    const newClient = new Client({
        nameFirst,
        nameLast,
        title,
        company,
        email,
        phoneNumber,
        address
    })

    try {
        await newClient.save();

        res.status(201).json(newClient);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getClient = async (req, res) => {
    const { id } = req.params;

    try {
        const client = await Client.findById(id);
        
        if (client == null) {
            return res.status(404).send(`No client with id: ${id}`);
        }
        res.status(200).json(client);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateClient = async (req, res) => {
    const { id } = req.params;
    const {
        nameFirst,
        nameLast,
        title,
        company,
        email,
        phoneNumber,
        address
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No client with id: ${id}`);
    }

    const updatedClient = {
        nameFirst,
        nameLast,
        title,
        company,
        email,
        phoneNumber,
        address,
        _id: id
    };

    const client = await Client.findByIdAndUpdate(id, updatedClient, 
                                                  { new: true });
    if (client == null) {
        return res.status(404).send(`No client with id: ${id}`);
    }

    res.json(updatedClient);
}

export const deleteClient = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No client with id: ${id}`);
    }

    const client = await Client.findByIdAndRemove(id);
    if (client == null) {
        return res.status(404).send(`No client with id: ${id}`);
    }

    res.json({ message: "Client deleted successfully." });
}

export default router;