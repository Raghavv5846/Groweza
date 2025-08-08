import mongoose from 'mongoose';

const proposalSchema = new mongoose.Schema({
    freelancerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    clientEmail: { type: String, required: true },
    clientName: { type: String },
    projectTitle: { type: String },
    projectDescription: { type: String },
    generatedProposal: { type: String },
    customNotes: { type: String },
    document: {
        url: String,
        name: String,
        uploadedAt: {
            type: Date,
            default: Date.now,
        },
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending',
    },
}, { timestamps: true });

export default mongoose.model('Proposal', proposalSchema);
