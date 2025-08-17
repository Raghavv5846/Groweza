import ActivityLog from "../model/ActivityModel.js";

export const logActivity = async (userId, type, message, meta = {}) => {
    try {
        const log = new ActivityLog({
            user: userId,
            type,
            message,
            meta
        });
        await log.save();
    } catch (err) {
        console.error("Error logging activity:", err);
    }
};
