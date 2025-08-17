import express from 'express';
import { authenticate } from '../middleWare/authMiddleware.js';
import { addClient, addClientWork, deleteClient, deleteClientWork, getAllClients, getClientWorks, sendPaymentReminder, updateClient, updateClientWork, updatePaymentStatus } from '../controller/clientController.js';
import upload from '../middleWare/multer.js';
import { enforceLimits } from '../middleWare/enforceLimit.js';


const router = express.Router();

router.use(authenticate); // protect all routes

// Client routes
router.get('/', getAllClients);
router.post('/', addClient);
router.put('/:clientId', updateClient);
router.delete('/:clientId', deleteClient);

// Work routes under client
router.get('/:clientId/works', getClientWorks);
router.post('/:clientId/works', upload.single('document'), enforceLimits("clients"), addClientWork);
router.put('/:clientId/works/:workId', upload.single('document'), updateClientWork);
router.delete('/:clientId/works/:workId', deleteClientWork);
router.post('/:clientId/works/:workId/remind', sendPaymentReminder);





export default router;
