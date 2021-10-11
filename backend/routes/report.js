import express from 'express'

import {
        viewReport,
        viewAllReports
} from '../controllers/report.js';

import auth from '../middleware/auth.js';
 
const router = express.Router();

router.get("/:id", auth, viewReport);
router.get("/", auth, viewAllReports);

export default router;