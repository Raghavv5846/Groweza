import mongoose from 'mongoose';

const availabilitySchema = new mongoose.Schema({
    freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
    timeSlots: [{ start: String, end: String }], // e.g. "10:00" - "14:00"
}, { timestamps: true });

export default mongoose.model('Availability', availabilitySchema);
