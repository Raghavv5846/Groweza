import cloudinary from '../config/cloudinary.js';
import User from "../model/userModel.js"
import fs from 'fs';


export const completeOnboarding = async (req, res) => {
    try {
        // console.log('Onboarding Request Body:', req.body);
        const userId = req.user._id;

        const {
            bio,
            skills,
            typeOfWork,
            workExperience,
            location,
            heardUsFrom,
            phone,
            website
        } = req.body;

        let profileUrl = '';

        // If image is uploaded
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'freelancer_profiles',
                width: 300,
                crop: 'scale',
            });

            profileUrl = result.secure_url;
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                profile: profileUrl || undefined,
                bio,
                skills,
                typeOfWork,
                workExperience,
                location,
                heardUsFrom,
                phone,
                website,
                hasCompleted: true,
            },
            { new: true }
        );


        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'Onboarding completed successfully',
            user: updatedUser,
        });
    } catch (error) {
        console.error('Onboarding Error:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


export const getFreelancer = async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  };





export const uploadInvoiceLogo = async (req, res) => {
    try {
        const userId = req.user.userId;


        if (!req.file) {
            return res.status(400).json({ message: 'No image file provided.' });
        }


        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'invoice-logos',
        });



        // Delete the local file after upload
        fs.unlinkSync(req.file.path);

        // Update user record
        const user = await User.findByIdAndUpdate(
            userId,
            { invoiceLogo: result.secure_url },
            { new: true }
        );



        res.status(200).json({
            message: 'Invoice logo uploaded successfully.',
            logoUrl: result.secure_url,
            user,
        });
    } catch (err) {
        console.error('Upload error:', err);
        res.status(500).json({ message: 'Server error during logo upload.' });
    }
};

export const updateFreelancerProfile = async (req, res) => {
    try {
        const userId = req.user._id;

        const {
            bio,
            skills,
            typeOfWork,
            workExperience,
            location,
            heardUsFrom,
        } = req.body;

        let profileUrl;

        // If a new image is uploaded
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "freelancer_profiles",
                width: 300,
                crop: "scale",
            });

            fs.unlinkSync(req.file.path);
            profileUrl = result.secure_url;
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                ...(profileUrl && { profile: profileUrl }),
                ...(bio && { bio }),
                ...(skills && { skills }),
                ...(typeOfWork && { typeOfWork }),
                ...(workExperience && { workExperience }),
                ...(location && { location }),
                ...(heardUsFrom && { heardUsFrom }),
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Freelancer profile updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        console.error("Profile Update Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
