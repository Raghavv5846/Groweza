// utils/email.js
import nodemailer from 'nodemailer';

export const sendPaymentReminder = async ({ email, clientName, amount, status, dueDate }) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS, // Use App Password
        },
    });

    const subject =
        status === 'overdue'
            ? '⚠️ Overdue Payment Reminder'
            : '🔔 Pending Payment Reminder';

    const html = `
    <h3>Hi Freelancer 👋</h3>
    <p>This is a reminder that you have a <strong>${status}</strong> payment from <b>${clientName}</b>.</p>
    <ul>
      <li>💰 Amount: ₹${amount}</li>
      <li>📅 Due Date: ${new Date(dueDate).toDateString()}</li>
    </ul>
    <p>Please take the necessary action as soon as possible.</p>
    <p style="margin-top: 20px;">— <i>Your Freelance Dashboard</i></p>
  `;

    await transporter.sendMail({
        from: `"Freelance Desk" <${process.env.MAIL_USER}>`,
        to: email,
        subject,
        html,
    });
};
