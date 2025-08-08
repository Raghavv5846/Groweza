import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve('../.env') });

import axios from 'axios';
import got from 'got';

const BASE_URL = 'https://api-m.sandbox.paypal.com';

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

const getAccessToken = async () => {
    try {
        const basicAuth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');

        const response = await got.post(`${BASE_URL}/v1/oauth2/token`, {
            headers: {
                Authorization: `Basic ${basicAuth}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            form: {
                grant_type: 'client_credentials',
            },
        });

        const data = JSON.parse(response.body);
        return data.access_token;
    } catch (error) {
        console.error("❌ Error getting token:", error.response?.body || error.message);
    }
};

const fetchProducts = async () => {
    try {
        const accessToken = await getAccessToken();

        const response = await axios.get(`${BASE_URL}/v1/catalogs/products`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const products = response.data.products;

        console.log('📦 Your PayPal Products:\n');
        products.forEach((product) => {
            console.log(`🆔 ID: ${product.id}`);
            console.log(`📛 Name: ${product.name}`);
            console.log(`📝 Description: ${product.description || "No description"}`);
            console.log('—'.repeat(30));
        });
    } catch (err) {
        console.error('❌ Error fetching products:', err.response?.data || err.message);
    }
};

fetchProducts();
