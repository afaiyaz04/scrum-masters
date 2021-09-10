import express from 'express';

import { createUser, getUser, updateUser, deleteUser, getAllUsers } from '../controllers/user.js';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:id', getUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;

