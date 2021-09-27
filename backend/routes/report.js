import express from 'express'

import {
        viewReport,
        viewAllReports
        
} from '../controllers/report.js';
 
const router = express.Router();

router.get("/:id", viewReport);
router.get("/", viewAllReports);

export default router;