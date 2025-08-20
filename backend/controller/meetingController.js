// import Meeting from '../model/meetingModel.js';
// import nodemailer from 'nodemailer';
// import cron from 'node-cron';

// // Link Generator
// const generateLink = (platform) => {
//     const uid = Math.random().toString(36).substr(2, 9);
//     return platform === 'Zoom'
//         ? `https://zoom.us/j/${uid}`
//         : `https://meet.google.com/${uid}`;
// };

// // Nodemailer Setup
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// });

// // Reminder Cron Job (run every minute)
// cron.schedule('* * * * *', async () => {
//     const now = new Date();
//     const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
//     const dateStr = oneHourLater.toISOString().split('T')[0];
//     const timeStr = oneHourLater.toTimeString().slice(0, 5); // "HH:MM"

//     const meetings = await Meeting.find({
//         meetingDate: { $gte: new Date(dateStr), $lt: new Date(dateStr + 'T23:59:59') },
//         startTime: timeStr,
//         status: { $in: ['Scheduled', 'Rescheduled'] },
//     });

//     for (const meeting of meetings) {
//         await transporter.sendMail({
//             to: meeting.clientEmail,
//             subject: 'Meeting Reminder (1 Hour Left)',
//             text: `Reminder: Your meeting is scheduled at ${meeting.startTime}. Link: ${meeting.meetingLink}`,
//         });
//     }
// });

// // Create Meeting
// export const createMeeting = async (req, res) => {
//     try {
//         const { clientName, clientEmail, meetingDate, startTime, endTime, platform, notes } = req.body;
//         const freelancerId = req.user.userId;

//         const existingConflict = await Meeting.findOne({
//             freelancerId,
//             meetingDate,
//             startTime,
//             endTime,
//             status: { $in: ['Scheduled', 'Rescheduled'] },
//         });
//         if (existingConflict) {
//             return res.status(400).json({ message: 'Time slot already booked' });
//         }

//         const meetingLink = generateLink(platform);
//         const meeting = await Meeting.create({
//             freelancerId, clientName, clientEmail, meetingDate, startTime, endTime,
//             platform, meetingLink, notes,
//         });

//         await transporter.sendMail({
//             to: clientEmail,
//             subject: 'Meeting Scheduled',
//             text: `Meeting Details:\nDate: ${meetingDate}\nTime: ${startTime}\nLink: ${meetingLink}`,
//         });

//         res.status(201).json(meeting);
//     } catch (err) {
//         res.status(500).json({ message: 'Meeting creation failed', error: err.message });
//     }
// };

// // Reschedule Meeting
// export const rescheduleMeeting = async (req, res) => {
//     try {
//         const { meetingId } = req.params;
//         const { newDate, newStartTime, newEndTime } = req.body;

//         const meeting = await Meeting.findByIdAndUpdate(
//             meetingId,
//             {
//                 meetingDate: newDate,
//                 startTime: newStartTime,
//                 endTime: newEndTime,
//                 status: 'Rescheduled',
//             },
//             { new: true }
//         );

//         await transporter.sendMail({
//             to: meeting.clientEmail,
//             subject: 'Meeting Rescheduled',
//             text: `New Date: ${newDate}\nTime: ${newStartTime}\nLink: ${meeting.meetingLink}`,
//         });

//         res.status(200).json(meeting);
//     } catch (err) {
//         res.status(500).json({ message: 'Failed to reschedule', error: err.message });
//     }
// };

// export const cancelMeeting = async (req, res) => {
//     try {
//         const { meetingId } = req.params;
//         const meeting = await Meeting.findByIdAndUpdate(
//             meetingId,
//             { status: 'Cancelled' },
//             { new: true }
//         );

//         if (!meeting) {
//             return res.status(404).json({ message: 'Meeting not found' });
//         }
//         console.log(`meeting : ${meeting}`)
//         await transporter.sendMail({
//             to: meeting.clientEmail,
//             subject: "Meeting Cancelled",
//             text: `We are sorry for the non-availability at the given time. So we need to cancel the meeting that was scheduled on ${meeting.Date} at ${meeting.startTime}.`
//         });

