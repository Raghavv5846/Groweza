// import React from 'react';

// const Section = ({ title, children }) => (
//     <div className="break-after-page py-8 px-6">
//         <h2 className="text-2xl font-bold border-b pb-2 mb-4 text-gray-800">{title}</h2>
//         <div className="text-gray-700 space-y-2 text-base leading-relaxed">
//             {children}
//         </div>
//     </div>
// );

// const MultiPageProposalTemplate = ({ proposal }) => {
//     const {
//         client,
//         freelancer,
//         project,
//         greeting,
//         projectUnderstanding,
//         objectives,
//         proposedSolutions,
//         timeline,
//         milestones,
//         budget,
//         technologies,
//         paymentTerms,
//         additionalNotes,
//         closing,
//     } = proposal;

//     return (
//         <div className="w-[210mm] min-h-[297mm] mx-auto bg-white text-black p-10 print:p-0 print:w-full print:h-full">
//             {/* Page 1: Cover */}
//             <div className="h-[297mm] flex flex-col justify-center items-center text-center">
//                 <h1 className="text-4xl font-bold mb-4">Project Proposal</h1>
//                 <h2 className="text-2xl font-semibold text-gray-700">{project.title}</h2>
//                 <p className="mt-10 text-lg">Prepared for:</p>
//                 <p className="font-medium text-xl">{client.name}</p>
//                 <p className="text-gray-600">{client.email}</p>

//                 <p className="mt-10 text-lg">Prepared by:</p>
//                 <p className="font-medium text-xl">{freelancer.name}</p>
//                 <p className="text-gray-600">{freelancer.title} | {freelancer.email}</p>
//                 <p className="text-gray-600">{freelancer.phone}</p>
//                 <p className="text-gray-600">{freelancer.website}</p>
//             </div>

//             {/* Page 2: Greeting & Understanding */}
//             <Section title="Greeting">{greeting}</Section>
//             <Section title="Project Understanding">{projectUnderstanding}</Section>

//             {/* Page 3: Objectives & Proposed Solutions */}
//             <Section title="Objectives">{objectives}</Section>
//             <Section title="Proposed Solutions">{proposedSolutions}</Section>


//             {/* Page 5: Budget & Technologies */}
//             <Section title="Budget">{budget}</Section>
//             <Section title="Technologies">
//                 <ul className="list-disc list-inside">
//                     {technologies?.map((tech, index) => (
//                         <li key={index}>{tech}</li>
//                     ))}
//                 </ul>
//             </Section>

//             {/* Page 6: Payment Terms & Additional Notes */}
//             <Section title="Payment Terms">{paymentTerms}</Section>
//             <Section title="Additional Notes">{additionalNotes}</Section>

//             {/* Page 7: Closing */}
//             <Section title="Closing">{closing}</Section>
//         </div>
//     );
// };

// export default MultiPageProposalTemplate;



import React from 'react';

const Section = ({ title, children, className = "" }) => (
    <div className={`break-after-page py-12 px-8 ${className}`}>
        <h2 className="text-3xl font-bold border-b-2 border-blue-600 pb-4 mb-8 text-gray-900">{title}</h2>
        <div className="text-gray-700 space-y-4 text-lg leading-relaxed">
            {children}
        </div>
    </div>
);

