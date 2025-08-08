import axios from 'axios';
import User from '../model/userModel.js';

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

        // Optionally, store payment status in DB

        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.response?.data || err.message });
    }
};

export const cancelAutoRenewal = async (req, res) => {
    try {
        const accessToken = await getAccessToken();
        const { subscriptionId } = req.params;
        await axios.post(`${PAYPAL_BASE_URL}/v1/billing/subscriptions/${subscriptionId}/cancel`, {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        res.status(200).json({ message: 'Subscription cancelled.' });
    } catch (err) {
        res.status(500).json({ error: err.response?.data || err.message });
    }
};

export const handleWebhook = async (req, res) => {
    try {
        const event = req.body;

        const subscriptionId = event?.resource?.id;
        const subscriberEmail = event?.resource?.subscriber?.email_address;

        if (!subscriberEmail || !subscriptionId) {
            return res.status(400).json({ error: 'Missing subscription ID or email' });
        }

        const user = await User.findOne({ email: subscriberEmail });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        switch (event.event_type) {
            case 'BILLING.SUBSCRIPTION.ACTIVATED':
                user.subscription = {
                    id: subscriptionId,
                    status: 'ACTIVE',
                    plan: event.resource.plan_id === 'YOUR_BASIC_PLAN_ID' ? 'Basic' : 'Premium',
                    startDate: new Date(event.resource.start_time),
                    nextBillingDate: new Date(event.resource.billing_info.next_billing_time),
                    lastUpdated: new Date(),
                };
                break;

            case 'BILLING.SUBSCRIPTION.CANCELLED':
                if (user.subscription?.id === subscriptionId) {
                    user.subscription.status = 'CANCELLED';
                    user.subscription.lastUpdated = new Date();
                }
                break;

            case 'BILLING.SUBSCRIPTION.SUSPENDED':
                if (user.subscription?.id === subscriptionId) {
                    user.subscription.status = 'SUSPENDED';
                    user.subscription.lastUpdated = new Date();
                }
                break;

            case 'BILLING.SUBSCRIPTION.EXPIRED':
                if (user.subscription?.id === subscriptionId) {
                    user.subscription.status = 'EXPIRED';
                    user.subscription.lastUpdated = new Date();
                }
                break;
        }

        await user.save();

        res.status(200).send('Webhook received');
    } catch (err) {
        res.status(400).json({ error: 'Webhook handling failed' });
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
                return_url: "https://your-frontend.com/subscription/success",
                cancel_url: "https://your-frontend.com/subscription/cancel",
                user_action: "SUBSCRIBE_NOW"
            }
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        // Send user to approval URL
        const approvalLink = response.data.links.find(link => link.rel === 'approve')?.href;

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
                    total_cycles: 0, // infinite
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

        res.status(201).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.response?.data || err.message });
    }
};
