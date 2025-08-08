import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER, // your Gmail ID
        pass: process.env.EMAIL_PASS, // app password
    },
});

export default transporter;
