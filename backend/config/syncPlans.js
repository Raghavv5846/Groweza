import Razorpay from "razorpay";
import { PLANS } from "../config/razorPlans.js";
import PlanModel from "../model/razorPlanModel.js"; // mongoose schema

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function syncRazorpayPlans() {
    for (const [code, plan] of Object.entries(PLANS)) {
        if (plan.price === 0) {
            // Free plan → no Razorpay
            await PlanModel.updateOne(
                { code },
                { ...plan, razorpayPlanId: null },
                { upsert: true }
            );
            continue;
        }

        // Check DB
        let dbPlan = await PlanModel.findOne({ code });

        if (!dbPlan || !dbPlan.razorpayPlanId) {
            // Create Razorpay plan
            const created = await razorpay.plans.create({
                period: "monthly",
                interval: 1,
                item: {
                    name: plan.name,
                    amount: plan.price * 100, // paise
                    currency: plan.currency,
                },
            });

            // Save in DB
            dbPlan = await PlanModel.findOneAndUpdate(
                { code },
                { ...plan, razorpayPlanId: created.id },
                { upsert: true, new: true }
            );

            console.log(`✅ Created Razorpay plan for ${plan.name}: ${created.id}`);
        } else {
            console.log(`ℹ️ Razorpay plan already exists for ${plan.name}`);
        }
    }
}
