// import User from '../model/userModel.js';
// import cloudinary from '../config/cloudinary.js';
// import streamifier from 'streamifier';
// import sendReminderEmail from '../config/reminderMail.js';


// // 📁 Get all clients
// export const getAllClients = async (req, res) => {
//     try {
//         const userId = req.user.userId;
//         const user = await User.findById(userId);
//         res.status(200).json(user.clients);
//     } catch (error) {
//         console.error("getAllClients error:", error.message);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// // ➕ Add new client
// export const addClient = async (req, res) => {
//     try {
//         const user = await User.findById(req.user.userId);
//         user.clients.push(req.body);
//         await user.save();
//         res.status(201).json({ message: 'Client added', clients: user.clients });
//     } catch (error) {
//         console.error("addClient error:", error.message);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// // ✏️ Update a client
// export const updateClient = async (req, res) => {
//     try {
//         const user = await User.findById(req.user.userId);
//         const client = user.clients.id(req.params.clientId);
//         if (!client) return res.status(404).json({ message: 'Client not found' });

//         Object.assign(client, req.body);
//         await user.save();
//         res.status(200).json({ message: 'Client updated', client });
//     } catch (error) {
//         console.error("updateClient error:", error.message);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// // 🗑 Delete a client
// export const deleteClient = async (req, res) => {
//     try {
//         const user = await User.findById(req.user.userId);
//         user.clients = user.clients.filter(c => c._id.toString() !== req.params.clientId);
//         await user.save();
//         res.status(200).json({ message: 'Client deleted' });
//     } catch (error) {
//         console.error("deleteClient error:", error.message);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// // 📁 Get all works of a client
// export const getClientWorks = async (req, res) => {
//     try {
//         const user = await User.findById(req.user.userId);
//         const client = user.clients.id(req.params.clientId);
//         if (!client) return res.status(404).json({ message: 'Client not found' });

//         res.status(200).json(client.works);
//     } catch (error) {
//         console.error("getClientWorks error:", error.message);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// // ➕ Add work to client
// export const addClientWork = async (req, res) => {
//     try {
//         const user = await User.findById(req.user.userId);
//         const client = user.clients.id(req.params.clientId);
//         if (!client) return res.status(404).json({ message: 'Client not found' });

//         const handleAdd = async (document = null) => {
//             const newWork = {
//                 fieldOfWork: req.body.fieldOfWork,
//                 workDescription: req.body.workDescription,
//                 isWorkCompleted: req.body.isWorkCompleted === 'true',
//                 startDate: req.body.startDate,
//                 endDate: req.body.endDate,
//                 cost: req.body.cost,
//                 paymentStatus: req.body.paymentStatus || 'Pending',
//                 document,
//             };

//             client.works.push(newWork);
//             await user.save();
//             return res.status(201).json({ message: 'Work added', works: client.works });
//         };

//         if (req.file) {
//             const streamUpload = cloudinary.uploader.upload_stream(
//                 {
//                     resource_type: 'auto',
//                     folder: 'freelancer-docs',
//                 },
//                 async (error, result) => {
//                     if (error) {
//                         console.error("Cloudinary upload failed:", error);
//                         return res.status(500).json({ message: 'Cloudinary upload failed' });
//                     }

//                     const document = {
//                         url: result.secure_url,
//                         name: req.file.originalname,
//                         uploadedAt: new Date(),
//                     };

//                     return await handleAdd(document);
//                 }
//             );

//             if (!req.file.buffer) {
//                 return res.status(400).json({ message: "File buffer is missing or invalid" });
//             }

//             streamifier.createReadStream(req.file.buffer).pipe(streamUpload);
//         } else {
//             await handleAdd();
//         }
//     } catch (error) {
//         console.error("addClientWork error:", error.message);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// // ✏️ Update a work
// export const updateClientWork = async (req, res) => {
//     try {
//         const user = await User.findById(req.user.userId);
//         const client = user.clients.id(req.params.clientId);
//         if (!client) return res.status(404).json({ message: 'Client not found' });

//         const work = client.works.id(req.params.workId);
//         if (!work) return res.status(404).json({ message: 'Work not found' });

//         // Only update paymentStatus if it exists in the request
//         if (req.body.paymentStatus) {
//             work.paymentStatus = req.body.paymentStatus;
//         } else {
//             return res.status(400).json({ message: "No paymentStatus provided" });
//         }

//         await user.save();
//         return res.status(200).json({ message: 'Payment status updated', work });
//     } catch (error) {
//         console.error("updateClientWork error:", error.message);
//         res.status(500).json({ message: "Server error" });
//     }
// };


// // 🗑 Delete a work
// export const deleteClientWork = async (req, res) => {
//     try {
//         const user = await User.findById(req.user.userId);
//         const client = user.clients.id(req.params.clientId);
//         if (!client) return res.status(404).json({ message: 'Client not found' });

