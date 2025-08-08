import mongoose from 'mongoose';

const workSchema = new mongoose.Schema({
    fieldOfWork: {
        type: String,
        required: true,
    },
    workDescription: {
        type: String,
    },
    isWorkCompleted: {
        type: Boolean,
        default: false,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    cost: {
        type: Number,
        default: 0,
    },
    document: {
        url: String,          // URL to the contract or related doc
        name: String,         // Original file name (optional)
        uploadedAt: {
            type: Date,
            default: Date.now,
        },
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Overdue'],
        default: 'Pending',
      },
});
  

const clientSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    company: String,
    notes: String,
    works: [workSchema],
});

const subscriptionSchema = new mongoose.Schema( {
    id: String,
    plan: {
        type: String,
        enum: ['Basic', 'Premium'],
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'CANCELLED', 'EXPIRED', 'SUSPENDED'],
    },
    startDate: Date,
    nextBillingDate: Date,
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
})


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        // Password only for manual signup users
        password: {
            type: String,
            select: false,
        },

        // For Google login users
        googleId: {
            type: String,
            unique: true,
            sparse: true, // allows both manual and google accounts
        },

        role: {
            type: String,
            enum: ['freelancer', 'admin'],
            default: 'freelancer',
        },

        profile: {
            type: String,
            default: '',
        },

        bio: String,
        skills: [String],
        typeOfWork: [String], // e.g., ['Web Development', 'UI/UX Design']
        workExperience: String,

        location: {
            city: String,
            country: String,
        },

        heardUsFrom: {
            type: String,
            enum: ["Friend", "Social Media", "Google Search", "College", "Other"]
        },
        
        website: {
            type: String,
            default: '',
        },

        phone: {
            type: String,
            required: true,
            unique: true,
        },

        invoiceLogo: {
            type: String,
            default: '',
        },

        hasCompleted: { type: Boolean, default: false },


        resetToken: String,
        resetTokenExpiry: Date,

        clients: [clientSchema],

        subscription: [subscriptionSchema],
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
