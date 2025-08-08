import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendReminderEmail = async (to, subject, text) => {
    await transporter.sendMail({
        from: `"Your Brand Name" <${process.env.MAIL_USER}>`,
        to,
        subject,
        text,
    });
};

export default sendReminderEmail;