//         client.works = client.works.filter(w => w._id.toString() !== req.params.workId);
//         await user.save();
//         res.status(200).json({ message: 'Work deleted' });
//     } catch (error) {
//         console.error("deleteClientWork error:", error.message);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// // ✅ Update payment status
// export const updatePaymentStatus = async (req, res) => {
//     try {
//         const { clientId, workId } = req.params;
//         const { paymentStatus } = req.body;

//         if (!['Pending', 'Paid', 'Overdue'].includes(paymentStatus)) {
//             return res.status(400).json({ message: "Invalid payment status" });
//         }

//         const user = await User.findById(req.user.userId);
//         const client = user.clients.id(clientId);
//         if (!client) return res.status(404).json({ message: "Client not found" });

//         const work = client.works.id(workId);
//         if (!work) return res.status(404).json({ message: "Work not found" });

//         work.paymentStatus = paymentStatus;
//         await user.save();

//         res.status(200).json({ message: "Payment status updated", status: paymentStatus });
//     } catch (error) {
//         console.error("updatePaymentStatus error:", error.message);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// // ✅ Update task status
// export const updateTaskStatus = async (req, res) => {
//     try {
//         const { clientId, workId } = req.params;
//         const { isWorkCompleted } = req.body;

//         const user = await User.findById(req.user.userId);
//         if (!user) return res.status(404).json({ message: 'User not found' });

//         const client = user.clients.id(clientId);
//         if (!client) return res.status(404).json({ message: 'Client not found' });

//         const work = client.works.id(workId);
//         if (!work) return res.status(404).json({ message: 'Work not found' });

//         work.isWorkCompleted = isWorkCompleted;
//         await user.save();

//         res.status(200).json({ message: 'Task status updated', work });
//     } catch (error) {
//         console.error("updateTaskStatus error:", error.message);
//         res.status(500).json({ message: "Server error" });
//     }
// };





// export const sendPaymentReminder = async (req, res) => {
//     try {
//         const { clientId, workId } = req.params;

//         const user = await User.findById(req.user.userId);
//         if (!user) return res.status(404).json({ message: 'User not found' });

//         const client = user.clients.id(clientId);
//         if (!client) return res.status(404).json({ message: 'Client not found' });

//         const work = client.works.id(workId);
//         if (!work) return res.status(404).json({ message: 'Work not found' });

//         const subject = `Payment Reminder: "${work.fieldOfWork}" is ${work.paymentStatus}`;
//         const text = `
// Hi ${client.name},

// This is a reminder that your payment for the project "${work.fieldOfWork}" is still marked as "${work.paymentStatus}".

// Amount: ₹${work.cost}
// Due Dates: ${new Date(work.startDate).toLocaleDateString()} - ${new Date(work.endDate).toLocaleDateString()}

// Please complete the payment at your earliest convenience.

// Regards,
// ${req.user.name || 'Freelancer'}
//         `;

//         await sendReminderEmail(client.email, subject, text);
//         res.json({ message: 'Reminder email sent successfully' });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Failed to send reminder email' });
//     }
// };



// export const sendWorkPaymentEmailReminder = async (req, res) => {
//     try {
//         const { clientId, workId } = req.params;

//         const user = await User.findById(req.user.userId);
//         if (!user) return res.status(404).json({ message: 'User not found' });

//         const client = user.clients.id(clientId);
//         if (!client) return res.status(404).json({ message: 'Client not found' });

//         const work = client.works.id(workId);
//         if (!work) return res.status(404).json({ message: 'Work not found' });

//         const subject = `Payment Reminder: "${work.fieldOfWork}" is ${work.paymentStatus}`;
//         const text = `
// Hi ${client.name},

// This is a reminder that your payment for the project "${work.fieldOfWork}" is still marked as "${work.paymentStatus}".

// Amount: ₹${work.cost}
// Duration: ${new Date(work.startDate).toLocaleDateString()} - ${new Date(work.endDate).toLocaleDateString()}

// Please complete the payment at your earliest convenience.

// Regards,  
// ${req.user.name || 'Freelancer'}
// `;

//         await sendReminderEmail(client.email, subject, text);
//         res.json({ message: 'Reminder email sent successfully' });

//     } catch (err) {
//         console.error('❌ Email reminder error:', err);
//         res.status(500).json({ message: 'Failed to send reminder email' });
//     }
// };


import User from '../model/userModel.js';
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';
import sendReminderEmail from '../config/reminderMail.js';
import { logActivity } from '../config/logActivity.js'; // import logger
import { incrementUsage } from '../helpers/usageUpdation.js';

