import express from 'express';

import { 
    createUser, 
    getUser, 
    updateUser, 
    deleteUser, 
    getAllUsers,
    getUserOrders,
    addUserOrder
} from '../controllers/user.js';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:id', getUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/:id/orders', getUserOrders);
router.post('/:id/orders', addUserOrder);

export default router;

