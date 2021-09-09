import express from 'express';

import { createLog, getLog, updateLog, deleteLog } from '../controllers/log.js';

const router = express.Router();

router.post('/log', createLog);
router.get('/log/:logId', getLog);
router.patch('/log/:logId', updateLog);
router.delete('/log/:logId', deleteLog);

export default router;