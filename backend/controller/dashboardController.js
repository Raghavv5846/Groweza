// controllers/dashboardController.js
import User from '../model/userModel.js';
import Meeting from '../model/meetingModel.js';
import Invoice from '../model/invoiceModel.js';
import Proposal from '../model/proposalModel.js';
import { startOfWeek, startOfMonth, startOfYear } from "date-fns";
import mongoose from "mongoose";


/**
 * Notes on time fields used:
 * - Clients: your client subdocs have NO timestamps. We can only return TOTAL.
 *            If you add { timestamps: true } to clientSchema, uncomment the sections below.
 * - Works:   we use works.startDate as the time basis (fallback: exclude works without startDate from week/month/year).
 * - Invoices: we use invoice.generatedAt (your schema’s date field).
 * - Proposals: uses createdAt (schema has { timestamps: true }).
 * - Meetings: we use meetingDate for time buckets; and status to split scheduled/done/upcoming.
 */

export const getDashboardStats = async (req, res) => {
    try {
        const freelancerId = new mongoose.Types.ObjectId(req.user.userId);
        const freelancer = req.user.userId;
        const user = await User.findById(freelancer);

        const now = new Date();
        const weekStart = startOfWeek(now, { weekStartsOn: 1 }); // Mon
        const monthStart = startOfMonth(now);
        const yearStart = startOfYear(now);

        // ---------- Helpers ----------
        const sumInvoices = async (matchQuery) => {
            const result = await Invoice.aggregate([
                { $match: { freelancerId, ...matchQuery } },
                { $group: { _id: null, total: { $sum: "$amount" } } }
            ]);
            return result[0]?.total || 0;
        };

        const countInvoices = async (matchQuery) =>
            Invoice.countDocuments({ freelancerId, ...matchQuery });

        const countProposals = async (matchQuery) =>
            Proposal.countDocuments({ freelancerId, ...matchQuery });

        const countMeetings = async (matchQuery) =>
            Meeting.countDocuments({ freelancerId, ...matchQuery });

        // ---------- Clients (embedded in User) ----------
        // TOTAL clients straight from embedded array length
        const userDoc = await User.findById(freelancerId, { clients: 1, subscriptions: 1 }).lean();
        const clientsTotal = userDoc?.clients?.length || 0;

        // Time-bucketed clients require a timestamp on each client subdoc.
        // If/when you add it (e.g. clientSchema with { timestamps: true }),
        // you can compute the weekly/monthly/yearly counts here with $unwind + $match on clients.createdAt.

        const clientsStats = {
            week: null,  // TODO: add client timestamps to enable
            month: null,  // TODO: add client timestamps to enable
            year: null,  // TODO: add client timestamps to enable
            total: clientsTotal
        };

        // ---------- Works (embedded in user.clients.works) ----------
        // We’ll aggregate by unwinding clients and works; use works.startDate for time buckets.
        const worksAggregateForRange = async (rangeStart) => {
            const matchStage = [
                { $match: { _id: freelancerId } },
                { $unwind: "$clients" },
                { $unwind: "$clients.works" },
                // Only include works that have a startDate and are within range
                { $match: { "clients.works.startDate": { $gte: rangeStart } } },
                {
                    $group: {
                        _id: null,
                        total: { $sum: 1 },
                        completed: {
                            $sum: {
                                $cond: [{ $eq: ["$clients.works.isWorkCompleted", true] }, 1, 0]
                            }
                        },
                        pending: {
                            $sum: {
                                $cond: [{ $eq: ["$clients.works.isWorkCompleted", false] }, 1, 0]
                            }
                        }
                    }
                }
            ];

            const result = await User.aggregate(matchStage);
            const r = result[0] || { total: 0, completed: 0, pending: 0 };
            return { total: r.total, completed: r.completed, pending: r.pending };
        };

        const worksAggregateTotal = async () => {
            const pipeline = [
                { $match: { _id: freelancerId } },
                { $unwind: "$clients" },
                { $unwind: "$clients.works" },
                {
                    $group: {
                        _id: null,
                        total: { $sum: 1 },
                        completed: {
                            $sum: {
                                $cond: [{ $eq: ["$clients.works.isWorkCompleted", true] }, 1, 0]
                            }
                        },
                        pending: {
                            $sum: {
                                $cond: [{ $eq: ["$clients.works.isWorkCompleted", false] }, 1, 0]
                            }
                        }
                    }
                }
            ];
            const result = await User.aggregate(pipeline);
            const r = result[0] || { total: 0, completed: 0, pending: 0 };
            return { total: r.total, completed: r.completed, pending: r.pending };
        };

        const [worksWeek, worksMonth, worksYear, worksTotal] = await Promise.all([
            worksAggregateForRange(weekStart),
            worksAggregateForRange(monthStart),
            worksAggregateForRange(yearStart),
            worksAggregateTotal()
        ]);

        // ---------- Invoices ----------
        const invoicesWeek = await Promise.all([
            countInvoices({ generatedAt: { $gte: weekStart } }),
            countInvoices({ generatedAt: { $gte: weekStart }, status: "Paid" }),
            countInvoices({ generatedAt: { $gte: weekStart }, status: "Pending" })
        ]);
        const invoicesMonth = await Promise.all([
            countInvoices({ generatedAt: { $gte: monthStart } }),
            countInvoices({ generatedAt: { $gte: monthStart }, status: "Paid" }),
            countInvoices({ generatedAt: { $gte: monthStart }, status: "Pending" })
        ]);
        const invoicesYear = await Promise.all([
            countInvoices({ generatedAt: { $gte: yearStart } }),
            countInvoices({ generatedAt: { $gte: yearStart }, status: "Paid" }),
            countInvoices({ generatedAt: { $gte: yearStart }, status: "Pending" })
        ]);
        const invoicesTotal = await Promise.all([
            countInvoices({}),
            countInvoices({ status: "Paid" }),
            countInvoices({ status: "Pending" })
        ]);


        // ---------- Revenue (from PAID invoices) ----------
        // ---------- Revenue (from PAID works) ----------
        const revenueAggregateForRange = async (rangeStart) => {
            const result = await User.aggregate([
                { $match: { _id: freelancerId } },
                { $unwind: "$clients" },
                { $unwind: "$clients.works" },
                {
                    $match: {
                        "clients.works.paymentStatus": "Paid",
                        "clients.works.startDate": { $gte: rangeStart },
                    },
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$clients.works.cost" },
                    },
                },
            ]);

            return result[0]?.total || 0;
        };

        const revenueAggregateTotal = async () => {
            const result = await User.aggregate([
                { $match: { _id: freelancerId } },
                { $unwind: "$clients" },
                { $unwind: "$clients.works" },
                { $match: { "clients.works.paymentStatus": "Paid" } },
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$clients.works.cost" },
                    },
                },
            ]);
            return result[0]?.total || 0;
        };

        // Calculate for week, month, year, total
        const [revWeek, revMonth, revYear, revTotal] = await Promise.all([
            revenueAggregateForRange(weekStart),
            revenueAggregateForRange(monthStart),
            revenueAggregateForRange(yearStart),
            revenueAggregateTotal()
        ]);

        // Also compute outstanding = sum of all unpaid (Pending/Overdue)
        const outstandingResult = await User.aggregate([
            { $match: { _id: freelancerId } },
            { $unwind: "$clients" },
            { $unwind: "$clients.works" },
            {
                $match: {
                    "clients.works.paymentStatus": { $in: ["Pending", "Overdue"] },
                },
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$clients.works.cost" },
                },
            },
        ]);

        const outstanding = outstandingResult[0]?.total || 0;


        // ---------- Proposals ----------
        const proposalsForRange = async (rangeStart) => {
            const [total, accepted, rejected, pending] = await Promise.all([
                countProposals({ createdAt: { $gte: rangeStart } }),
                countProposals({ createdAt: { $gte: rangeStart }, status: "Accepted" }),
                countProposals({ createdAt: { $gte: rangeStart }, status: "Rejected" }),
                countProposals({ createdAt: { $gte: rangeStart }, status: "Pending" })
            ]);
            return { total, accepted, rejected, pending };
        };

        const proposalsTotalAll = async () => {
            const [total, accepted, rejected, pending] = await Promise.all([
                countProposals({}),
                countProposals({ status: "Accepted" }),
                countProposals({ status: "Rejected" }),
                countProposals({ status: "Pending" })
            ]);
            return { total, accepted, rejected, pending };
        };

        const [proposalsWeek, proposalsMonth, proposalsYear, proposalsTotal] = await Promise.all([
            proposalsForRange(weekStart),
            proposalsForRange(monthStart),
            proposalsForRange(yearStart),
            proposalsTotalAll()
        ]);

        // ---------- Meetings ----------
        // We’ll bucket by meetingDate (not createdAt) since that’s what matters for scheduling.
        // scheduled = status in ['Scheduled','Rescheduled']
        // done      = status === 'Completed'
        // upcoming  = meetingDate >= now and status not in ['Cancelled','Rejected']
        const meetingsForRange = async (rangeStart) => {
            const [scheduled, done, upcoming] = await Promise.all([
                countMeetings({
                    meetingDate: { $gte: rangeStart },
                    status: { $in: ["Scheduled", "Rescheduled"] }
                }),
                countMeetings({
                    meetingDate: { $gte: rangeStart },
                    status: "Completed"
                }),
                countMeetings({
                    meetingDate: { $gte: rangeStart },
                    status: { $nin: ["Cancelled", "Rejected"] }
                })
            ]);
            return { scheduled, done, upcoming };
        };

        const meetingsTotalAll = async () => {
            const [scheduled, done, upcoming] = await Promise.all([
                countMeetings({ status: { $in: ["Scheduled", "Rescheduled"] } }),
                countMeetings({ status: "Completed" }),
                countMeetings({
                    meetingDate: { $gte: now },
                    status: { $nin: ["Cancelled", "Rejected"] }
                })
            ]);
            return { scheduled, done, upcoming };
        };

        const [meetingsWeek, meetingsMonth, meetingsYear, meetingsTotal] = await Promise.all([
            meetingsForRange(weekStart),
            meetingsForRange(monthStart),
            meetingsForRange(yearStart),
            meetingsTotalAll()
        ]);

        // ---------- Compose response ----------
        const response = {
            freelancer:{
                name: user.name,
            },
            stats: {
                clients: clientsStats,
                works: {
                    week: worksWeek,
                    month: worksMonth,
                    year: worksYear,
                    total: worksTotal
                },
                invoices: {
                    week: { total: invoicesWeek[0], paid: invoicesWeek[1], unpaid: invoicesWeek[2] },
                    month: { total: invoicesMonth[0], paid: invoicesMonth[1], unpaid: invoicesMonth[2] },
                    year: { total: invoicesYear[0], paid: invoicesYear[1], unpaid: invoicesYear[2] },
                    total: { total: invoicesTotal[0], paid: invoicesTotal[1], unpaid: invoicesTotal[2] },
                 
                },
                proposals: {
                    week: proposalsWeek,
                    month: proposalsMonth,
                    year: proposalsYear,
                    total: proposalsTotal
                },
                meetings: {
                    week: meetingsWeek,
                    month: meetingsMonth,
                    year: meetingsYear,
                    total: meetingsTotal
                }
            },
            revenue: {
                week: revWeek,
                month: revMonth,
                year: revYear,
                total: revTotal,
                outstanding
            }
        };

        return res.status(200).json(response);
    } catch (err) {
        console.error("getDashboardStats error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};


