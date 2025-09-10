// backend/config/razorPlans.js
export const PLANS = {
    FREE: {
        name: "Free",
        price: 0,
        currency: "INR",

        clients: 3,
        invoices: 2,
        proposals: 2,
        meetings: 1,

        reminders: "none",
        selfReminders: false,
        profileURL: true,
        customDomain: false,
        emailReminders: false,
        smsReminders: false,
    },

    BASIC: {
        name: "Basic",
        price: 900,  // ₹900 per month
        currency: "INR",

        clients: 15,
        invoices: 20,
        proposals: 16,
        meetings: 3,

        reminders: "manual",
        selfReminders: false,
        profileURL: true,
        customDomain: false,
        emailReminders: "manual",
        smsReminders: false,
    },

    PREMIUM: {
        name: "Premium",
        price: 1700,  // ₹1700 per month
        currency: "INR",

        clients: Infinity,
        invoices: Infinity,
        proposals: 50,
        meetings: Infinity,

        reminders: "automated",
        selfReminders: true,
        profileURL: true,
        customDomain: true,
        emailReminders: "auto",
        smsReminders: true,
    },
};
