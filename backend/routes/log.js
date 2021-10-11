import express from 'express';

import { createLog, getLog, updateLog, deleteLog } from '../controllers/log.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, createLog);
router.get('/:id', auth, getLog);
router.patch('/:id', auth, updateLog);
router.delete('/:id', auth, deleteLog);

export default router;