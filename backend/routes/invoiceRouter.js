import express from 'express';
import { authenticate } from '../middleWare/authMiddleware.js';
import { createInvoice, getAllInvoicesForFreelancer,    sendInvoiceToClient,  updateInvoiceStatus } from '../controller/invoiceController.js';
import multer from "multer";
import { enforceLimits } from '../middleWare/enforceLimit.js';



const router = express.Router();

router.use(authenticate); // protect all routes



const storage = multer.memoryStorage();
const upload = multer({ storage });

// Invoice routes


router.post('/', enforceLimits("invoices") , createInvoice);
router.get('/:freelancerId', getAllInvoicesForFreelancer);
router.post("/send-invoice", upload.single('pdf') , sendInvoiceToClient );
router.put('/:invoiceId/status',  updateInvoiceStatus);



export default router;
