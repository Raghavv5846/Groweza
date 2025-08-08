import User from "../model/userModel.js";
import Project from "../model/projectModel.js";
import Testimonial from "../model/TestimonialModel.js"
// controllers/portfolioController.js
import path from "path";
import fs from "fs";
import ReactDOMServer from "react-dom/server";
// import{ MinimalPortfolio } from "../websiteTemplates/dist/Minimal.js"; // Your .jsx files as .js here
// // import HeroDark from "../templateComponents/HeroDark.js";

export const portolioData = async (req, res) => {
    try {
        const userId = req.user.userId;

        const user = await User.findById(userId).lean();
        if (!user) return res.status(404).json({ message: 'User not found' });

        const projects = await Project.find({ freelancerId: userId }).lean();
        const testimonials = await Testimonial.find({ freelancerId: userId }).lean();

        res.json({
            profile: {
                name: user.name,
                email: user.email,
                profile: user.profile,
                bio: user.bio,
                skills: user.skills,
                typeOfWork: user.typeOfWork,
                workExperience: user.workExperience,
                location: user.location,
            },
            projects,
            testimonials,
            clients: user.clients.map(client => ({
                name: client.name,
                company: client.company,
                works: client.works.map(work => ({
                    fieldOfWork: work.fieldOfWork,
                    description: work.workDescription,
                    cost: work.cost,
                    isCompleted: work.isWorkCompleted,
                    startDate: work.startDate,
                    endDate: work.endDate,
                }))
            }))
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};




// export const buildPortfolio = async (req, res) => {
//     const { template, data } = req.body;

//     try {
//         const user = await User.findOne({ email: data.email });
//         if (!user) return res.status(404).json({ message: "User not found" });

//         // Choose template
//         let Component;
//         if (template === "minimal") Component = MinimalPortfolio;
//         // else if (template === "hero") Component = HeroDark;
//         else return res.status(400).json({ message: "Invalid template" });

//         // Render HTML
//         const html = `
//             <!DOCTYPE html>
//             <html lang="en">
//             <head>
//                 <meta charset="UTF-8" />
//                 <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//                 <title>${user.name} - Portfolio</title>
//                 <link rel="stylesheet" href="/styles/global.css" />
//             </head>
//             <body>
//                 <div id="root">${ReactDOMServer.renderToStaticMarkup(React.createElement(Component, { data }))}</div>

//             </body>
//             </html>
//         `;

//         // Save HTML to file
//         const fileName = `${user.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.html`;
//         const outputPath = path.resolve("public", "sites", fileName);
//         fs.writeFileSync(outputPath, html, "utf8");

//         const siteUrl = `/sites/${fileName}`;

//         // Save URL to user's profile
//         user.profile = siteUrl;
//         await user.save();

//         res.status(200).json({ message: "Portfolio built", url: siteUrl });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Failed to build portfolio" });
//     }
// };
