import express from 'express';
import { authenticate } from '../middleWare/authMiddleware.js';
import { getDashboardStats } from '../controller/dashboardController.js';


const router = express.Router();

router.get('/stats', authenticate,getDashboardStats );


export default router;