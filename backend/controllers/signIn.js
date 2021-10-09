import express from 'express';
import User from '../models/user.js';

const router = express.Router();

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
            res.status(201).json(existingUser);
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

export default router;