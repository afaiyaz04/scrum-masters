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
    addUserClient
} from '../controllers/user.js';

const router = express.Router();
// CRUD
router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:id', getUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

// Adding an order to a user
router.get('/:id/orders', getUserOrders);
router.post('/:id/orders', addUserOrder);

// Adding a client to a user
router.get('/:id/clients', getUserClients);
router.post('/:id/clients', addUserClient);
export default router;

