import express from 'express';
import { authenticate } from '../middleWare/authMiddleware.js';
import upload from '../middleWare/proposalMulter.js';
import { createProposal, generateProposalContent, getAllProposalsForFreelancer } from '../controller/proposalController.js';


const router = express.Router();

router.post('/', authenticate, upload.single('document'), createProposal);
router.post("/generate" , authenticate , generateProposalContent );
router.get('/my-proposals', authenticate, getAllProposalsForFreelancer);

export default router;
