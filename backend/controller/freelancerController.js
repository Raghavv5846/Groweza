import cloudinary from '../config/cloudinary.js';
import User from "../model/userModel.js"
import fs from 'fs';
import streamifier from "streamifier";
import { v2 as cloudinaryy } from "cloudinary";


// export const completeOnboarding = async (req, res) => {
//     try {
//         // console.log('Onboarding Request Body:', req.body);
//         const userId = req.user._id;

//         const {
//             bio,
//             skills,
//             typeOfWork,
//             workExperience,
//             location,
//             heardUsFrom,
//             phone,
//             website
//         } = req.body;

//         let profileUrl = '';

//         // If image is uploaded
//         if (req.file) {
//             const result = await cloudinary.uploader.upload(req.file.path, {
//                 folder: 'freelancer_profiles',
//                 width: 300,
//                 crop: 'scale',
//             });

//             profileUrl = result.secure_url;
//         }

//         const updatedUser = await User.findByIdAndUpdate(
//             userId,
//             {
//                 profile: profileUrl || undefined,
//                 bio,
//                 skills,
//                 typeOfWork,
//                 workExperience,
//                 location,
//                 heardUsFrom,
//                 phone,
//                 website,
//                 hasCompleted: true,
//             },
//             { new: true }
//         );


//         if (!updatedUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.status(200).json({
//             message: 'Onboarding completed successfully',
//             user: updatedUser,
//         });
//     } catch (error) {
//         console.error('Onboarding Error:', error);
//         res.status(500).json({ message: 'Server Error', error: error.message });
//     }
// };


// export const completeOnboarding = async (req, res) => {
//     try {
//         const userId = req.user._id;

//         // Parse JSON fields from FormData
//         const skills = req.body.skills ? JSON.parse(req.body.skills) : [];
//         const typeOfWork = req.body.typeOfWork ? JSON.parse(req.body.typeOfWork) : [];
//         const location = req.body.location
//             ? JSON.parse(req.body.location)
//             : {
//                   city: req.body['location[city]'] || '',
//                   country: req.body['location[country]'] || ''
//               };

//         let profileUrl = '';

//         // If image is uploaded
//         if (req.file && req.file.buffer) {
//             const result = await new Promise((resolve, reject) => {
//                 cloudinary.uploader.upload_stream(
//                     { folder: 'freelancer_profiles', width: 300, crop: 'scale' },
//                     (error, uploaded) => {
//                         if (error) return reject(error);
//                         resolve(uploaded);
//                     }
//                 ).end(req.file.buffer);
//             });

//             profileUrl = result.secure_url;
//         }

//         const updatedUser = await User.findByIdAndUpdate(
//             userId,
//             {
//                 profile: profileUrl || undefined,
//                 bio: req.body.bio,
//                 skills,
//                 typeOfWork,
//                 workExperience: req.body.workExperience,
//                 location,
//                 heardUsFrom: req.body.heardUsFrom,
//                 phone: req.body.phone,
//                 website: req.body.website,
//                 hasCompleted: true,
//             },
//             { new: true }
//         );

//         if (!updatedUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.status(200).json({
//             message: 'Onboarding completed successfully',
//             user: updatedUser,
//         });
//     } catch (error) {
//         console.error('Onboarding Error:', error);
//         res.status(500).json({ message: 'Server Error', error: error.message });
//     }
// };


import { logActivity } from '../config/logActivity.js'; // import logger
export const completeOnboarding = async (req, res) => {
    try {
        const userId = req.user._id;

        // Safe parse helper
        const safeParse = (value, fallback) => {
            if (!value) return fallback;
            if (typeof value === 'string') {
                try {
                    return JSON.parse(value);
                } catch {
                    return fallback;
                }
            }
            return value; // already object/array
        };

        const skills = safeParse(req.body.skills, []);
        const typeOfWork = safeParse(req.body.typeOfWork, []);
        const location = safeParse(req.body.location, {
            city: req.body['location[city]'] || '',
            country: req.body['location[country]'] || ''
        });

        let profileUrl = '';

        // If image is uploaded (memoryStorage)
        if (req.file && req.file.buffer) {
            const result = await new Promise((resolve, reject) => {
                cloudinaryy.uploader.upload_stream(
                    { folder: 'freelancer_profiles', width: 300, crop: 'scale' },
                    (error, uploaded) => {
                        if (error) return reject(error);
                        resolve(uploaded);
                    }
                ).end(req.file.buffer);
            });

            profileUrl = result.secure_url;
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                profile: profileUrl || undefined,
                bio: req.body.bio,
                skills,
                typeOfWork,
                workExperience: req.body.workExperience,
                location,
                heardUsFrom: req.body.heardUsFrom,
                phone: req.body.phone,
                website: req.body.website,
                hasCompleted: true,
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        await logActivity(
            req.user._id,
            "ONBOARDING_COMPLETED",
            `Freelancer ${updatedUser.name} completed onboarding`,
            { freelancerId: updatedUser._id }
        );


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





// export const uploadInvoiceLogo = async (req, res) => {
//     try {
//         const userId = req.user.userId;


//         if (!req.file) {
//             return res.status(400).json({ message: 'No image file provided.' });
//         }


//         // Upload to Cloudinary
//         const result = await cloudinary.uploader.upload(req.file.path, {
//             folder: 'invoice-logos',
//         });



//         // Delete the local file after upload
//         fs.unlinkSync(req.file.path);

//         // Update user record
//         const user = await User.findByIdAndUpdate(
//             userId,
//             { invoiceLogo: result.secure_url },
//             { new: true }
//         );

//         await logActivity(
//             req.user._id,
//             "INVOICE_LOGO_UPLOADED",
//             `Uploaded a new invoice logo`,
//             { logoUrl: result.secure_url }
//         );




//         res.status(200).json({
//             message: 'Invoice logo uploaded successfully.',
//             logoUrl: result.secure_url,
//             user,
//         });
//     } catch (err) {
//         console.error('Upload error:', err);
//         res.status(500).json({ message: 'Server error during logo upload.' });
//     }
// };

export const uploadInvoiceLogo = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No image file provided." });
        }

        // Function to upload using a buffer stream
        const streamUpload = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "invoice-logos" },
                    (error, result) => {
                        if (result) resolve(result);
                        else reject(error);
                    }
                );
                streamifier.createReadStream(fileBuffer).pipe(stream);
            });
        };

        // Upload buffer to Cloudinary
        const result = await streamUpload(req.file.buffer);

        // Update DB
        const user = await User.findByIdAndUpdate(
            req.user.userId,
            { invoiceLogo: result.secure_url },
            { new: true }
        );

        // Log activity
        await logActivity(
            req.user._id,
            "INVOICE_LOGO_UPLOADED",
            "Uploaded a new invoice logo",
            { logoUrl: result.secure_url }
        );

        res.status(200).json({
            message: "Invoice logo uploaded successfully.",
            logoUrl: result.secure_url,
            user,
        });
    } catch (err) {
        console.error("Upload error:", err);
        res.status(500).json({ message: "Server error during logo upload." });
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

        await logActivity(
            req.user._id,
            "PROFILE_UPDATED",
            `Freelancer ${freelancer.name} updated their profile`,
            { freelancerId: freelancer._id }
        );


        res.status(200).json({
            message: "Freelancer profile updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        console.error("Profile Update Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
