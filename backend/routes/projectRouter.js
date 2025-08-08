import express from 'express';
import multer from 'multer';
import {
    createProject,
    getProjectsByFreelancer,
    updateProject,
    deleteProject
} from '../controller/projectController.js';
import upload from"../middleWare/multer.js";
import { authenticate } from '../middleWare/authMiddleware.js';


const router = express.Router();

router.use(authenticate); // protect all routesprot




// 🔒 All routes are protected

// ➕ Create project
router.post('/',  upload.single('image'), createProject);

// 📄 Get all projects for a freelancer
router.get('/:freelancerId',  getProjectsByFreelancer);

// ✏️ Update a project
router.put('/:projectId',  upload.single('image'), updateProject);

// ❌ Delete a project
router.delete('/:projectId',  deleteProject);

export default router;
