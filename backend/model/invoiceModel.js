// models/invoiceModel.js
import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
    freelancerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    workId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    invoiceNumber: {
        type: String,
        required: true,
        unique: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Paid'],
        default: 'Pending',
    },
    notes: String,
    pdfUrl: String,
    generatedAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Invoice', invoiceSchema);
