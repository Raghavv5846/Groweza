import Availability from '../model/availabilityModel.js';

export const setAvailability = async (req, res) => {
    try {
        const freelancerId = req.user.userId;
        const { day, timeSlots } = req.body;

        const existing = await Availability.findOneAndUpdate(
            { freelancerId, day },
            { day, timeSlots },
            { upsert: true, new: true }
        );

        res.status(200).json(existing);
    } catch (err) {
        res.status(500).json({ message: 'Error setting availability', error: err.message });
    }
};

export const getAvailability = async (req, res) => {
    try {
        const freelancerId = req.user.userId;
        const data = await Availability.find({ freelancerId });
        res.status(200).json(data);
    } catch {
        res.status(500).json({ message: 'Failed to fetch availability' });
    }
};