const MultiPageProposalTemplate = ({ proposal }) => {
    const sampleProposal = {
        client: {
            name: "ABC Corporation",
            email: "contact@abccorp.com",
            company: "ABC Corporation"
        },
        freelancer: {
            name: "Sarah Johnson",
            title: "Senior Web Developer & UI/UX Designer",
            email: "sarah@webstudio.com",
            phone: "+1 (555) 123-4567",
            website: "www.webstudio.com",
            address: "123 Tech Street, San Francisco, CA 94105"
        },
        project: {
            title: "E-Commerce Website Redesign & Development",
            date: "March 2024"
        },
        greeting: "Dear ABC Corporation Team,\n\nThank you for considering our services for your e-commerce website redesign project. We are excited about the opportunity to work with your team and help transform your digital presence. This proposal outlines our understanding of your requirements and presents a comprehensive solution tailored to your business needs.",

        projectUnderstanding: "Based on our initial discussions and requirements analysis, we understand that ABC Corporation is looking to:\n\n• Redesign and modernize the existing e-commerce platform\n• Improve user experience and conversion rates\n• Implement responsive design for mobile optimization\n• Integrate advanced payment processing systems\n• Enhance site performance and loading speeds\n• Implement SEO best practices\n• Create an intuitive admin dashboard for content management\n\nYour current platform faces challenges with outdated design, poor mobile experience, and limited scalability. Our solution will address these issues while positioning your business for future growth.",

        objectives: "Our primary objectives for this project are:\n\n1. **Enhanced User Experience**: Create an intuitive, modern interface that guides users seamlessly through the purchasing process\n\n2. **Mobile-First Design**: Ensure optimal performance across all devices with responsive design principles\n\n3. **Performance Optimization**: Achieve loading times under 3 seconds and improve Core Web Vitals scores\n\n4. **Conversion Rate Improvement**: Implement proven UX patterns to increase conversion rates by at least 25%\n\n5. **Scalability**: Build a robust foundation that can handle increased traffic and product catalog expansion\n\n6. **SEO Enhancement**: Improve search engine visibility and organic traffic through technical and content optimization",

        proposedSolutions: "Our comprehensive solution includes:\n\n**Phase 1: Discovery & Planning**\n• Detailed user research and competitor analysis\n• Information architecture and user journey mapping\n• Technical requirements documentation\n• Design system and brand guideline development\n\n**Phase 2: Design & Prototyping**\n• High-fidelity mockups for all key pages\n• Interactive prototypes for user testing\n• Mobile and desktop design variations\n• Accessibility compliance (WCAG 2.1 AA)\n\n**Phase 3: Development & Implementation**\n• Modern React.js frontend development\n• Node.js backend with secure API integration\n• Database optimization and migration\n• Payment gateway integration (Stripe, PayPal)\n• Advanced search and filtering functionality\n\n**Phase 4: Testing & Launch**\n• Comprehensive testing across devices and browsers\n• Performance optimization and security audits\n• Staff training and documentation\n• Smooth migration and go-live support",

        timeline: "**Total Project Duration: 16 weeks**\n\n**Week 1-3: Discovery & Planning**\n• Stakeholder interviews and requirements gathering\n• User research and competitive analysis\n• Technical architecture planning\n\n**Week 4-7: Design Phase**\n• Wireframing and user flow creation\n• High-fidelity design mockups\n• Design system development\n• Client review and revisions\n\n**Week 8-13: Development Phase**\n• Frontend development and styling\n• Backend API development\n• Database setup and integration\n• Third-party service integrations\n\n**Week 14-16: Testing & Launch**\n• Quality assurance testing\n• Performance optimization\n• User acceptance testing\n• Go-live and post-launch support",

        milestones: [
            "Project kickoff and requirements finalization - Week 1",
            "Wireframes and user flows approval - Week 4",
            "Design mockups approval - Week 7",
            "Frontend development completion - Week 11",
            "Backend and integrations completion - Week 13",
            "Testing and quality assurance completion - Week 15",
            "Website launch and handover - Week 16"
        ],

        budget: "**Total Project Investment: $45,000**\n\n**Breakdown by Phase:**\n\n• Discovery & Planning: $8,000\n• Design & Prototyping: $12,000\n• Development & Implementation: $20,000\n• Testing & Launch: $5,000\n\n**What's Included:**\n• Complete website redesign and development\n• Mobile-responsive design\n• Content management system\n• SEO optimization\n• 3 months post-launch support\n• Training and documentation\n• Performance monitoring setup\n\n**Additional Services (Optional):**\n• Ongoing maintenance: $500/month\n• Content creation support: $150/hour\n• Additional integrations: Custom quote",

        technologies: [
            "Frontend: React.js, TypeScript, Tailwind CSS",
            "Backend: Node.js, Express.js, MongoDB",
            "Payment Processing: Stripe, PayPal",
            "Hosting: AWS/Digital Ocean with CDN",
            "Analytics: Google Analytics 4, Hotjar",
            "SEO Tools: Schema markup, XML sitemaps",
            "Development Tools: Git, Docker, CI/CD pipelines"
        ],

        paymentTerms: "**Payment Schedule:**\n\n• 30% deposit upon project approval ($13,500)\n• 40% at design approval milestone ($18,000)\n• 30% upon project completion ($13,500)\n\n**Payment Methods:**\nWe accept payments via bank transfer, check, or online payment platforms. All payments are due within 15 days of invoice receipt.\n\n**Terms:**\n• Late payments subject to 1.5% monthly service charge\n• Project timeline may be adjusted for payment delays\n• Final deliverables released upon full payment\n• Change requests outside scope will be quoted separately",

        additionalNotes: "**Post-Launch Support:**\nWe provide 3 months of complimentary support including bug fixes, minor updates, and technical assistance. Our team will monitor site performance and provide monthly reports during this period.\n\n**Communication:**\nRegular progress updates will be provided via weekly status calls and a dedicated project management portal where you can track milestones, provide feedback, and access all project deliverables.\n\n**Intellectual Property:**\nUpon final payment, all custom code and designs become the property of ABC Corporation. We retain the right to showcase the project in our portfolio unless otherwise requested.\n\n**Quality Assurance:**\nWe guarantee our work and will address any issues that arise during the warranty period at no additional cost.",

        closing: "We are confident that our proposed solution will exceed your expectations and deliver measurable results for your business. Our team brings over 8 years of combined experience in e-commerce development and has successfully launched 50+ websites for clients across various industries.\n\n**Next Steps:**\n\n1. Review this proposal and provide any feedback\n2. Schedule a follow-up call to discuss any questions\n3. Sign the project agreement and provide deposit\n4. Begin project kickoff within 5 business days\n\nWe look forward to partnering with ABC Corporation and helping you achieve your digital goals. Please don't hesitate to contact us with any questions or to discuss this proposal further.\n\nBest regards,\n\nSarah Johnson\nSenior Web Developer & UI/UX Designer\nWebStudio Solutions\nsarah@webstudio.com | +1 (555) 123-4567"
    };

    const data = proposal || sampleProposal;
    const {
        client,
        freelancer,
        project,
        greeting,
        projectUnderstanding,
        objectives,
        proposedSolutions,
        timeline,
        milestones,
        budget,
        technologies,
        paymentTerms,
        additionalNotes,
        closing,
    } = data;

    return (
        <div className="w-[210mm] min-h-[297mm] mx-auto bg-white text-black shadow-2xl">

            {/* Page 1: Professional Cover Page */}
            <div className="h-[297mm] flex flex-col justify-between bg-gradient-to-br from-blue-50 to-indigo-100 p-12">
                <div className="text-center flex-grow flex flex-col justify-center">
                    <div className="mb-8">
                        <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                            <span className="text-white text-2xl font-bold">WS</span>
                        </div>
                        <h1 className="text-5xl font-bold text-gray-900 mb-4">PROJECT PROPOSAL</h1>
                        <div className="w-32 h-1 bg-blue-600 mx-auto mb-8"></div>
                    </div>

                    <h2 className="text-3xl font-semibold text-gray-800 mb-12 leading-tight">{project.title}</h2>

                    <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg p-8 mx-auto max-w-md shadow-lg">
                        <div className="mb-6">
                            <p className="text-lg font-semibold text-gray-600 mb-2">Prepared for:</p>
                            <p className="font-bold text-2xl text-gray-900">{client.name}</p>
                            <p className="text-gray-600">{client.email}</p>
                        </div>

                        <div>
                            <p className="text-lg font-semibold text-gray-600 mb-2">Prepared by:</p>
                            <p className="font-bold text-xl text-gray-900">{freelancer.name}</p>
                            <p className="text-gray-600">{freelancer.title}</p>
                            <p className="text-blue-600">{freelancer.email}</p>
                            <p className="text-gray-600">{freelancer.phone}</p>
                        </div>
                    </div>
                </div>

                <div className="text-center border-t border-gray-300 pt-4">
                    <p className="text-gray-600">{project.date} • Confidential & Proprietary</p>
                </div>
            </div>

            {/* Page 2: Executive Summary */}
            <div className="break-after-page py-12 px-8 bg-gray-50">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Executive Summary</h2>
                <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                        <p className="text-xl font-medium text-blue-600">Project Overview</p>
                        <p>This proposal outlines a comprehensive solution for {client.name}'s digital transformation needs. Our approach combines strategic planning, innovative design, and robust development to deliver exceptional results.</p>

                        <div className="grid md:grid-cols-3 gap-6 my-8">
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                                <div className="text-2xl font-bold text-blue-600">16</div>
                                <div className="text-gray-600">Weeks Timeline</div>
                            </div>
                            <div className="text-center p-4 bg-green-50 rounded-lg">
                                <div className="text-2xl font-bold text-green-600">$45K</div>
                                <div className="text-gray-600">Total Investment</div>
                            </div>
                            <div className="text-center p-4 bg-purple-50 rounded-lg">
                                <div className="text-2xl font-bold text-purple-600">3</div>
                                <div className="text-gray-600">Months Support</div>
                            </div>
                        </div>

                        <p>Our team brings proven expertise in modern web development, user experience design, and digital strategy to ensure your project's success.</p>
                    </div>
                </div>
            </div>

            {/* Page 3: Greeting */}
            <Section title="Introduction & Greeting">
                <div className="whitespace-pre-line">{greeting}</div>
            </Section>

            {/* Page 4: Project Understanding */}
            <Section title="Project Understanding">
                <div className="whitespace-pre-line">{projectUnderstanding}</div>
            </Section>

            {/* Page 5: Objectives */}
            <Section title="Project Objectives">
                <div className="whitespace-pre-line">{objectives}</div>
            </Section>

            {/* Page 6: Proposed Solutions */}
            <Section title="Proposed Solutions">
                <div className="whitespace-pre-line">{proposedSolutions}</div>
            </Section>

            {/* Page 7: Timeline */}
            <Section title="Project Timeline">
                <div className="whitespace-pre-line">{timeline}</div>
            </Section>

            {/* Page 8: Milestones */}
            {/* <Section title="Key Milestones">
                <div className="space-y-3">
                    {milestones?.map((milestone, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                            <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                                {index + 1}
                            </div>
                            <p className="text-gray-700">{milestone}</p>
                        </div>
                    ))}
                </div>
            </Section> */}

            {/* Page 9: Budget */}
            <Section title="Investment & Budget">
                <div className="whitespace-pre-line">{budget}</div>
            </Section>

            {/* Page 10: Technologies */}
            <Section title="Technologies & Tools">
                <div className="grid md:grid-cols-2 gap-4">
                    {technologies?.map((tech, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <p className="text-gray-700">{tech}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Page 11: Payment Terms */}
            <Section title="Payment Terms & Conditions">
                <div className="whitespace-pre-line">{paymentTerms}</div>
            </Section>

            {/* Page 12: Additional Notes */}
            <Section title="Additional Information">
                <div className="whitespace-pre-line">{additionalNotes}</div>
            </Section>

            {/* Page 13: Closing */}
            <Section title="Next Steps & Closing" className="border-t-4 border-blue-600">
                <div className="whitespace-pre-line">{closing}</div>
            </Section>

            {/* Page 14: Contact & Footer */}
            <div className="break-after-page py-12 px-8 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="text-center h-full flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Let's Get Started</h2>

                    <div className="bg-white rounded-lg p-8 shadow-lg max-w-lg mx-auto">
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
                            <div className="space-y-2 text-gray-600">
                                <p><span className="font-medium">Email:</span> {freelancer.email}</p>
                                <p><span className="font-medium">Phone:</span> {freelancer.phone}</p>
                                <p><span className="font-medium">Website:</span> {freelancer.website}</p>
                                {freelancer.address && <p><span className="font-medium">Address:</span> {freelancer.address}</p>}
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-6">
                            <p className="text-sm text-gray-500 mb-4">This proposal is valid for 30 days from the date of submission.</p>
                            <p className="text-lg font-medium text-blue-600">We look forward to working with you!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MultiPageProposalTemplate;