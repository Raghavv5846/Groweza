// import jwt from 'jsonwebtoken';

// export const authenticate = (req, res, next) => {
//     const token = req.headers.authorization?.split(' ')[1]; // Expect: Bearer <token>
//     if (!token) return res.status(401).json({ message: 'Unauthorized' });

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded; // contains userId, email, role
//         next();
//     } catch (err) {
//         res.status(401).json({ message: 'Invalid token' });
//     }
// };


import jwt from 'jsonwebtoken';
import User from '../model/userModel.js'; // ✅ import your User model

export const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Expect: Bearer <token>
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        // ✅ Decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // ✅ Fetch fresh user from DB (with subscriptions)
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // ✅ Attach full user object (not just decoded token)
        req.user = {
            userId: user._id.toString(),
            role: user.role,
            email: user.email,
            subscriptions: user.subscriptions || [],   // add subs here
        };

        next();
    } catch (err) {
        console.error("Auth error:", err.message);
        res.status(401).json({ message: 'Invalid token' });
    }
};
