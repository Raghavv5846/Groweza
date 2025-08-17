import Project from '../model/projectModel.js';
import fs from 'fs';
import cloudinary from '../config/cloudinary.js';
import { logActivity } from '../config/logActivity.js';

export const createProject = async (req, res) => {
    try {
        const freelancerId = req.user.userId;
        const { title, description, technologies, link } = req.body;

        let imageData = {};
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'freelancer-projects',
            });
            fs.unlinkSync(req.file.path);
            imageData = {
                url: result.secure_url,
                name: req.file.originalname,
            };
        }

        const project = new Project({
            freelancerId,
            title,
            description,
            technologies: technologies ? technologies.split(',') : [],
            link,
            image: imageData,
        });

        await project.save();

        await logActivity(freelancerId, "PROJECT_CREATED", `Created project: ${title}`, { projectId: project._id });

        res.status(201).json({ message: 'Project created successfully', project });
    } catch (error) {
        console.error('Create Project Error:', error);
        res.status(500).json({ message: 'Failed to create project' });
    }
};

export const getProjectsByFreelancer = async (req, res) => {
    try {
        const { freelancerId } = req.params;
        const projects = await Project.find({ freelancerId }).sort({ createdAt: -1 });
        res.status(200).json(projects);
    } catch (error) {
        console.error('Fetch Projects Error:', error);
        res.status(500).json({ message: 'Failed to fetch projects' });
    }
};

export const updateProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { title, description, technologies, link } = req.body;

        let updateData = {
            title,
            description,
            technologies: technologies ? technologies.split(',') : [],
            link,
        };

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'freelancer-projects',
            });
            fs.unlinkSync(req.file.path);
            updateData.image = {
                url: result.secure_url,
                name: req.file.originalname,
            };
        }

        const updated = await Project.findByIdAndUpdate(projectId, updateData, { new: true });

        if (!updated) return res.status(404).json({ message: 'Project not found' });    
        await logActivity(req.user.userId, "PROJECT_UPDATED", `Updated project: ${title}`, { projectId });


        res.status(200).json({ message: 'Project updated successfully', project: updated });
    } catch (error) {
        console.error('Update Project Error:', error);
        res.status(500).json({ message: 'Failed to update project' });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const deleted = await Project.findByIdAndDelete(projectId);
        if (!deleted) return res.status(404).json({ message: 'Project not found' });

        await logActivity(req.user.userId, "PROJECT_DELETED", `Deleted project: ${deleted.title}`, { projectId });


        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Delete Project Error:', error);
        res.status(500).json({ message: 'Failed to delete project' });
    }
};
