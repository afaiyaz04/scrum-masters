import express from 'express';

import { createClient, deleteClient, getClient, updateClient } from '../controllers/client.js';

const router = express.Router();

router.post('/client', createClient);
router.get('/client/:clientId', getClient);
router.patch('/client/:clientId', updateClient);
router.delete('/client/:clientId', deleteClient);

export default router;