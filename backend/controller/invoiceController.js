// import invoiceModel from "../model/invoiceModel.js";
import User from "../model/userModel.js";
import Invoice from '../model/invoiceModel.js';
import mongoose from 'mongoose';
import { sendInvoiceEmail } from "../config/invoiceSender.js";
import { logActivity } from '../config/logActivity.js';
import { incrementUsage } from "../helpers/usageUpdation.js";

// ✅ Create Invoice
export const createInvoice = async (req, res) => {
    try {
        const { clientId, workId, amount, notes, invoiceNumber } = req.body;

        const freelancer = await User.findById(req.user.userId);
        const client = freelancer.clients.id(clientId);
        if (!client) return res.status(404).json({ message: 'Client not found' });

        const work = client.works.id(workId);
        if (!work) return res.status(404).json({ message: 'Work not found under this client' });

        const newInvoice = await Invoice.create({
            freelancerId: req.user.userId,
            clientId,
            workId,
            amount,
            invoiceNumber,
            notes,
        });

        // ✅ Log activity
        await logActivity(
            req.user.userId,
            "INVOICE_CREATED",
            `Created invoice #${invoiceNumber} for client ${client.name}`,
            { invoiceId: newInvoice._id }
        );

        await incrementUsage(req.user.userId, "invoices");


        res.status(201).json({ message: 'Invoice created', invoice: newInvoice });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create invoice' });
    }
};

// ✅ Get All Invoices
export const getAllInvoicesForFreelancer = async (req, res) => {
    const { freelancerId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(freelancerId)) {
        return res.status(400).json({ error: 'Invalid Freelancer ID' });
    }

    try {
        const invoices = await Invoice.find({ freelancerId }).sort({ generatedAt: -1 });
        const freelancer = await User.findById(freelancerId).select('name email invoiceLogo clients');

        if (!freelancer) {
            return res.status(404).json({ error: 'Freelancer not found' });
        }

        const enrichedInvoices = invoices.map((invoice) => {
            const client = freelancer.clients.find(
                (c) => c._id.toString() === invoice.clientId.toString()
            );

            const work = client?.works.find(
                (w) => w._id.toString() === invoice.workId.toString()
            );

            return {
                invoiceId: invoice._id,
                invoiceNumber: invoice.invoiceNumber,
                amount: invoice.amount,
                status: invoice.status,
                notes: invoice.notes,
                pdfUrl: invoice.pdfUrl,
                generatedAt: invoice.generatedAt,
                client: client
                    ? {
                        name: client.name,
                        email: client.email,
                        company: client.company,
                        phone: client.phone,
                    }
                    : null,
                work: work || null,
            };
        });

        return res.status(200).json({
            freelancer: {
                _id: freelancer._id,
                name: freelancer.name,
                email: freelancer.email,
                invoiceLogo: freelancer.invoiceLogo,
            },
            invoices: enrichedInvoices,
        });
    } catch (err) {
        console.error('Error fetching invoices:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// ✅ Update Invoice Status
export const updateInvoiceStatus = async (req, res) => {
    try {
        const { invoiceId } = req.params;
        const { status } = req.body;

        const invoice = await Invoice.findById(invoiceId);
        if (!invoice) return res.status(404).json({ message: 'Invoice not found' });

        invoice.status = status;
        await invoice.save();

        // ✅ Log activity
        await logActivity(
            req.user.userId,
            "INVOICE_STATUS_UPDATED",
            `Invoice #${invoice.invoiceNumber} status changed to ${status}`,
            { invoiceId: invoice._id }
        );

        res.status(200).json({ message: 'Invoice status updated', invoice });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update status' });
    }
};

// ✅ Send Invoice Email
export const sendInvoiceToClient = async (req, res) => {
    const { clientEmail, clientName } = req.body;
    const pdfBuffer = req.file?.buffer;
    const filename = req.file?.originalname || 'Invoice.pdf';

    if (!clientEmail || !pdfBuffer) {
        return res.status(400).json({ message: 'Missing required data.' });
    }

    try {
        const freelancer = await User.findById(req.user.userId);
        if (!freelancer) {
            return res.status(404).json({ message: 'Freelancer not found.' });
        }

        const freelancerName = freelancer.name || 'Freelancer';
        const freelancerEmail = freelancer.email || 'Not Provided';
        const freelancerPhone = freelancer.phone || 'Not Provided';
        const company = freelancer.company || 'GrowTech Creations';

        const emailText = `
Hi ${clientName || 'Client'},

Hope you're doing well!

Please find attached the invoice for the recent services provided.

Here are the freelancer details for your reference:
- 👨‍💻 Name: ${freelancerName}
- 📧 Email: ${freelancerEmail}
- 📱 Phone: ${freelancerPhone}

If you have any questions, feel free to reply to this email.

Thanks for your business!

Warm regards,  
${freelancerName}  
${freelancerEmail}
        `.trim();

        await sendInvoiceEmail({
            to: clientEmail,
            subject: `Your Invoice from ${freelancerName} (${company})`,
            text: emailText,
            attachments: [
                {
                    filename,
                    content: pdfBuffer,
                },
            ],
        });

        // ✅ Log activity
        await logActivity(
            req.user.userId,
            "INVOICE_SENT",
            `Sent invoice to ${clientEmail}`,
            { clientEmail }
        );

        return res.status(200).json({ message: 'Invoice sent successfully.' });
    } catch (err) {
        console.error('Email send error:', err);
        return res.status(500).json({ message: 'Failed to send invoice.' });
    }
};
