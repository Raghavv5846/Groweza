// import axios from 'axios';
// import User from '../model/userModel.js';

// const PAYPAL_BASE_URL = 'https://api-m.sandbox.paypal.com';
// const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
// const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

// const getAccessToken = async () => {
//     const response = await axios.post(`${PAYPAL_BASE_URL}/v1/oauth2/token`, 'grant_type=client_credentials', {
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         auth: {
//             username: PAYPAL_CLIENT_ID,
//             password: PAYPAL_CLIENT_SECRET,
//         },
//     });
//     return response.data.access_token;
// };

// export const createProduct = async (req, res) => {
//     try {
//         const accessToken = await getAccessToken();
//         const response = await axios.post(`${PAYPAL_BASE_URL}/v1/catalogs/products`, req.body, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//                 'Content-Type': 'application/json',
//             },
//         });
//         res.status(201).json(response.data);
//     } catch (err) {
//         res.status(500).json({ error: err.response?.data || err.message });
//     }
// };

// export const fetchProducts = async (req, res) => {
//     try {
//         const accessToken = await getAccessToken();
//         const response = await axios.get(`${PAYPAL_BASE_URL}/v1/catalogs/products`, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//             },
//         });
//         res.json(response.data.products);
//     } catch (err) {
//         res.status(500).json({ error: err.response?.data || err.message });
//     }
// };

// export const createOrder = async (req, res) => {
//     try {
//         const accessToken = await getAccessToken();
//         const response = await axios.post(`${PAYPAL_BASE_URL}/v2/checkout/orders`, req.body, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//                 'Content-Type': 'application/json',
//             },
//         });
//         res.status(201).json(response.data);
//     } catch (err) {
//         res.status(500).json({ error: err.response?.data || err.message });
//     }
// };

// export const captureOrder = async (req, res) => {
//     try {
//         const accessToken = await getAccessToken();
//         const { orderId } = req.params;
//         const response = await axios.post(`${PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`, {}, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//             },
//         });

//         // Optionally, store payment status in DB

//         res.json(response.data);
//     } catch (err) {
//         res.status(500).json({ error: err.response?.data || err.message });
//     }
// };

// export const cancelAutoRenewal = async (req, res) => {
//     try {
//         const accessToken = await getAccessToken();
//         const { subscriptionId } = req.params;
//         await axios.post(`${PAYPAL_BASE_URL}/v1/billing/subscriptions/${subscriptionId}/cancel`, {}, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//             },
//         });
//         res.status(200).json({ message: 'Subscription cancelled.' });
//     } catch (err) {
//         res.status(500).json({ error: err.response?.data || err.message });
//     }
// };

// export const handleWebhook = async (req, res) => {
//     try {
//         const event = req.body;

//         const subscriptionId = event?.resource?.id;
//         const subscriberEmail = event?.resource?.subscriber?.email_address;

//         if (!subscriberEmail || !subscriptionId) {
//             return res.status(400).json({ error: 'Missing subscription ID or email' });
//         }

//         const user = await User.findOne({ email: subscriberEmail });
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         switch (event.event_type) {
//             case 'BILLING.SUBSCRIPTION.ACTIVATED':
//                 user.subscription = {
//                     id: subscriptionId,
//                     status: 'ACTIVE',
//                     plan: event.resource.plan_id === 'YOUR_BASIC_PLAN_ID' ? 'Basic' : 'Premium',
//                     startDate: new Date(event.resource.start_time),
//                     nextBillingDate: new Date(event.resource.billing_info.next_billing_time),
//                     lastUpdated: new Date(),
//                 };
//                 break;

//             case 'BILLING.SUBSCRIPTION.CANCELLED':
//                 if (user.subscription?.id === subscriptionId) {
//                     user.subscription.status = 'CANCELLED';
//                     user.subscription.lastUpdated = new Date();
//                 }
//                 break;

//             case 'BILLING.SUBSCRIPTION.SUSPENDED':
//                 if (user.subscription?.id === subscriptionId) {
//                     user.subscription.status = 'SUSPENDED';
//                     user.subscription.lastUpdated = new Date();
//                 }
//                 break;

//             case 'BILLING.SUBSCRIPTION.EXPIRED':
//                 if (user.subscription?.id === subscriptionId) {
//                     user.subscription.status = 'EXPIRED';
//                     user.subscription.lastUpdated = new Date();
//                 }
//                 break;
//         }

//         await user.save();

//         res.status(200).send('Webhook received');
//     } catch (err) {
//         res.status(400).json({ error: 'Webhook handling failed' });
//     }
// };

// export const createSubscription = async (req, res) => {
//     try {
//         const accessToken = await getAccessToken();
//         const { plan_id, userEmail } = req.body;

//         const response = await axios.post(`${PAYPAL_BASE_URL}/v1/billing/subscriptions`, {
//             plan_id,
//             subscriber: {
//                 email_address: userEmail,
//             },
//             application_context: {
//                 brand_name: "Freelancer Desk",
//                 locale: "en-US",
//                 return_url: "https://your-frontend.com/subscription/success",
//                 cancel_url: "https://your-frontend.com/subscription/cancel",
//                 user_action: "SUBSCRIBE_NOW"
//             }
//         }, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//                 'Content-Type': 'application/json',
//             },
//         });

//         // Send user to approval URL
//         const approvalLink = response.data.links.find(link => link.rel === 'approve')?.href;

//         res.status(201).json({ subscriptionId: response.data.id, approvalLink });

//     } catch (err) {
//         res.status(500).json({ error: err.response?.data || err.message });
//     }
// };


// export const createPlan = async (req, res) => {
//     try {
//         const { product_id, name, description, price } = req.body;

//         const accessToken = await getAccessToken();

//         const response = await axios.post(`${PAYPAL_BASE_URL}/v1/billing/plans`, {
//             product_id,
//             name,
//             description,
//             status: "ACTIVE",
//             billing_cycles: [
//                 {
//                     frequency: {
//                         interval_unit: "MONTH",
//                         interval_count: 1
//                     },
//                     tenure_type: "REGULAR",
//                     sequence: 1,
//                     total_cycles: 0, // infinite
//                     pricing_scheme: {
//                         fixed_price: {
//                             value: price,
//                             currency_code: "USD"
//                         }
//                     }
//                 }
//             ],
//             payment_preferences: {
//                 auto_bill_outstanding: true,
//                 setup_fee_failure_action: "CONTINUE",
//                 payment_failure_threshold: 3
//             },
//             taxes: {
//                 percentage: "0",
//                 inclusive: false
//             }
//         }, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//                 "Content-Type": "application/json"
//             }
//         });

//         res.status(201).json(response.data);
//     } catch (err) {
//         res.status(500).json({ error: err.response?.data || err.message });
//     }
// };


import axios from 'axios';
import User from '../model/userModel.js';
import { logActivity } from '../config/logActivity.js';

const PAYPAL_BASE_URL = 'https://api-m.sandbox.paypal.com';
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

const getAccessToken = async () => {
    const response = await axios.post(`${PAYPAL_BASE_URL}/v1/oauth2/token`, 'grant_type=client_credentials', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
            username: PAYPAL_CLIENT_ID,
            password: PAYPAL_CLIENT_SECRET,
        },
    });
    return response.data.access_token;
};

