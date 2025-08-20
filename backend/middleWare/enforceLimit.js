// middleware/enforceLimits.js
import { PLANS } from "../config/plan.js";

export const enforceLimits = (resource) => {
    return (req, res, next) => {
        const user = req.user;

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // ✅ Find the active subscription
        const activeSub = user.subscriptions?.find(sub => sub.active === true);

        if (!activeSub) {
            return res.status(403).json({
                success: false,
                message: "No active subscription found. Please subscribe to continue.",
            });
        }

        const planKey = activeSub.plan.toUpperCase();
        console.log(planKey)
        const planLimits = PLANS[planKey];

        if (!planLimits || planLimits[resource] === undefined) {
            return res.status(400).json({
                success: false,
                message: `Invalid resource: ${resource} for plan: ${planKey}`,
            });
        }

        // ✅ Get allowed limit & usage
        const limit = planLimits[resource];
        const used = activeSub.limits?.[resource]?.used || 0;

        // Debug log (only in dev)
        if (process.env.NODE_ENV !== "production") {
            console.log(
                `[Limit Check] User: ${user._id}, Plan: ${planKey}, Resource: ${resource}, Used: ${used}, Limit: ${limit}`
            );
        }

        // ✅ Enforce limit
        if (limit !== Infinity && used >= limit) {
            return res.status(403).json({
                success: false,
                message: `You have reached the ${resource} limit (${limit}) for the ${planKey} plan.`,
            });
        }

        next();
    };
};
