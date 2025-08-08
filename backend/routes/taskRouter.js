import express from 'express';
import { authenticate } from '../middleWare/authMiddleware.js';
import { updateTaskStatus } from '../controller/clientController.js';



const router = express.Router();

router.use(authenticate); // protect all routes


router.put('/:clientId/:workId',  updateTaskStatus);

export default router;