import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema({
    code: { type: String, unique: true }, // FREE, BASIC, PREMIUM
    name: String,
    price: Number,
    currency: String,
    clients: Number,
    invoices: Number,
    proposals: Number,
    meetings: Number,
    reminders: String,
    selfReminders: Boolean,
    profileURL: Boolean,
    customDomain: Boolean,
    emailReminders: mongoose.Schema.Types.Mixed, // "manual" | "auto" | false
    smsReminders: Boolean,

    razorpayPlanId: { type: String, default: null },
});

export default mongoose.model("Plan", PlanSchema);