//         res.status(200).json({ message: "Meeting Cancelled successfully" });
//     } catch (err) {
//         res.status(500).json({ message: 'Failed to cancel meeting', error: err.message });
//     }
// };


// // Get Meetings
// export const getMeetings = async (req, res) => {
//     try {
//         const meetings = await Meeting.find({ freelancerId: req.user.userId }).sort({ meetingDate: 1 });
//         res.status(200).json(meetings);
//     } catch (err) {
//         res.status(500).json({ message: 'Failed to get meetings' });
//     }
// };

// // Delete Meeting
// export const deleteMeeting = async (req, res) => {
//     try {
//         const { meetingId } = req.params;
//         await Meeting.findByIdAndDelete(meetingId);
//         res.status(200).json({ message: 'Meeting deleted' });
//     } catch (err) {
//         res.status(500).json({ message: 'Failed to delete meeting' });
//     }
// };


// // Public Meeting Request (No Auth)
// export const requestMeetingPublic = async (req, res) => {
//     try {
//         const { freelancerId, clientName, clientEmail, meetingDate, startTime, endTime, notes } = req.body;

//         const existingConflict = await Meeting.findOne({
//             freelancerId,
//             meetingDate,
//             startTime,
//             endTime,
//             status: { $in: ['Scheduled', 'Rescheduled'] },
//         });

//         if (existingConflict) {
//             return res.status(400).json({ message: 'Freelancer is already booked for this time slot.' });
//         }

//         const meeting = await Meeting.create({
//             freelancerId,
//             clientName,
//             clientEmail,
//             meetingDate,
//             startTime,
//             endTime,
//             notes,
//             status: 'Pending', // explicitly mark it as pending
//         });

//         await transporter.sendMail({
//             to: clientEmail,
//             subject: 'Meeting Request Submitted',
//             text: `Hi ${clientName},\n\nYour meeting request for ${meetingDate} at ${startTime} has been sent to the freelancer. You’ll receive a confirmation once it’s accepted.\n\n- Freelancer Platform`,
//         });

//         res.status(201).json({ message: 'Meeting request submitted successfully.', meeting });
//     } catch (err) {
//         res.status(500).json({ message: 'Failed to submit meeting request', error: err.message });
//     }
// };



// // ACCEPT meeting request
// export const acceptMeetingRequest = async (req, res) => {
//     try {
//         const { meetingId } = req.params;
//         const { platform } = req.body; // Freelancer can choose Zoom/Google Meet

//         const meeting = await Meeting.findById(meetingId);

//         if (!meeting) return res.status(404).json({ message: 'Meeting not found' });

//         if (meeting.status !== 'Pending') {
//             return res.status(400).json({ message: 'Meeting is not in pending state' });
//         }

//         const meetingLink = generateLink(platform || 'Zoom');

//         meeting.platform = platform || 'Zoom';
//         meeting.status = 'Scheduled';
//         meeting.meetingLink = meetingLink;

//         await meeting.save();

//         // Send email to client
//         await transporter.sendMail({
//             to: meeting.clientEmail,
//             subject: 'Meeting Accepted',
//             text: `Hi ${meeting.clientName},\n\nYour meeting has been confirmed.\n\nDate: ${meeting.meetingDate.toDateString()}\nTime: ${meeting.startTime}\nPlatform: ${platform}\nLink: ${meetingLink}\n\n- Freelancer Platform`,
//         });

//         // Optionally email freelancer
//         const freelancer = await import('../model/userModel.js').then(m => m.default.findById(meeting.freelancerId));

//         if (freelancer?.email) {
//             await transporter.sendMail({
//                 to: freelancer.email,
//                 subject: 'You Accepted a Meeting',
//                 text: `You have accepted a meeting with ${meeting.clientName}.\nDate: ${meeting.meetingDate.toDateString()}\nTime: ${meeting.startTime}\nLink: ${meetingLink}`,
//             });
//         }

