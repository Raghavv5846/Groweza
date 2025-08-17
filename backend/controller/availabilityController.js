// import Availability from '../model/availabilityModel.js';

// export const setAvailability = async (req, res) => {
//     try {
//         const freelancerId = req.user.userId;
//         const { day, timeSlots } = req.body;

//         const existing = await Availability.findOneAndUpdate(
//             { freelancerId, day },
//             { day, timeSlots },
//             { upsert: true, new: true }
//         );

//         res.status(200).json(existing);
//     } catch (err) {
//         res.status(500).json({ message: 'Error setting availability', error: err.message });
//     }
// };

// export const getAvailability = async (req, res) => {
//     try {
//         const freelancerId = req.user.userId;
//         const data = await Availability.find({ freelancerId });
//         res.status(200).json(data);
//     } catch {
//         res.status(500).json({ message: 'Failed to fetch availability' });
//     }
// };

import Availability from '../model/availabilityModel.js';
import { logActivity } from '../config/logActivity.js'; // we'll create this

export const setAvailability = async (req, res) => {
    try {
        const freelancerId = req.user.userId;
        const { day, timeSlots } = req.body;

        const existing = await Availability.findOneAndUpdate(
            { freelancerId, day },
            { day, timeSlots },
            { upsert: true, new: true }
        );

        // Log timeline event
        await logActivity(
            freelancerId,
            'AVAILABILITY_SET',
            `Availability set for ${day}`,
            { availabilityId: existing._id }
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

        // Optional: You usually don't log "get" actions unless you want a full audit trail
        res.status(200).json(data);
    } catch {
        res.status(500).json({ message: 'Failed to fetch availability' });
    }
};
