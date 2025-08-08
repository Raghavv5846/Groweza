import cron from "node-cron";
import User from "../model/userModel.js";
import transporter from "../config/nodemailer.js"; // configure separately
import dotenv from "dotenv";
dotenv.config();

// Run every day at 8:00 AM IST (Indian Standard Time)
cron.schedule("0 8 * * *", async () => {
    try {
        console.log("⏰ Running daily work reminder job...");

        const freelancers = await User.find({ role: "freelancer" });

        for (const freelancer of freelancers) {
            let pendingWorksSummary = "";

            freelancer.clients.forEach((client) => {
                const pendingWorks = client.works.filter(
                    (work) => !work.isWorkCompleted
                );
                if (pendingWorks.length > 0) {
                    pendingWorksSummary += `👤 Client: ${client.name} (${client.email})\n`;
                    pendingWorks.forEach((work) => {
                        pendingWorksSummary += `- ${work.fieldOfWork} (${work.workDescription || "No description"})\n`;
                    });
                    pendingWorksSummary += `\n`;
                }
            });

            if (pendingWorksSummary) {
                try {
                    await transporter.sendMail({
                        from: `"Work Reminder Bot" <${process.env.MAIL_USER}>`,
                        to: freelancer.email,
                        subject: "🔔 Daily Work Reminder",
                        text: `Hello ${freelancer.name},\n\nHere are your pending works for today:\n\n${pendingWorksSummary}\nPlease follow up accordingly.\n\n- Your Assistant`,
                    });

                    console.log(`📬 Reminder sent to: ${freelancer.email}`);
                } catch (emailError) {
                    console.error(`❌ Failed to send email to ${freelancer.email}:`, emailError.message);
                }
            }
        }
    } catch (err) {
        console.error("❌ Error running daily reminder cron job:", err.message);
    }
});
