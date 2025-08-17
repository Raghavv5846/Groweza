import ActivityLog from "../model/ActivityModel.js";

export const getActivities = async (req, res) => {
    try {
        const { type, startDate, endDate, limit } = req.query;
        const filters = { user: req.user.userId };

        if (type) filters.type = type;
        if (startDate || endDate) {
            filters.createdAt = {};
            if (startDate) filters.createdAt.$gte = new Date(startDate);
            if (endDate) filters.createdAt.$lte = new Date(endDate);
        }

        const activities = await ActivityLog.find(filters)
            .sort({ createdAt: -1 })
            .limit(parseInt(limit) || 50);

        res.json(activities);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching activities" });
    }
};

export const createActivity = async (req, res) => {
    try {
        const { type, message, meta } = req.body;
        const log = new ActivityLog({
            user: req.user._id,
            type,
            message,
            meta
        });
        await log.save();
        res.status(201).json(log);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating activity" });
    }
};
