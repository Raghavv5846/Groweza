import nodemailer from 'nodemailer';

export const sendWelcomeEmail = async (email, name) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,      // Your Gmail
                pass: process.env.EMAIL_PASS,  // App password (not your actual Gmail password)
            },
        });

        const mailOptions = {
            from: `"Freelancer Work Desk" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: '🎉 Welcome to Freelancer Work Desk!',
            html: `
        <div style="font-family: Arial, sans-serif; padding: 10px;">
          <h2>Hello ${name},</h2>
          <p>Welcome to <strong>Freelancer Work Desk</strong>! 👋</p>
          <p>You’ve successfully joined a platform designed to help you organize your freelance career efficiently.</p>
          <ul>
            <li>Manage client records</li>
            <li>Create invoices and proposals</li>
            <li>Track project timelines and payments</li>
          </ul>
          <p>We’re excited to have you onboard. 🚀</p>
          <p>— The Work Desk Team</p>
        </div>
      `,
        };

        await transporter.sendMail(mailOptions);
        // console.log(`Welcome email sent to ${email}`);
    } catch (error) {
        console.error('Error sending welcome email:', error.message);
    }
};
