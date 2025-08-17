// backend/config/plans.js
export const PLANS = {
    BASIC: {
        name: "Basic",
        price: 11,
        currency: "USD",
        features: {
            clientsLimit: 15,
            invoicesLimit: 20,
            proposalsLimit: 16, // per month
            meetingsLimit: 3,   // per month
            reminders: "manual", // manual only
            selfReminders: false,
            profileURL: true,
            customDomain: false,
            emailReminders: "manual",
            smsReminders: false,
        },
    },
    PREMIUM: {
        name: "Premium",
        price: 21,
        currency: "USD",
        features: {
            clientsLimit: null, // unlimited
            invoicesLimit: null,
            proposalsLimit: 50, // per month
            meetingsLimit: null,
            reminders: "automated", // auto reminders allowed
            selfReminders: true,
            profileURL: true,
            customDomain: true,
            emailReminders: "auto",
            smsReminders: true,
        },
    },
};
