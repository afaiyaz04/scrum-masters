import express from 'express';

import { createClient, deleteClient, getClient, updateClient } from '../controllers/client.js';

const router = express.Router();

router.post('/', createClient);
router.get('/:id', getClient);
router.patch('/:id', updateClient);
router.delete('/:id', deleteClient);

export default router;