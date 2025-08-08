// utils/sendMeetingEmail.js

import nodemailer from 'nodemailer';

export const sendInvoiceEmail = async ({ to, subject, text, attachments = [] }) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
        attachments,
    });
};
