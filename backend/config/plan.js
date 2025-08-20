// backend/config/plans.js
export const PLANS = {
    FREE: {
        name: "Free",
        price: 0,
        currency: "USD",

        // direct resource limits
        clients: 3,
        invoices: 2,
        proposals: 2,  // per month
        meetings: 1,   // per month

        // other feature flags
        reminders: "none",
        selfReminders: false,
        profileURL: true,   // but only on platform domain
        customDomain: false,
        emailReminders: false,
        smsReminders: false,
    },

    BASIC: {
        name: "Basic",
        price: 11,
        currency: "USD",

        // direct resource limits
        clients: 15,
        invoices: 20,
        proposals: 16,  // per month
        meetings: 3,    // per month

        // other feature flags
        reminders: "manual",  // manual only
        selfReminders: false,
        profileURL: true,
        customDomain: false,
        emailReminders: "manual",
        smsReminders: false,
    },

    PREMIUM: {
        name: "Premium",
        price: 21,
        currency: "USD",

        // direct resource limits
        clients: Infinity,   // unlimited
        invoices: Infinity,  // unlimited
        proposals: 50,       // per month
        meetings: Infinity,  // unlimited

        // other feature flags
        reminders: "automated",  // auto reminders allowed
        selfReminders: true,
        profileURL: true,
        customDomain: true,
        emailReminders: "auto",
        smsReminders: true,
    },
};
