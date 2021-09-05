import express from 'express';

import { createUser, getUser, updateUser, deleteUser, getAllUsers } from '../controllers/user.js';

const router = express.Router();

router.get('/user', getAllUsers);
router.post('/user', createUser);
router.get('/user/:id', getUser);
router.patch('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

export default router;