export const createProduct = async (req, res) => {
    try {
        const accessToken = await getAccessToken();
        const response = await axios.post(`${PAYPAL_BASE_URL}/v1/catalogs/products`, req.body, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        await logActivity(req.user.userId, 'PAYPAL_PRODUCT_CREATED', `Created PayPal product: ${req.body.name}`, { productId: response.data.id });

        res.status(201).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.response?.data || err.message });
    }
};

export const fetchProducts = async (req, res) => {
    try {
        const accessToken = await getAccessToken();
        const response = await axios.get(`${PAYPAL_BASE_URL}/v1/catalogs/products`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        res.json(response.data.products);
    } catch (err) {
        res.status(500).json({ error: err.response?.data || err.message });
    }
};

export const createOrder = async (req, res) => {
    try {
        const accessToken = await getAccessToken();
        const response = await axios.post(`${PAYPAL_BASE_URL}/v2/checkout/orders`, req.body, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        await logActivity(req.user.userId, 'PAYPAL_ORDER_CREATED', `Created PayPal order: ${response.data.id}`, { orderId: response.data.id });

        res.status(201).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.response?.data || err.message });
    }
};

export const captureOrder = async (req, res) => {
    try {
        const accessToken = await getAccessToken();
        const { orderId } = req.params;
        const response = await axios.post(`${PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`, {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        await logActivity(req.user.userId, 'PAYPAL_ORDER_CAPTURED', `Captured PayPal order: ${orderId}`, { orderId });

        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.response?.data || err.message });
    }
};

