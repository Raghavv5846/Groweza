// controllers/dashboardController.js
import User from '../model/userModel.js';
import Meeting from '../model/meetingModel.js';
import Invoice from '../model/invoiceModel.js';
import Proposal from '../model/proposalModel.js';
import Project from '../model/projectModel.js';

export const getDashboardStats = async (req, res) => {
    try {
        const freelancerId = req.user.userId;

        const user = await User.findById(freelancerId);
        const totalClients = user.clients.length;

        const unpaidInvoices = await Invoice.countDocuments({
            freelancerId,
            status: 'Pending',
        });

        const meetings = await Meeting.find({ freelancerId });
        const upcomingMeetings = meetings.filter(m => new Date(m.meetingDate) > new Date());

        const pendingProposals = await Proposal.countDocuments({
            freelancerId,
            status: 'Pending'
        });

        const proposalCreditsUsed = await Proposal.countDocuments({ freelancerId });
        const plan = user.subscription?.[0]?.plan || 'Basic';
        const proposalCreditsTotal = plan === 'Premium' ? 50 : 16;

        res.json({
            freelancer: {
                name: user.name,
                plan,
                proposalCreditsUsed,
                proposalCreditsTotal
            },
            stats: {
                totalClients,
                unpaidInvoices,
                totalMeetings: meetings.length,
                upcomingMeetings: upcomingMeetings.length,
                pendingProposals
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch dashboard data' });
    }
}


// controllers/dashboardController.js

export const getRevenueSummary = async (req, res) => {
    try {
        const freelancerId = req.user._id || req.user.id || req.user.userId;

        if (!freelancerId) {
            return res.status(400).json({ error: 'Freelancer ID missing' });
        }

        const pipeline = [
            {
                $match: {
                    freelancerId: freelancerId,
                    status: 'Paid'
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$generatedAt' },
                        month: { $month: '$generatedAt' }
                    },
                    totalRevenue: { $sum: '$amount' }
                }
            },
            {
                $sort: {
                    '_id.year': 1,
                    '_id.month': 1
                }
            }
        ];

        const summary = await Invoice.aggregate(pipeline);

        const formatted = summary.map(item => {
            const { year, month } = item._id;
            const paddedMonth = month.toString().padStart(2, '0');
            return {
                month: `${year}-${paddedMonth}`, // e.g., "2025-08"
                revenue: item.totalRevenue
            };
        });

        res.json(formatted);

    } catch (err) {
        console.error('Revenue Summary Error:', err);
        res.status(500).json({ error: 'Failed to get revenue summary' });
    }
};
