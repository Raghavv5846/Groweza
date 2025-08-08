import mongoose from 'mongoose';

const meetingSchema = new mongoose.Schema({
    freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    clientName: String,
    clientEmail: { type: String, required: true },
    meetingDate: { type: Date, required: true },
    startTime: { type: String, required: true }, // e.g. "14:00"
    endTime: { type: String, required: true },
    platform: { type: String, enum: ['Zoom', 'Google Meet'], default: 'Zoom' },
    meetingLink: String,
    notes: String,
    status: {
        type: String,
        enum: ['Pending', 'Scheduled', 'Rescheduled', 'Cancelled', 'Completed', 'Rejected'],
        default: 'Scheduled',
    },
}, { timestamps: true });

export default mongoose.model('Meeting', meetingSchema);
