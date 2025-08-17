// // utils/incrementUsage.js
// import User from "../model/userModel.js";

// export const incrementUsage = async (userId, resource) => {
//     const user = await User.findById(userId);
//     if (!user) return;

//     if (
//         user.subscription.limits[resource] &&
//         user.subscription.limits[resource].max !== "unlimited"
//     ) {
//         user.subscription.limits[resource].used += 1;
//         await user.save();
//     }
// };

// utils/incrementUsage.js
import User from "../model/userModel.js";

export const incrementUsage = async (userId, resource) => {
    const user = await User.findById(userId);
    if (!user) return;

    // ✅ Find active subscription
    const activeSub = user.subscriptions?.find(sub => sub.active === true);
    if (!activeSub) return;

    // ✅ Safety check
    if (!activeSub.limits || !activeSub.limits[resource]) return;

    const currentLimit = activeSub.limits[resource].max;
    const currentUsed = activeSub.limits[resource].used || 0;

    // ✅ Only increment if there's a max and not already at limit
    if (currentLimit !== null && currentLimit !== Infinity && currentUsed >= currentLimit) {
        // Already at limit → don’t increment
        return;
    }

    // ✅ Increment usage
    activeSub.limits[resource].used = currentUsed + 1;

    // ✅ Save the specific subdoc
    await user.save();
};
