import { sendWorkPaymentEmailReminder, updatePaymentStatus } from "../controller/clientController.js";
import { authenticate } from "../middleWare/authMiddleware.js";
import express from "express";

const router = express.Router();


router.use(authenticate); // protect all routes


//payment upgrading  route 

router.put('/:clientId/:workId/payment', updatePaymentStatus);
router.post('/:clientId/:workId/remind', sendWorkPaymentEmailReminder);

export default router;