import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { getDashboardStats, getRevenueSummary } from '../controller/dashboardController.js';

const router = express.Router();

router.get('/stats', authenticate, getDashboardStats);
router.get('/summary', authenticate, getRevenueSummary);

export default router;