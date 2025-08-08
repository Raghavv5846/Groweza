import express from 'express';
import { completeOnboarding, getFreelancer, updateFreelancerProfile, uploadInvoiceLogo } from '../controller/freelancerController.js';
import upload from '../middleWare/multer.js';
import { protect } from '../middleWare/protect.js';
import { authenticate } from '../middleWare/authMiddleware.js';


const router = express.Router();

router.get("/me" , protect , getFreelancer);


// For single file named 'profile'

router.put('/onboard', protect, upload.single('profile'), completeOnboarding);
router.put('/upload-invoice-logo', authenticate, upload.single('logo'), uploadInvoiceLogo);
router.put('/updateProfile', protect, upload.single('profile'), updateFreelancerProfile);

export default router;
