// 📁 controller/proposalController.js
import fs from 'fs';
import { OpenAI } from 'openai';
import Proposal from "../model/proposalModel.js";
import cloudinary from "../config/cloudinary.js";
import User from "../model/userModel.js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 🔹 Route 1: Generate Proposal Content
export const generateProposalContent = async (req, res) => {
    try {
        const {
            projectTitle,
            projectDescription,
            clientName,
            clientEmail,
        } = req.body;

        // Step 1: Fetch freelancer info from DB
        const freelancer = await User.findById(req.user.userId).select(
            'name email title phone website'
        );

        if (!freelancer) {
            return res.status(404).json({ message: 'Freelancer not found' });
        }

        // Step 2: Construct prompt with structured output instruction
        const prompt = `
You are a professional freelancer writing persuasive project proposals.
Return the response strictly in this JSON structure (do not include any commentary or explanations):

{
  "greeting": "",
  "projectUnderstanding": "",
  "objectives": "",
  "proposedSolutions": "",
  "timeline": "",
  "milestones": [],
  "budget": "",
  "technologies": [],
  "paymentTerms": "",
  "additionalNotes": "",
  "closing": ""
}

Here are the details:

🔹 Project Information
- Title: ${projectTitle || 'Untitled Project'}
- Description: ${projectDescription || 'No description provided'}

🔹 Client Information
- Name: ${clientName || 'Valued Client'}
- Email: ${clientEmail || 'Not Provided'}

🔹 Freelancer Information
- Name: ${freelancer.name}
- Email: ${freelancer.email}
- Title: ${freelancer.title || 'Freelancer'}
- Phone: ${freelancer.phone || 'Not Provided'}
- Website: ${freelancer.website || 'Not Provided'}

Follow a professional tone and keep the text persuasive yet clear.
        `;

        // Step 3: Call GPT
        const response = await openai.chat.completions.create({
            messages: [
                { role: 'system', content: 'You are a professional freelance proposal writer.' },
                { role: 'user', content: prompt },
            ],
            model: 'gpt-4',
        });

        const content = response.choices[0].message.content;

        // Step 4: Attempt to parse JSON safely
        let structuredProposal;
        try {
            structuredProposal = JSON.parse(content);
        } catch (parseErr) {
            console.error('GPT JSON parse error:', parseErr);
            return res.status(500).json({
                message: 'Failed to parse structured proposal from GPT response',
                rawOutput: content, // send raw for debugging on frontend if needed
            });
        }

        // Step 5: Send structured proposal back to frontend
        res.status(200).json({
            structuredProposal: {
                client: {
                    name: clientName,
                    email: clientEmail,
                },
                freelancer: {
                    name: freelancer.name,
                    email: freelancer.email,
                    title: freelancer.title || 'Freelancer',
                    phone: freelancer.phone || '',
                    website: freelancer.website || '',
                },
                project: {
                    title: projectTitle,
                    description: projectDescription,
                },
                ...structuredProposal,
            },
        });

    } catch (err) {
        console.error('Proposal generation error:', err);
        res.status(500).json({ message: 'Failed to generate proposal content' });
    }
};



// 🔹 Route 2: Submit Proposal
export const createProposal = async (req, res) => {
    try {
        const {
            clientEmail,
            clientName,
            projectTitle,
            projectDescription,
            customNotes,
            generatedProposal,
        } = req.body;

        const freelancerId = req.user.userId;

        let documentData = {};
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'proposal-documents',
                resource_type: 'raw',
            });

            fs.unlinkSync(req.file.path);

            documentData = {
                url: result.secure_url,
                name: req.file.originalname,
            };
        }

        const proposal = new Proposal({
            freelancerId,
            clientEmail,
            clientName,
            projectTitle,
            projectDescription,
            generatedProposal,
            customNotes,
            document: documentData,
        });

        await proposal.save();
        res.status(201).json({ message: 'Proposal created', proposal });

    } catch (error) {
        console.error('Proposal creation error:', error);
        res.status(500).json({ message: 'Failed to create proposal' });
    }
};


export const getAllProposalsForFreelancer = async (req, res) => {
    const freelancerId = req.user._id; // from JWT middleware

    try {
        const proposals = await Proposal.find({ freelancerId }).sort({ createdAt: -1 });
        res.status(200).json({ proposals });
    } catch (err) {
        console.error('Error fetching proposals:', err);
        res.status(500).json({ error: 'Server error' });
    }
};