//         res.status(200).json({ message: 'Meeting accepted and scheduled', meeting });

//     } catch (err) {
//         res.status(500).json({ message: 'Failed to accept meeting', error: err.message });
//     }
// };


// // REJECT meeting request
// export const rejectMeetingRequest = async (req, res) => {
//     try {
//         const { meetingId } = req.params;

//         const meeting = await Meeting.findById(meetingId);
//         if (!meeting) return res.status(404).json({ message: 'Meeting not found' });

//         if (meeting.status !== 'Pending') {
//             return res.status(400).json({ message: 'Only pending meetings can be rejected' });
//         }

//         meeting.status = 'Rejected';
//         await meeting.save();

//         await transporter.sendMail({
//             to: meeting.clientEmail,
//             subject: 'Meeting Request Rejected',
//             text: `Hi ${meeting.clientName},\n\nUnfortunately, your meeting request for ${meeting.meetingDate.toDateString()} at ${meeting.startTime} was declined.\n\nYou may try again with another time.\n\n- Freelancer Platform`,
//         });

//         res.status(200).json({ message: 'Meeting request rejected successfully' });

//     } catch (err) {
//         res.status(500).json({ message: 'Failed to reject meeting', error: err.message });
//     }
// };


import Meeting from '../model/meetingModel.js';
import nodemailer from 'nodemailer';
import { logActivity } from '../config/logActivity.js';
import { google } from 'googleapis';
import axios from 'axios';
import { incrementUsage } from '../helpers/usageUpdation.js';
import qs from "qs";


const getZoomAccessToken = async () => {
    try {
        const response = await axios.post(
            "https://zoom.us/oauth/token",
            qs.stringify({
                grant_type: "account_credentials",
                account_id: process.env.ZOOM_ACCOUNT_ID,
            }),
            {
                auth: {
                    username: process.env.ZOOM_CLIENT_ID,
                    password: process.env.ZOOM_CLIENT_SECRET,
                },
            }
        );

        return response.data.access_token;
    } catch (error) {
        console.error("Failed to get Zoom access token:", error.response?.data || error.message);
        throw new Error("Zoom access token request failed");
    }
};


