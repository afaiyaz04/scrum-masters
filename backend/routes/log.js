import express from 'express';

import { createLog, getLog, updateLog, deleteLog } from '../controllers/log.js';

const router = express.Router();

router.post('/', createLog);
router.get('/:id', getLog);
router.patch('/:id', updateLog);
router.delete('/:id', deleteLog);

export default router;