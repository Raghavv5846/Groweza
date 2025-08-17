// routes/subscriptionRoutes.js
import express from "express";
const router = express.Router();

router.get("/me", (req, res) => {
    res.json({
        plan: "Basic",
        expiresAt: "2025-12-31T23:59:59Z",
        limits: {
            clients: { used: 14, max: 15 },
            invoices: { used: 2, max: 20 },
            proposals: { used: 1, max: 16 },
            meetings: { used: 2, max: 3 },
        },
    });
});

export default router;
