// backend/models/subscriptionModel.js
import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    freelancerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Assuming your freelancer is stored in User model
        required: true,
    },
    plan: {
        type: String,
        enum: ["BASIC", "PREMIUM"],
        required: true,
    },
    startDate: {
        type: Date,
        default: Date.now,
    },
    endDate: {
        type: Date,
    },
    status: {
        type: String,
        enum: ["active", "cancelled", "expired"],
        default: "active",
    },
});

export default mongoose.model("Subscription", subscriptionSchema);
