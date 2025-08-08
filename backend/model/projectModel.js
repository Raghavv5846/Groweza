// models/projectModel.js
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    freelancerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: { type: String, required: true },
    description: String,
    technologies: [String],
    link: String,
    githubUrl: String,
    image: {
        url: String,
        name: String,
        uploadedAt: { type: Date, default: Date.now },
    },
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