// 📁 Get all clients
export const getAllClients = async (req, res) => {
    try {
        const userId = req.user.userId;
        // console.log(userId);
        const user = await User.findById(userId);
        // console.log(user);
        res.status(200).json(user.clients);
    } catch (error) {
        console.error("getAllClients error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// ➕ Add new client
export const addClient = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        user.clients.push(req.body);
        await user.save();

        await logActivity(
            req.user.userId,
            'CLIENT_ADDED',
            `Added client "${req.body.name}"`,
            { clientId: user.clients[user.clients.length - 1]._id }
        );

        res.status(201).json({ message: 'Client added', clients: user.clients });
    } catch (error) {
        console.error("addClient error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// ✏️ Update a client
export const updateClient = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        const client = user.clients.id(req.params.clientId);
        if (!client) return res.status(404).json({ message: 'Client not found' });

        Object.assign(client, req.body);
        await user.save();

        await logActivity(
            req.user.userId,
            'CLIENT_UPDATED',
            `Updated client "${client.name}"`,
            { clientId: client._id }
        );

        res.status(200).json({ message: 'Client updated', client });
    } catch (error) {
        console.error("updateClient error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// 🗑 Delete a client
export const deleteClient = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        const client = user.clients.id(req.params.clientId);
        if (!client) return res.status(404).json({ message: 'Client not found' });

        await logActivity(
            req.user.userId,
            'CLIENT_DELETED',
            `Deleted client "${client.name}"`,
            { clientId: client._id }
        );

        user.clients = user.clients.filter(c => c._id.toString() !== req.params.clientId);
        await user.save();

        res.status(200).json({ message: 'Client deleted' });
    } catch (error) {
        console.error("deleteClient error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// 📁 Get all works of a client
export const getClientWorks = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        const client = user.clients.id(req.params.clientId);
        if (!client) return res.status(404).json({ message: 'Client not found' });

        res.status(200).json(client.works);
    } catch (error) {
        console.error("getClientWorks error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// ➕ Add work to client
export const addClientWork = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        const client = user.clients.id(req.params.clientId);
        if (!client) return res.status(404).json({ message: 'Client not found' });

        const handleAdd = async (document = null) => {
            const newWork = {
                fieldOfWork: req.body.fieldOfWork,
                workDescription: req.body.workDescription,
                isWorkCompleted: req.body.isWorkCompleted === 'true',
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                cost: req.body.cost,
                paymentStatus: req.body.paymentStatus || 'Pending',
                document,
            };

            client.works.push(newWork);
            await user.save();

            await logActivity(
                req.user.userId,
                'WORK_ADDED',
                `Added work "${newWork.fieldOfWork}" for client "${client.name}"`,
                { clientId: client._id, workId: client.works[client.works.length - 1]._id }
            );

            await incrementUsage(req.user.userId, "clients");


            return res.status(201).json({ message: 'Work added', works: client.works });
        };

        if (req.file) {
            const streamUpload = cloudinary.uploader.upload_stream(
                {
                    resource_type: 'auto',
                    folder: 'freelancer-docs',
                },
                async (error, result) => {
                    if (error) {
                        console.error("Cloudinary upload failed:", error);
                        return res.status(500).json({ message: 'Cloudinary upload failed' });
                    }

                    const document = {
                        url: result.secure_url,
                        name: req.file.originalname,
                        uploadedAt: new Date(),
                    };

                    return await handleAdd(document);
                }
            );

            if (!req.file.buffer) {
                return res.status(400).json({ message: "File buffer is missing or invalid" });
            }

            streamifier.createReadStream(req.file.buffer).pipe(streamUpload);
        } else {
            await handleAdd();
        }
    } catch (error) {
        console.error("addClientWork error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// ✏️ Update a work (payment status)
export const updateClientWork = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        const client = user.clients.id(req.params.clientId);
        if (!client) return res.status(404).json({ message: 'Client not found' });

        const work = client.works.id(req.params.workId);
        if (!work) return res.status(404).json({ message: 'Work not found' });

        if (req.body.paymentStatus) {
            work.paymentStatus = req.body.paymentStatus;
        } else {
            return res.status(400).json({ message: "No paymentStatus provided" });
        }

        await user.save();

        await logActivity(
            req.user.userId,
            'PAYMENT_STATUS_UPDATED',
            `Payment status for "${work.fieldOfWork}" changed to "${work.paymentStatus}"`,
            { clientId: client._id, workId: work._id }
        );

        return res.status(200).json({ message: 'Payment status updated', work });
    } catch (error) {
        console.error("updateClientWork error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// 🗑 Delete a work
export const deleteClientWork = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        const client = user.clients.id(req.params.clientId);
        if (!client) return res.status(404).json({ message: 'Client not found' });

        const work = client.works.id(req.params.workId);

        await logActivity(
            req.user.userId,
            'WORK_DELETED',
            `Deleted work "${work?.fieldOfWork}" for client "${client.name}"`,
            { clientId: client._id, workId: work?._id }
        );

        client.works = client.works.filter(w => w._id.toString() !== req.params.workId);
        await user.save();

        res.status(200).json({ message: 'Work deleted' });
    } catch (error) {
        console.error("deleteClientWork error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Update payment status
export const updatePaymentStatus = async (req, res) => {
    try {
        const { clientId, workId } = req.params;
        const { paymentStatus } = req.body;

        if (!['Pending', 'Paid', 'Overdue'].includes(paymentStatus)) {
            return res.status(400).json({ message: "Invalid payment status" });
        }

        const user = await User.findById(req.user.userId);
        const client = user.clients.id(clientId);
        if (!client) return res.status(404).json({ message: "Client not found" });

        const work = client.works.id(workId);
        if (!work) return res.status(404).json({ message: "Work not found" });

        work.paymentStatus = paymentStatus;
        await user.save();

        await logActivity(
            req.user.userId,
            'PAYMENT_STATUS_UPDATED',
            `Payment status for "${work.fieldOfWork}" changed to "${paymentStatus}"`,
            { clientId: client._id, workId: work._id }
        );

        res.status(200).json({ message: "Payment status updated", status: paymentStatus });
    } catch (error) {
        console.error("updatePaymentStatus error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Update task status
export const updateTaskStatus = async (req, res) => {
    try {
        const { clientId, workId } = req.params;
        const { isWorkCompleted } = req.body;

        const user = await User.findById(req.user.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const client = user.clients.id(clientId);
        if (!client) return res.status(404).json({ message: 'Client not found' });

        const work = client.works.id(workId);
        if (!work) return res.status(404).json({ message: 'Work not found' });

        work.isWorkCompleted = isWorkCompleted;
        await user.save();

        await logActivity(
            req.user.userId,
            'TASK_STATUS_UPDATED',
            `Marked work "${work.fieldOfWork}" as ${isWorkCompleted ? 'Completed' : 'Incomplete'}`,
            { clientId: client._id, workId: work._id }
        );

        res.status(200).json({ message: 'Task status updated', work });
    } catch (error) {
        console.error("updateTaskStatus error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// 📧 Send payment reminder
export const sendPaymentReminder = async (req, res) => {
    try {
        const { clientId, workId } = req.params;

        const user = await User.findById(req.user.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const client = user.clients.id(clientId);
        if (!client) return res.status(404).json({ message: 'Client not found' });

        const work = client.works.id(workId);
        if (!work) return res.status(404).json({ message: 'Work not found' });

        const subject = `Payment Reminder: "${work.fieldOfWork}" is ${work.paymentStatus}`;
        const text = `
Hi ${client.name},

This is a reminder that your payment for the project "${work.fieldOfWork}" is still marked as "${work.paymentStatus}".

Amount: ₹${work.cost}
Due Dates: ${new Date(work.startDate).toLocaleDateString()} - ${new Date(work.endDate).toLocaleDateString()}

Please complete the payment at your earliest convenience.

Regards,
${req.user.name || 'Freelancer'}
        `;

        await sendReminderEmail(client.email, subject, text);

        await logActivity(
            req.user.userId,
            'PAYMENT_REMINDER_SENT',
            `Sent payment reminder to "${client.name}" for "${work.fieldOfWork}"`,
            { clientId: client._id, workId: work._id }
        );

        res.json({ message: 'Reminder email sent successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to send reminder email' });
    }
};


export const sendWorkPaymentEmailReminder = async (req, res) => {
    try {
        const { clientId, workId } = req.params;

        const user = await User.findById(req.user.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const client = user.clients.id(clientId);
        if (!client) return res.status(404).json({ message: 'Client not found' });

        const work = client.works.id(workId);
        if (!work) return res.status(404).json({ message: 'Work not found' });

        const subject = `Payment Reminder: "${work.fieldOfWork}" is ${work.paymentStatus}`;
        const text = `
Hi ${client.name},

This is a reminder that your payment for the project "${work.fieldOfWork}" is still marked as "${work.paymentStatus}".

Amount: ₹${work.cost}
Duration: ${new Date(work.startDate).toLocaleDateString()} - ${new Date(work.endDate).toLocaleDateString()}

Please complete the payment at your earliest convenience.

Regards,
${req.user.name || 'Freelancer'}
`;

        await sendReminderEmail(client.email, subject, text);
        res.json({ message: 'Reminder email sent successfully' });

    } catch (err) {
        console.error('❌ Email reminder error:', err);
        res.status(500).json({ message: 'Failed to send reminder email' });
    }
};