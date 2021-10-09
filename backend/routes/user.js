import express from 'express';

import { 
    createUser,
    getUser, 
    updateUser, 
    deleteUser, 
    getAllUsers,
    getUserOrders,
    addUserOrder,
    getUserClients,
    addUserClient,
    transferOrder,
    deleteUserOrder,
    deleteUserClient,
    promoteUser,
} from '../controllers/user.js';
import auth from '../middleware/auth.js';

const router = express.Router();
// CRUD
router.get('/', getAllUsers);
router.post('/', auth, createUser);
router.get('/:id', getUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

// Adding an order to a user
router.get('/:id/orders', getUserOrders);
router.post('/:id/orders', addUserOrder);
router.delete('/:id/orders', deleteUserOrder);

// Adding a client to a user
router.get('/:id/clients', getUserClients);
router.post('/:id/clients', addUserClient);
router.delete('/:id/clients', deleteUserClient);

// Transferring an order
router.patch('/:id/transfer', transferOrder);
router.patch('/:id/promote', promoteUser);

export default router;