// export const cancelAutoRenewal = async (req, res) => {
//     try {
//         const accessToken = await getAccessToken();
//         const { subscriptionId } = req.params;
//         await axios.post(`${PAYPAL_BASE_URL}/v1/billing/subscriptions/${subscriptionId}/cancel`, {}, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//             },
//         });

//         await logActivity(req.user.userId, 'PAYPAL_SUBSCRIPTION_CANCELLED', `Cancelled PayPal subscription: ${subscriptionId}`, { subscriptionId });

//         res.status(200).json({ message: 'Subscription cancelled.' });
//     } catch (err) {
//         res.status(500).json({ error: err.response?.data || err.message });
//     }
// };

export const cancelAutoRenewal = async (req, res) => {
    try {
        const accessToken = await getAccessToken();
        const { subscriptionId } = req.params;

        if (!subscriptionId || subscriptionId === "undefined") {
            return res.status(400).json({ error: "Invalid subscription ID" });
        }

        // 1. Cancel on PayPal
        await axios.post(
            `${PAYPAL_BASE_URL}/v1/billing/subscriptions/${subscriptionId}/cancel`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        // 2. Update user subscription status
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const subscription = user.subscriptions.find(
            (sub) => sub.id === subscriptionId
        );

        if (subscription) {
            subscription.active = false;
            
            

        let freePlan = user.subscriptions.find((sub) => sub.plan === "Free");

            if (!freePlan) {
                // If user somehow doesn’t have a free plan record, create one
                freePlan = {
                    plan: "Free",
                    active: true,
                    startedAt: new Date(),
                    expiresAt: null,
                    limits: {
                        clients: { limit: 3 },
                        invoices: { limit: 2 },
                        proposals: { limit: 2 },
                        meetings: { limit: 1 },
                    },
                };
                user.subscriptions.push(freePlan);
            } else {
                freePlan.active = true;
                freePlan.startedAt = new Date();
                freePlan.expiresAt = null;
            }

            await user.save();
        }

        // 3. Log activity
        await logActivity(
            req.user.userId,
            "PAYPAL_SUBSCRIPTION_CANCELLED",
            `Cancelled PayPal subscription: ${subscriptionId}`,
            { subscriptionId }
        );

        // 4. Send response
        res.status(200).json({ message: "Subscription cancelled." });
    } catch (err) {
        res.status(500).json({ error: err.response?.data || err.message });
    }}

// export const handleWebhook = async (req, res) => {
//     try {
//         const event = req.body;

//         const subscriptionId = event?.resource?.id;
//         const subscriberEmail = event?.resource?.subscriber?.email_address;

//         if (!subscriberEmail || !subscriptionId) {
//             return res.status(400).json({ error: 'Missing subscription ID or email' });
//         }

//         const user = await User.findOne({ email: subscriberEmail });
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         switch (event.event_type) {
//             case 'BILLING.SUBSCRIPTION.ACTIVATED':
//                 user.subscription = {
//                     id: subscriptionId,
//                     status: 'ACTIVE',
//                     plan: event.resource.plan_id === 'YOUR_BASIC_PLAN_ID' ? 'Basic' : 'Premium',
//                     startDate: new Date(event.resource.start_time),
//                     nextBillingDate: new Date(event.resource.billing_info.next_billing_time),
//                     lastUpdated: new Date(),
//                 };
//                 await logActivity(user._id, 'PAYPAL_SUBSCRIPTION_ACTIVATED', `PayPal subscription activated: ${subscriptionId}`, { subscriptionId });
//                 break;

//             case 'BILLING.SUBSCRIPTION.CANCELLED':
//                 if (user.subscription?.id === subscriptionId) {
//                     user.subscription.status = 'CANCELLED';
//                     user.subscription.lastUpdated = new Date();
//                     await logActivity(user._id, 'PAYPAL_SUBSCRIPTION_CANCELLED', `PayPal subscription cancelled: ${subscriptionId}`, { subscriptionId });
//                 }
//                 break;

//             case 'BILLING.SUBSCRIPTION.SUSPENDED':
//                 if (user.subscription?.id === subscriptionId) {
//                     user.subscription.status = 'SUSPENDED';
//                     user.subscription.lastUpdated = new Date();
//                     await logActivity(user._id, 'PAYPAL_SUBSCRIPTION_SUSPENDED', `PayPal subscription suspended: ${subscriptionId}`, { subscriptionId });
//                 }
//                 break;

//             case 'BILLING.SUBSCRIPTION.EXPIRED':
//                 if (user.subscription?.id === subscriptionId) {
//                     user.subscription.status = 'EXPIRED';
//                     user.subscription.lastUpdated = new Date();
//                     await logActivity(user._id, 'PAYPAL_SUBSCRIPTION_EXPIRED', `PayPal subscription expired: ${subscriptionId}`, { subscriptionId });
//                 }
//                 break;
//         }

//         await user.save();

//         res.status(200).send('Webhook received');
//     } catch (err) {
//         res.status(400).json({ error: 'Webhook handling failed' });
//     }
// };

export const handleWebhook = async (req, res) => {
    try {
        const transmissionId = req.headers["paypal-transmission-id"];
        const transmissionTime = req.headers["paypal-transmission-time"];
        const certUrl = req.headers["paypal-cert-url"];
        const authAlgo = req.headers["paypal-auth-algo"];
        const transmissionSig = req.headers["paypal-transmission-sig"];
        const webhookId = process.env.PAYPAL_WEBHOOK_ID; // from PayPal dashboard
        const webhookEvent = req.body;

        // Step 1: Get Access Token
        const accessToken = await getAccessToken();

        // Step 2: Verify Signature with PayPal API
        const verifyResponse = await axios.post(
            "https://api-m.sandbox.paypal.com/v1/notifications/verify-webhook-signature",
            {
                auth_algo: authAlgo,
                cert_url: certUrl,
                transmission_id: transmissionId,
                transmission_sig: transmissionSig,
                transmission_time: transmissionTime,
                webhook_id: webhookId,
                webhook_event: webhookEvent,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (verifyResponse.data.verification_status !== "SUCCESS") {
            console.error("⚠️ Invalid webhook signature!");
            return res.status(400).json({ error: "Invalid signature" });
        }

        // Step 3: Process Verified Event
        const eventType = webhookEvent.event_type;

        switch (eventType) {
            case "BILLING.SUBSCRIPTION.ACTIVATED":
                await logActivity(
                    webhookEvent.resource.subscriber?.email_address,
                    "Subscription activated"
                );
                break;

            case "BILLING.SUBSCRIPTION.CANCELLED":
                await logActivity(
                    webhookEvent.resource.subscriber?.email_address,
                    "Subscription cancelled"
                );
                break;

            case "BILLING.SUBSCRIPTION.SUSPENDED":
                await logActivity(
                    webhookEvent.resource.subscriber?.email_address,
                    "Subscription suspended"
                );
                break;

            case "BILLING.SUBSCRIPTION.EXPIRED":
                await logActivity(
                    webhookEvent.resource.subscriber?.email_address,
                    "Subscription expired"
                );
                break;

            default:
                console.log("Unhandled event:", eventType);
        }

        return res.status(200).send("OK");
    } catch (err) {
        console.error("Webhook error:", err.message);
        return res.status(500).send("Internal Server Error");
    }
};


export const createSubscription = async (req, res) => {
    try {
        const accessToken = await getAccessToken();
        const { plan_id, userEmail } = req.body;

        const response = await axios.post(`${PAYPAL_BASE_URL}/v1/billing/subscriptions`, {
            plan_id,
            subscriber: {
                email_address: userEmail,
            },
            application_context: {
                brand_name: "Freelancer Desk",
                locale: "en-US",
                return_url: "https://localhost:5173/subscription/success",
                cancel_url: "https://your-frontend.com/subscription/cancel",
                user_action: "SUBSCRIBE_NOW"
            }
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        const approvalLink = response.data.links.find(link => link.rel === 'approve')?.href;

        await logActivity(req.user.userId, 'PAYPAL_SUBSCRIPTION_CREATED', `Created PayPal subscription: ${response.data.id}`, { subscriptionId: response.data.id });

        res.status(201).json({ subscriptionId: response.data.id, approvalLink });

    } catch (err) {
        res.status(500).json({ error: err.response?.data || err.message });
    }
};

export const createPlan = async (req, res) => {
    try {
        const { product_id, name, description, price } = req.body;

        const accessToken = await getAccessToken();

        const response = await axios.post(`${PAYPAL_BASE_URL}/v1/billing/plans`, {
            product_id,
            name,
            description,
            status: "ACTIVE",
            billing_cycles: [
                {
                    frequency: {
                        interval_unit: "MONTH",
                        interval_count: 1
                    },
                    tenure_type: "REGULAR",
                    sequence: 1,
                    total_cycles: 0,
                    pricing_scheme: {
                        fixed_price: {
                            value: price,
                            currency_code: "USD"
                        }
                    }
                }
            ],
            payment_preferences: {
                auto_bill_outstanding: true,
                setup_fee_failure_action: "CONTINUE",
                payment_failure_threshold: 3
            },
            taxes: {
                percentage: "0",
                inclusive: false
            }
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        });

        await logActivity(req.user.userId, 'PAYPAL_PLAN_CREATED', `Created PayPal plan: ${name}`, { planId: response.data.id });

        res.status(201).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.response?.data || err.message });
    }
};

// export const saveSubscription = async (req, res) => {
//     try {
//         const { subscriptionId, plan } = req.body;

//         // ✅ get PayPal Access Token
//         const accessToken = await getAccessToken();

//         // ✅ fetch subscription details from PayPal
//         const subResponse = await axios.get(
//             `${PAYPAL_BASE_URL}/v1/billing/subscriptions/${subscriptionId}`,
//             { headers: { Authorization: `Bearer ${accessToken}` } }
//         );

//         const subscription = subResponse.data;

//         // ✅ Update user subscription in DB
//         await User.findByIdAndUpdate(req.user.userId, {
//             subscription: {
//                 plan,
//                 subscriptionId,
//                 status: subscription.status,
//                 expiresAt: new Date(subscription.billing_info?.next_billing_time || Date.now()),
//                 limits:
//                     plan === "Basic"
//                         ? { clients: { max: 15 }, invoices: { max: 20 }, proposals: { max: 16 }, meetings: { max: 3 } }
//                         : { clients: { max: 100 }, invoices: { max: 500 }, proposals: { max: 200 }, meetings: { max: 20 } },
//             },
//         });
        


//         res.json({ success: true, subscription });
//     } catch (err) {
//         console.error("saveSubscription error:", err.response?.data || err.message);
//         res.status(500).json({ error: err.message });
//     }
// };

export const saveSubscription = async (req, res) => {
    try {
        const { subscriptionId, plan } = req.body;

        if (!subscriptionId || !plan) {
            return res.status(400).json({ error: "Missing subscriptionId or plan" });
        }

        // ✅ Get PayPal Access Token
        const accessToken = await getAccessToken();

        // ✅ Fetch subscription details from PayPal
        const subResponse = await axios.get(
            `${PAYPAL_BASE_URL}/v1/billing/subscriptions/${subscriptionId}`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        const subscription = subResponse.data;

        // ✅ Get user
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // ✅ Mark old subscriptions as inactive
        user.subscriptions.forEach((sub) => {
            if (sub.active) sub.active = false;
        });

        // ✅ Define limits per plan
        const limits =
            plan === "Basic"
                ? {
                    clients: { max: 15 },
                    invoices: { max: 20 },
                    proposals: { max: 16 },
                    meetings: { max: 3 },
                }
                : {
                    clients: { max: Infinity },
                    invoices: { max: Infinity },
                    proposals: { max: 50 },
                    meetings: { max: Infinity },
                };

        // ✅ Push new subscription object
        user.subscriptions.push({
            id: subscriptionId,
            plan,
            status: subscription.status,
            expiresAt: new Date(
                subscription.billing_info?.next_billing_time || Date.now()
            ),
            limits,
            active: true,
        });

        await user.save();

        res.json({ success: true, subscription });
    } catch (err) {
        console.error("saveSubscription error:", err.response?.data || err.message);
        res.status(500).json({ error: err.message });
    }
};