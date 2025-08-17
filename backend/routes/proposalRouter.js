import express from 'express';
import { authenticate } from '../middleWare/authMiddleware.js';
import upload from '../middleWare/proposalMulter.js';
import { createProposal, generateProposalContent, getAllProposalsForFreelancer } from '../controller/proposalController.js';
import { enforceLimits } from '../middleWare/enforceLimit.js';


const router = express.Router();

router.post('/', authenticate, upload.single('document'), enforceLimits("proposals"), createProposal);
router.post("/generate", authenticate, enforceLimits("proposals"), generateProposalContent );
router.get('/my-proposals', authenticate, getAllProposalsForFreelancer);

export default router;
