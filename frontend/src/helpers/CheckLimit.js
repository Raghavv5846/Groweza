// utils/checkLimit.js
export const isLimitReached = (user, resource) => {
    if (!user) return false;

    // get the active subscription (PayPal/Stripe etc.)
    const activeSub = user?.subscriptions?.find(sub => sub.active);

    // pick limits from active subscription, else from top-level subscription
    const limits =
        activeSub?.limits?.[resource] ??
        user?.subscription?.limits?.[resource];

    const max = limits?.max;

    // actual usage
    let used = 0;
    switch (resource) {
        case "clients":
            used = user?.clients?.length || 0;
            break;
        case "invoices":
            used = user?.invoices?.length || 0; // assuming invoices are stored
            break;
        case "proposals":
            used = user?.proposals?.length || limits?.used || 0;
            break;
        case "meetings":
            used = user?.meetings?.length || limits?.used || 0;
            break;
        default:
            used = limits?.used || 0;
    }

    // if plan has no limit → always false
    if (max === null || max === "unlimited") return false;

    return used >= max;
};
