// backend/utils/getUserPlan.js
import Subscription from "../model/subscriptionModel.js";
import { PLANS } from "./plan.js";

export const getUserPlan = async (userId) => {
    const subscription = await Subscription.findOne({
        freelancerId: userId,
        status: "active",
    });

    if (!subscription) {
        return PLANS.BASIC; // fallback to Basic if none found
    }

    return PLANS[subscription.plan];
};
