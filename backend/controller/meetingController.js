import Meeting from '../model/meetingModel.js';
import nodemailer from 'nodemailer';
import cron from 'node-cron';

// Link Generator
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

// Reminder Cron Job (run every minute)
cron.schedule('* * * * *', async () => {
    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
    const dateStr = oneHourLater.toISOString().split('T')[0];
    const timeStr = oneHourLater.toTimeString().slice(0, 5); // "HH:MM"

    const meetings = await Meeting.find({
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

        const meetingLink = generateLink(platform);
        const meeting = await Meeting.create({
            freelancerId, clientName, clientEmail, meetingDate, startTime, endTime,
            platform, meetingLink, notes,
        });

        await transporter.sendMail({
            to: clientEmail,
            subject: 'Meeting Scheduled',
            text: `Meeting Details:\nDate: ${meetingDate}\nTime: ${startTime}\nLink: ${meetingLink}`,
        });

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

        res.status(200).json(meeting);
    } catch (err) {
        res.status(500).json({ message: 'Failed to reschedule', error: err.message });
    }
};

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
        console.log(`meeting : ${meeting}`)
        await transporter.sendMail({
            to: meeting.clientEmail,
            subject: "Meeting Cancelled",
            text: `We are sorry for the non-availability at the given time. So we need to cancel the meeting that was scheduled on ${meeting.Date} at ${meeting.startTime}.`
        });

        res.status(200).json({ message: "Meeting Cancelled successfully" });
    } catch (err) {
        res.status(500).json({ message: 'Failed to cancel meeting', error: err.message });
    }
};


// Get Meetings
export const getMeetings = async (req, res) => {
    try {
        const meetings = await Meeting.find({ freelancerId: req.user.userId }).sort({ meetingDate: 1 });
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
        res.status(200).json({ message: 'Meeting deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete meeting' });
    }
};


// Public Meeting Request (No Auth)
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
            status: 'Pending', // explicitly mark it as pending
        });

        await transporter.sendMail({
            to: clientEmail,
            subject: 'Meeting Request Submitted',
            text: `Hi ${clientName},\n\nYour meeting request for ${meetingDate} at ${startTime} has been sent to the freelancer. You’ll receive a confirmation once it’s accepted.\n\n- Freelancer Platform`,
        });

        res.status(201).json({ message: 'Meeting request submitted successfully.', meeting });
    } catch (err) {
        res.status(500).json({ message: 'Failed to submit meeting request', error: err.message });
    }
};



// ACCEPT meeting request
export const acceptMeetingRequest = async (req, res) => {
    try {
        const { meetingId } = req.params;
        const { platform } = req.body; // Freelancer can choose Zoom/Google Meet

        const meeting = await Meeting.findById(meetingId);

        if (!meeting) return res.status(404).json({ message: 'Meeting not found' });

        if (meeting.status !== 'Pending') {
            return res.status(400).json({ message: 'Meeting is not in pending state' });
        }

        const meetingLink = generateLink(platform || 'Zoom');

        meeting.platform = platform || 'Zoom';
        meeting.status = 'Scheduled';
        meeting.meetingLink = meetingLink;

        await meeting.save();

        // Send email to client
        await transporter.sendMail({
            to: meeting.clientEmail,
            subject: 'Meeting Accepted',
            text: `Hi ${meeting.clientName},\n\nYour meeting has been confirmed.\n\nDate: ${meeting.meetingDate.toDateString()}\nTime: ${meeting.startTime}\nPlatform: ${platform}\nLink: ${meetingLink}\n\n- Freelancer Platform`,
        });

        // Optionally email freelancer
        const freelancer = await import('../model/userModel.js').then(m => m.default.findById(meeting.freelancerId));

        if (freelancer?.email) {
            await transporter.sendMail({
                to: freelancer.email,
                subject: 'You Accepted a Meeting',
                text: `You have accepted a meeting with ${meeting.clientName}.\nDate: ${meeting.meetingDate.toDateString()}\nTime: ${meeting.startTime}\nLink: ${meetingLink}`,
            });
        }

        res.status(200).json({ message: 'Meeting accepted and scheduled', meeting });

    } catch (err) {
        res.status(500).json({ message: 'Failed to accept meeting', error: err.message });
    }
};


// REJECT meeting request
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
            text: `Hi ${meeting.clientName},\n\nUnfortunately, your meeting request for ${meeting.meetingDate.toDateString()} at ${meeting.startTime} was declined.\n\nYou may try again with another time.\n\n- Freelancer Platform`,
        });

        res.status(200).json({ message: 'Meeting request rejected successfully' });

    } catch (err) {
        res.status(500).json({ message: 'Failed to reject meeting', error: err.message });
    }
};
