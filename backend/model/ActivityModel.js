import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true }, // e.g. "INVOICE_CREATED", "MEETING_SCHEDULED"
    message: { type: String, required: true }, // human-readable message
    meta: { type: Object }, // extra data like invoiceId, meetingId etc.
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("ActivityLog", activityLogSchema);
