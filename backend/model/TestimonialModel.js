import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
    freelancerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    clientName: String,
    clientCompany: String,
    clientRole: String,
    clientPhoto: {
        public_id: String,
        url: String,
    },
    feedback: String,
}, { timestamps: true });

// ✅ This line prevents OverwriteModelError
const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;
