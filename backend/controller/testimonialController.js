import Testimonial from '../model/TestimonialModel.js';
import cloudinary from '../config/cloudinary.js';

// ➕ Create a testimonial
export const createTestimonial = async (req, res) => {
    try {
        const freelancerId = req.user.userId;
        const { clientName, clientRole, clientCompany, feedback, rating } = req.body;

        let clientPhoto = {};
        if (req.file) {
            const result = await cloudinary.uploader.upload_stream(
                { folder: 'testimonial-photos' },
                (error, result) => {
                    if (error) throw error;
                    clientPhoto = {
                        url: result.secure_url,
                        name: req.file.originalname,
                    };

                    const newTestimonial = new Testimonial({
                        freelancerId,
                        clientName,
                        clientRole,
                        clientCompany,
                        feedback,
                        rating,
                        clientPhoto,
                    });

                    newTestimonial.save().then((saved) => {
                        return res.status(201).json(saved);
                    });
                }
            );
            result.end(req.file.buffer);
        } else {
            const newTestimonial = new Testimonial({
                freelancerId,
                clientName,
                clientRole,
                clientCompany,
                feedback,
                rating,
            });
            await newTestimonial.save();
            res.status(201).json(newTestimonial);
        }
    } catch (err) {
        console.error('Error creating testimonial:', err);
        res.status(500).json({ message: 'Failed to create testimonial' });
    }
};

// 📥 Get testimonials by freelancer
export const getTestimonials = async (req, res) => {
    try {
        const freelancerId = req.params.freelancerId;
        const testimonials = await Testimonial.find({ freelancerId }).sort({ createdAt: -1 });
        res.status(200).json(testimonials);
    } catch (err) {
        console.error('Error fetching testimonials:', err);
        res.status(500).json({ message: 'Failed to fetch testimonials' });
    }
};

// ✏️ Update a testimonial
export const updateTestimonial = async (req, res) => {
    try {
        const testimonialId = req.params.id;
        const updates = req.body;

        if (req.file) {
            const result = await cloudinary.uploader.upload_stream(
                { folder: 'testimonial-photos' },
                (error, result) => {
                    if (error) throw error;

                    updates.clientPhoto = {
                        url: result.secure_url,
                        name: req.file.originalname,
                    };

                    Testimonial.findByIdAndUpdate(testimonialId, updates, { new: true })
                        .then((updated) => res.status(200).json(updated))
                        .catch(() => res.status(404).json({ message: 'Testimonial not found' }));
                }
            );
            result.end(req.file.buffer);
        } else {
            const updated = await Testimonial.findByIdAndUpdate(testimonialId, updates, { new: true });
            if (!updated) return res.status(404).json({ message: 'Testimonial not found' });
            res.status(200).json(updated);
        }
    } catch (err) {
        console.error('Error updating testimonial:', err);
        res.status(500).json({ message: 'Failed to update testimonial' });
    }
};

// ❌ Delete testimonial
export const deleteTestimonial = async (req, res) => {
    try {
        const testimonialId = req.params.id;
        await Testimonial.findByIdAndDelete(testimonialId);
        res.status(200).json({ message: 'Testimonial deleted' });
    } catch (err) {
        console.error('Error deleting testimonial:', err);
        res.status(500).json({ message: 'Failed to delete testimonial' });
    }
};
