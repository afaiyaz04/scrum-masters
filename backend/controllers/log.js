import express from 'express';
import mongoose from 'mongoose';

import Log from '../models/log.js';

const router = express.Router();

export const createLog = async (req, res) => {
    const { user, text } = req.body;

    const newLog = new Log({ user, text })

    try {
        await newLog.save();

        res.status(201).json(newLog);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getLog = async (req, res) => {
    const { id } = req.params;

    try {
        const log = await Log.findById(id);
        
        res.status(200).json(log);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateLog = async (req, res) => {
    const { id } = req.params;
    const { user, text } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No log with id: ${id}`);
    }

    const updatedLog = { user, text, _id: id };

    await Log.findByIdAndUpdate(id, updatedLog, { new: true });

    res.json(updatedLog);
}

export const deleteLog = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No log with id: ${id}`);
    }

    await Log.findByIdAndRemove(id);

    res.json({ message: "Log deleted successfully." });
}

export default router;