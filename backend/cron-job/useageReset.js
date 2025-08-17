// cron/resetUsage.js
import cron from "node-cron";
import User from "../model/userModel.js";

// Runs every month on the 1st at midnight
cron.schedule("0 0 1 * *", async () => {
    try {
        console.log("🔄 Running monthly usage reset...");

        const users = await User.find();

        for (const user of users) {
            // Reset proposals
            if (user.subscription.limits.proposals) {
                user.subscription.limits.proposals.used = 0;
                user.subscription.limits.proposals.resetAt = new Date();
            }

            // Reset meetings
            if (user.subscription.limits.meetings) {
                user.subscription.limits.meetings.used = 0;
                user.subscription.limits.meetings.resetAt = new Date();
            }

            await user.save();
        }

        console.log("✅ Monthly reset completed");
    } catch (err) {
        console.error("❌ Reset job failed:", err);
    }
});
