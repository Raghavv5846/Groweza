import express from 'express';
import { authenticate } from '../middleWare/authMiddleware.js';
import { getAvailability, setAvailability } from '../controller/availabilityController.js';

const router = express.Router();
router.post('/', authenticate, setAvailability);
router.get('/', authenticate, getAvailability);

export default router;
