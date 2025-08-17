
import meetingModel from "../model/meetingModel.js";
import cron from 'node-cron';
import nodemailer from 'nodemailer';


// Nodemailer Setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

cron.schedule('* * * * *', async () => {
    try {
        const now = new Date();
        const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
        const dateStr = oneHourLater.toISOString().split('T')[0];
        const timeStr = oneHourLater.toTimeString().slice(0, 5);

        const meetings = await meetingModel.find({
            meetingDate: { $gte: new Date(dateStr), $lt: new Date(dateStr + 'T23:59:59') },
            startTime: timeStr,
            status: { $in: ['Scheduled', 'Rescheduled'] },
        });

        for (const meeting of meetings) {
            await transporter.sendMail({
                to: meeting.clientEmail,
                subject: 'Meeting Reminder (1 Hour Left)',
                text: `Reminder: Your meeting is scheduled at ${meeting.startTime}. Link: ${meeting.meetingLink}`,
            });
        }
    } catch (err) {
        console.error('Cron job error:', err.message);
    }
});
