import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import connectDB from './config/dbConnection.js';
import authRouter from './routes/authRouter.js';
import freelancerRouter from "./routes/freelancerRouter.js"
import clientRouter from "./routes/clientRouter.js"
import { startPaymentStatusCron } from './config/cronJob.js';
import paymentRouter from "./routes/paymentRouter.js"
import taskRouter from "./routes/taskRouter.js";
import invoiceRouter from "./routes/invoiceRouter.js";
import proposalRouter from "./routes/proposalRouter.js";
import projectRouter from "./routes/projectRouter.js";
import testimonialRouter from "./routes/testimonialRouter.js";
import meetingRouter from "./routes/meetingRouter.js";
import availabilityRouter from "./routes/availabilityRouter.js";
import paypalRouter from './routes/paypalRouter.js';
import  portfolioRouter from "./routes/portfolioRouter.js";
import dashBoardRouter from "./routes/dashboardRouter.js";
import activityRouter from "./routes/activityRouter.js";
import subscriptionRoutes from "./routes/subscriptionRouter.js";
// import { syncRazorpayPlans } from './config/syncPlans.js';



// cron-job
import "./cron-job/dailyWorkReminder.js"; // Daily work reminder job
import "./cron-job/useageReset.js"; // Monthly usage reset job
import "./cron-job/meetingReminder.js";

app.use(cors());
app.use(express.json());
// (async () => {
//     await syncRazorpayPlans();
// })();


app.use('/api/auth', authRouter);
app.use("/api/freelancer" , freelancerRouter);
app.use('/api/clients', clientRouter);
app.use("/api/payments" , paymentRouter);
app.use("/api/tasks" , taskRouter);
app.use("/api/invoices", invoiceRouter);
app.use("/api/proposal", proposalRouter);
app.use('/api/projects', projectRouter);
app.use('/api/testimonials', testimonialRouter);
app.use("/api/meetings" , meetingRouter);
app.use("/api/availability",availabilityRouter);
app.use('/api/paypal', paypalRouter);
app.use("/api/portfolio" , portfolioRouter);
app.use("/api/dashboard",dashBoardRouter );
app.use("/api/activity", activityRouter);
app.use("/api/subscription", subscriptionRoutes);



connectDB();
// Start cron job
startPaymentStatusCron();

app.listen(process.env.PORT , () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});