const generateZoomLink = async () => {
    try {
        const token = await getZoomAccessToken();

        const response = await axios.post(
            "https://api.zoom.us/v2/users/me/meetings",
            {
                topic: "New Meeting",
                type: 1,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data.join_url;
    } catch (error) {
        console.error(
            "Zoom link generation failed:",
            error.response?.data || error.message
        );
        throw new Error("Failed to generate Zoom link");
    }
};

// Google OAuth setup
const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);
auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
const calendar = google.calendar({ version: 'v3', auth });

// Generate real Zoom link

// Generate real Google Meet link
const generateGoogleMeetLink = async () => {
    try {
        const event = await calendar.events.insert({
            calendarId: 'primary',
            requestBody: {
                summary: 'New Meeting',
                start: { dateTime: new Date().toISOString() },
                end: { dateTime: new Date(Date.now() + 30 * 60000).toISOString() },
                conferenceData: { createRequest: { requestId: Math.random().toString(36).substr(2, 9) } }
            },
            conferenceDataVersion: 1
        });

        return event.data.hangoutLink;
    } catch (error) {
        console.error('Google Meet link generation failed:', error.response?.data || error.message);
        throw new Error('Failed to generate Google Meet link');
    }
};

// Unified function
// export const generateLink = async (platform) => {
//     try {
//         if (platform === 'Zoom') {

//             return await generateZoomLink();
//         } else if (platform === 'Google Meet') {
//             return await generateGoogleMeetLink();
//         } else {
//             throw new Error('Unsupported platform');
//         }
//     } catch (error) {
//         console.error('Link generation error:', error.message);
//         throw error;
//     }
// };

const generateLink = (platform) => {
    const uid = Math.random().toString(36).substr(2, 9);
    return platform === 'Zoom'
        ? `https://zoom.us/j/${uid}`
        : `https://meet.google.com/${uid}`;
};

// Nodemailer Setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});



// Create Meeting
export const createMeeting = async (req, res) => {
    try {
        const { clientName, clientEmail, meetingDate, startTime, endTime, platform, notes } = req.body;
        const freelancerId = req.user.userId;

        const existingConflict = await Meeting.findOne({
            freelancerId,
            meetingDate,
            startTime,
            endTime,
            status: { $in: ['Scheduled', 'Rescheduled'] },
        });
        if (existingConflict) {
            return res.status(400).json({ message: 'Time slot already booked' });
        }

        const meetingLink = await generateLink(platform);
        const meeting = await Meeting.create({
            freelancerId, clientName, clientEmail, meetingDate, startTime, endTime,
            platform, meetingLink, notes,
        });

        await transporter.sendMail({
            to: clientEmail,
            subject: 'Meeting Scheduled',
            text: `Meeting Details:\nDate: ${meetingDate}\nTime: ${startTime}\nLink: ${meetingLink}`,
        });

        await logActivity(freelancerId, `Created a meeting with ${clientName} on ${meetingDate} at ${startTime}`);

        await incrementUsage(freelancerId, "meetings");

        res.status(201).json(meeting);
    } catch (err) {
        res.status(500).json({ message: 'Meeting creation failed', error: err.message });
    }
};

// Reschedule Meeting
export const rescheduleMeeting = async (req, res) => {
    try {
        const { meetingId } = req.params;
        const { newDate, newStartTime, newEndTime } = req.body;

        const meeting = await Meeting.findByIdAndUpdate(
            meetingId,
            {
                meetingDate: newDate,
                startTime: newStartTime,
                endTime: newEndTime,
                status: 'Rescheduled',
            },
            { new: true }
        );

        await transporter.sendMail({
            to: meeting.clientEmail,
            subject: 'Meeting Rescheduled',
            text: `New Date: ${newDate}\nTime: ${newStartTime}\nLink: ${meeting.meetingLink}`,
        });

        await logActivity(req.user.userId, `Rescheduled meeting with ${meeting.clientName} to ${newDate} at ${newStartTime}`);

        res.status(200).json(meeting);
    } catch (err) {
        res.status(500).json({ message: 'Failed to reschedule', error: err.message });
    }
};

// Cancel Meeting
export const cancelMeeting = async (req, res) => {
    try {
        const { meetingId } = req.params;
        const meeting = await Meeting.findByIdAndUpdate(
            meetingId,
            { status: 'Cancelled' },
            { new: true }
        );

        if (!meeting) {
            return res.status(404).json({ message: 'Meeting not found' });
        }

        await transporter.sendMail({
            to: meeting.clientEmail,
            subject: "Meeting Cancelled",
            text: `Your meeting scheduled on ${meeting.meetingDate} at ${meeting.startTime} has been cancelled.`,
        });

        await logActivity(req.user.userId, `Cancelled meeting with ${meeting.clientName} on ${meeting.meetingDate}`);

        res.status(200).json({ message: "Meeting cancelled successfully" });
    } catch (err) {
        res.status(500).json({ message: 'Failed to cancel meeting', error: err.message });
    }
};

// Get Meetings
export const getMeetings = async (req, res) => {
    try {
        const meetings = await Meeting.find({ freelancerId: req.user.userId }).sort({ meetingDate: 1 });
        await logActivity(req.user.userId, `Viewed all meetings`);
        res.status(200).json(meetings);
    } catch (err) {
        res.status(500).json({ message: 'Failed to get meetings' });
    }
};

// Delete Meeting
export const deleteMeeting = async (req, res) => {
    try {
        const { meetingId } = req.params;
        await Meeting.findByIdAndDelete(meetingId);
        await logActivity(req.user.userId, `Deleted a meeting (ID: ${meetingId})`);
        res.status(200).json({ message: 'Meeting deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete meeting' });
    }
};

// Public Meeting Request
export const requestMeetingPublic = async (req, res) => {
    try {
        const { freelancerId, clientName, clientEmail, meetingDate, startTime, endTime, notes } = req.body;

        const existingConflict = await Meeting.findOne({
            freelancerId,
            meetingDate,
            startTime,
            endTime,
            status: { $in: ['Scheduled', 'Rescheduled'] },
        });

        if (existingConflict) {
            return res.status(400).json({ message: 'Freelancer is already booked for this time slot.' });
        }

        const meeting = await Meeting.create({
            freelancerId,
            clientName,
            clientEmail,
            meetingDate,
            startTime,
            endTime,
            notes,
            status: 'Pending',
        });

        await transporter.sendMail({
            to: clientEmail,
            subject: 'Meeting Request Submitted',
            text: `Hi ${clientName},\n\nYour meeting request for ${meetingDate} at ${startTime} has been sent to the freelancer.`,
        });

        await logActivity(freelancerId, `Received a public meeting request from ${clientName} for ${meetingDate} at ${startTime}`);

        res.status(201).json({ message: 'Meeting request submitted successfully.', meeting });
    } catch (err) {
        res.status(500).json({ message: 'Failed to submit meeting request', error: err.message });
    }
};

// Accept Meeting Request
export const acceptMeetingRequest = async (req, res) => {
    try {
        const { meetingId } = req.params;
        const { platform } = req.body;

        const meeting = await Meeting.findById(meetingId);
        if (!meeting) return res.status(404).json({ message: 'Meeting not found' });

        if (meeting.status !== 'Pending') {
            return res.status(400).json({ message: 'Meeting is not in pending state' });
        }

        const meetingLink = await  generateLink(platform || 'Zoom');

        meeting.platform = platform || 'Zoom';
        meeting.status = 'Scheduled';
        meeting.meetingLink = meetingLink;
        await meeting.save();

        await transporter.sendMail({
            to: meeting.clientEmail,
            subject: 'Meeting Accepted',
            text: `Hi ${meeting.clientName},\n\nYour meeting has been confirmed.\n\nDate: ${meeting.meetingDate}\nTime: ${meeting.startTime}\nLink: ${meetingLink}`,
        });

        const freelancer = await import('../model/userModel.js').then(m => m.default.findById(meeting.freelancerId));
        if (freelancer?.email) {
            await transporter.sendMail({
                to: freelancer.email,
                subject: 'You Accepted a Meeting',
                text: `You have accepted a meeting with ${meeting.clientName}.\nDate: ${meeting.meetingDate}\nTime: ${meeting.startTime}\nLink: ${meetingLink}`,
            });
        }

        await logActivity(req.user.userId, `Accepted meeting request from ${meeting.clientName} on ${meeting.meetingDate}`);

        res.status(200).json({ message: 'Meeting accepted and scheduled', meeting });
    } catch (err) {
        res.status(500).json({ message: 'Failed to accept meeting', error: err.message });
    }
};

// Reject Meeting Request
export const rejectMeetingRequest = async (req, res) => {
    try {
        const { meetingId } = req.params;

        const meeting = await Meeting.findById(meetingId);
        if (!meeting) return res.status(404).json({ message: 'Meeting not found' });

        if (meeting.status !== 'Pending') {
            return res.status(400).json({ message: 'Only pending meetings can be rejected' });
        }

        meeting.status = 'Rejected';
        await meeting.save();

        await transporter.sendMail({
            to: meeting.clientEmail,
            subject: 'Meeting Request Rejected',
            text: `Hi ${meeting.clientName},\n\nUnfortunately, your meeting request for ${meeting.meetingDate} at ${meeting.startTime} was declined.`,
        });

        await logActivity(req.user.userId, `Rejected meeting request from ${meeting.clientName} for ${meeting.meetingDate}`);

        res.status(200).json({ message: 'Meeting request rejected successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to reject meeting', error: err.message });
    }
};
