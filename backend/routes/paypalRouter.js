// File: routes/paypalRoutes.js
import express from 'express';
import {
    createProduct,
    fetchProducts,
    createOrder,
    captureOrder,
    cancelAutoRenewal,
    handleWebhook,
    createSubscription,
    createPlan,
    saveSubscription,
} from '../controller/paypalController.js';
import {authenticate} from '../middleWare/authMiddleware.js';

const router = express.Router();

router.post('/create-product', createProduct);
router.post("/create-plan"  ,createPlan)
router.get('/products', authenticate, fetchProducts);
router.post("/create-subscription", authenticate, createSubscription); // Assuming createProduct is used for creating subscriptions
router.post('/create-order', authenticate, createOrder);
router.post('/capture-order/:orderId', authenticate, captureOrder);
router.post('/cancel-auto-renewal/:subscriptionId', authenticate, cancelAutoRenewal);
router.post('/webhook', handleWebhook);
router.post("/save-subscription", authenticate, saveSubscription); // 👈 new

export default router;