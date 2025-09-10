// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import axios from 'axios';;
// import User from '../model/userModel.js';
// import { sendWelcomeEmail } from '../config/sendWelcomeMail.js';
// import oauth2Client from '../config/googleAuth.js';

// export const signUp = async (req, res) => {
//     const { name, email, password, role } = req.body;

//     if (!name || !email || !password || password.length < 2) {
//         return res.status(400).json({ message: "Invalid input data." });
//     }

//     try {
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: "Email already registered." });
//         }

//         // Hash Password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Default role is freelancer
//         const userRole = role === "admin" ? "admin" : "freelancer";

//         const newUser = new User({
//             name,
//             email,
//             password: hashedPassword,
//             role: userRole,
//             isVerified: true, // No OTP now
//         });

//         await newUser.save();

//         // Send Welcome Email
//         await sendWelcomeEmail(email, name);

//         // Generate JWT Token
//         const token = jwt.sign(
//             { userId: newUser._id, role: newUser.role },
//             process.env.JWT_SECRET,
//             { expiresIn: "7d" }
//         );

//         res.status(201).json({
//             message: "User registered successfully!",
//             token,
//             role: newUser.role,
//         });
//     } catch (error) {
//         console.log("SignUp Error:", error.message);
//         res.status(500).json({ message: "Server Error" });
//     }
// };



import validator from "validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import axios from 'axios';;
import User from '../model/userModel.js';
import { sendWelcomeEmail } from '../config/sendWelcomeMail.js';
import oauth2Client from '../config/googleAuth.js';
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const disposableDomainsPath = path.join(
    __dirname,
    "../node_modules/disposable-email-domains/index.json"
);

const disposableDomains = JSON.parse(
    fs.readFileSync(disposableDomainsPath, "utf-8")
);


// export const signUp = async (req, res) => {
//     const { name, email, password, role } = req.body;

//     // Basic validation
//     if (!name || !email || !password || password.length < 2) {
//         return res.status(400).json({ message: "Invalid input data." });
//     }

//     // Email format validation
//     if (!validator.isEmail(email)) {
//         return res.status(400).json({ message: "Invalid email format." });
//     }

//     // Check if email is from a disposable domain
//     const domain = email.split("@")[1].toLowerCase();
//     if (disposableDomains.includes(domain)) {
//         return res.status(400).json({ message: "Disposable/temporary emails are not allowed." });
//     }

//     try {
//         // Check if user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: "Email already registered." });
//         }

//         // Hash Password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Default role is freelancer unless admin specified
//         const userRole = role === "admin" ? "admin" : "freelancer";

//         const newUser = new User({
//             name,
//             email,
//             password: hashedPassword,
//             role: userRole,
//             isVerified: true, // No OTP for now
//         });

//         await newUser.save();

//         // Send Welcome Email
//         await sendWelcomeEmail(email, name);

//         // Generate JWT Token
//         const token = jwt.sign(
//             { userId: newUser._id, role: newUser.role },
//             process.env.JWT_SECRET,
//             { expiresIn: "7d" }
//         );

//         res.status(201).json({
//             message: "User registered successfully!",
//             token,
//             role: newUser.role,
//         });

//     } catch (error) {
//         console.log("SignUp Error:", error.message);
//         res.status(500).json({ message: "Server Error" });
//     }
// };

export const signUp = async (req, res) => {
    const { name, email, password, role } = req.body;

    // Basic validation
    if (!name || !email || !password || password.length < 2) {
        return res.status(400).json({ message: "Invalid input data." });
    }

    // Email format validation
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email format." });
    }

    // Check for disposable/temp email
    const domain = email.split("@")[1].toLowerCase();
    if (disposableDomains.includes(domain)) {
        return res.status(400).json({ message: "Disposable/temporary emails are not allowed." });
    }

    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered." });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const userRole = role === "admin" ? "admin" : "freelancer";

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: userRole,
            isVerified: true,
        });

        await newUser.save();

        // Send welcome email
        await sendWelcomeEmail(email, name);

        // Generate JWT
        const token = jwt.sign(
            { userId: newUser._id, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(201).json({
            message: "User registered successfully!",
            token,
            role: newUser.role,
        });

    } catch (error) {
        console.error("SignUp Error:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        // ✅ Select password explicitly
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ message: "User not found!" });
        }

        // console.log("password from login page", password);
        // console.log("password from db", user.password); // will now print hashed password

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role,
                email: user.email,
                name: user.name,
                profile: user.profile,
                hasCompleted: user.hasCompleted,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login successful!",
            token,
            role: user.role,
            userId: user._id,
        });

    } catch (error) {
        console.error("Manual login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
  



export const googleLogin = async (req, res) => {
    try {
        const { code } = req.query;

        if (!code) {
            return res.status(400).json({ success: false, message: "Missing authorization code" });
        }

        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`
        );

        const { email, name, picture, id: googleId } = userRes.data;

        let user = await User.findOne({ email });

        if (!user) {
            // Create new user
            user = await User.create({
                name,
                email,
                googleId,
                role: 'freelancer',
                isVerified: true, // trusted via Google

            });

            // Send welcome email
            await sendWelcomeEmail(email, name);
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profile: user.profile,
                hasCompleted: user.hasCompleted,
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
        );

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user,
        });

    } catch (error) {
        console.error('Error during Google login:', error.message);
        res.status(500).json({ success: false, message: 'Google login failed' });
    }
};
