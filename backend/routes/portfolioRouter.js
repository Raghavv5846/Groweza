import express from 'express';
import { portolioData } from '../controller/portfolioController.js';
import { authenticate } from '../middleWare/authMiddleware.js';
const router = express.Router();

router.get('/me', authenticate, portolioData);

router.post('/build-site', authenticate, )
export default router;