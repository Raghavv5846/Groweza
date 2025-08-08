import express from 'express';
import multer from 'multer';
import {
    createTestimonial,
    getTestimonials,
    updateTestimonial,
    deleteTestimonial,
} from '../controller/testimonialController.js';
import { authenticate } from '../middleWare/authMiddleware.js';



const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.use(authenticate);


// ➕ Create
router.post('/',  upload.single('clientPhoto'), createTestimonial);

// 📥 Get all for freelancer
router.get('/:freelancerId', getTestimonials);

// ✏️ Update
router.put('/:id',  upload.single('clientPhoto'), updateTestimonial);

// ❌ Delete
router.delete('/:id',  deleteTestimonial);

export default router;
