import cron from 'node-cron';
import User from "../model/userModel.js";

export const startPaymentStatusCron = () => {
    // Runs every day at midnight
    cron.schedule('0 0 * * *', async () => {
        console.log('🔁 Running Payment Status Checker');

        const today = new Date();

        try {
            const users = await User.find();

            for (let user of users) {
                let modified = false;

                for (let client of user.clients) {
                    for (let work of client.works) {
                        if (
                            work.paymentStatus === 'Pending' &&
                            work.endDate &&
                            new Date(work.endDate) < today
                        ) {
                            work.paymentStatus = 'Overdue';
                            modified = true;
                        }
                    }
                }

                if (modified) await user.save();
            }

            console.log('✅ Payment status update complete');
        } catch (error) {
            console.error('❌ Error in paymentStatusCron:', error.message);
        }
    });
};
