// // middleware/enforceLimits.js
// import { PLANS } from "../config/plan.js";
// export const enforceLimits = (resource) => {
//     return (req, res, next) => {
//         const user = req.user;
//         const plan = user.subscription.plan;

//         const limit = PLANS[plan][resource];
//         const used =
//             resource === "proposals"
//                 ? user.subscription.limits.proposals.used
//                 : resource === "meetings"
//                     ? user.subscription.limits.meetings.used
//                     : user.subscription.limits[resource];

//         if (limit !== Infinity && used >= limit) {
//             return res.status(403).json({
//                 success: false,
//                 message: `You have reached the ${resource} limit for the ${plan} plan.`,
//             });
//         }

//         next();
//     };
// };


// middleware/enforceLimits.js
import { PLANS } from "../config/plan.js";

export const enforceLimits = (resource) => {
    return (req, res, next) => {
        const user = req.user;

        // ✅ Find the active subscription
        const activeSub = user.subscriptions?.find(sub => sub.active === true);

        if (!activeSub) {
            return res.status(403).json({
                success: false,
                message: "No active subscription found. Please subscribe to continue.",
            });
        }

        const plan = activeSub.plan;
        const planLimits = PLANS[plan];

        if (!planLimits || !planLimits[resource]) {
            return res.status(400).json({
                success: false,
                message: `Invalid resource: ${resource}`,
            });
        }

        // ✅ Get the limit for this resource
        const limit = planLimits[resource];

        // ✅ Get the "used" value from subscription.limits
        const used = activeSub.limits?.[resource]?.used || 0;

        if (limit !== Infinity && used >= limit) {
            return res.status(403).json({
                success: false,
                message: `You have reached the ${resource} limit for the ${plan} plan.`,
            });
        }

        next();
    };
};
