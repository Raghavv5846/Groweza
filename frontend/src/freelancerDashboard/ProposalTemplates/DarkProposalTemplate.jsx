// import React from 'react';

// const Section = ({ title, children }) => (
//     <div className="break-after-page py-8 px-6">
//         <h2 className="text-2xl font-bold border-b border-gray-600 pb-2 mb-4 text-white">{title}</h2>
//         <div className="text-gray-300 space-y-2 text-base leading-relaxed">
//             {children}
//         </div>
//     </div>
// );

// const DarkProposalTemplate = ({ proposal }) => {
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
//         <div className="w-[210mm] min-h-[297mm] mx-auto bg-gray-900 text-white p-10 print:p-0 print:w-full print:h-full">
//             {/* Page 1: Cover */}
//             {/* <div className="h-[297mm] flex flex-col justify-center items-center text-center">
//                 <h1 className="text-4xl font-bold mb-4 text-white">Project Proposal</h1>
//                 <h2 className="text-2xl font-semibold text-gray-300">{project?.title}</h2>

//                 <p className="mt-10 text-lg text-gray-400">Prepared for:</p>
//                 <p className="font-medium text-xl text-white">{client?.name}</p>
//                 {client?.email && <p className="text-gray-400">{client.email}</p>}

//                 <p className="mt-10 text-lg text-gray-400">Prepared by:</p>
//                 <p className="font-medium text-xl text-white">{freelancer?.name}</p>
//                 <p className="text-gray-400">{freelancer?.title} | {freelancer?.email}</p>
//                 {freelancer?.phone && <p className="text-gray-400">{freelancer.phone}</p>}
//                 {freelancer?.website && <p className="text-gray-400">{freelancer.website}</p>}
//             </div> */}

//             {/* Page 1: Cover */}
//             <div className="h-[297mm] relative bg-black text-white overflow-hidden">
//                 {/* Background architectural image - you'll need to replace with actual image */}
//                 <div className="absolute inset-0 opacity-30">
//                     <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900"></div>
//                     {/* Geometric overlay pattern */}
//                     <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-gray-600/20 to-transparent"></div>
//                     <div className="absolute top-1/4 right-0 w-1/3 h-1/2 bg-white/5 transform skew-y-12"></div>
//                 </div>

//                 {/* Header with studio name and date */}
//                 <div className="absolute top-8 right-8 text-right">
//                     <div className="flex items-center justify-end mb-2">
//                         <div className="w-6 h-6 mr-3">
//                             <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
//                                 <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
//                             </svg>
//                         </div>
//                         <div>
//                             <div className="text-sm font-bold tracking-wider">{freelancer?.name}</div>
//                         </div>
//                     </div>
//                     <div className="text-xs text-gray-400 tracking-wider">
//                         {new Date().toLocaleDateString('en-US', {
//                             year: 'numeric',
//                             month: 'long',
//                             day: 'numeric'
//                         }).toUpperCase()}
//                     </div>
//                 </div>

//                 {/* Main content */}
//                 <div className="relative z-10 h-full flex">
//                     {/* Left side - Main title */}
//                     <div className="flex-1 flex items-center pl-16">
//                         <div>
//                             <h1 className="text-7xl font-bold leading-none tracking-tight mb-8">
//                                 {project?.title}
//                             </h1>
//                         </div>
//                     </div>

//                     {/* Right side - Details and image */}
//                     <div className="w-80 pr-16 flex flex-col justify-between py-16">
//                         {/* Client info */}
//                         <div className="space-y-6">
//                             <div>
//                                 <p className="text-sm text-gray-400 tracking-wider mb-2">PREPARED FOR</p>
//                                 <p className="text-lg font-medium">{client?.name || 'MARCELINE ANDERSON'}</p>
//                             </div>

//                             <div>
//                                 <p className="text-sm text-gray-400 tracking-wider mb-2">PRESENTED TO</p>
//                                 <p className="text-lg font-medium">{client?.name || 'JONATHAN PATTERSON'}</p>
//                             </div>

//                             <div>
//                                 <p className="text-sm text-gray-400 tracking-wider mb-2">PRESENTED BY</p>
//                                 <p className="text-lg font-medium">{freelancer?.name || 'ESTELLE DARCY'}</p>
//                                 <p className="text-sm text-gray-400">{freelancer?.email}</p>
//                                 <p className="text-sm text-gray-400">{freelancer?.phone}</p>
//                             </div>
//                         </div>

//                         {/* Architectural image placeholder */}
//                         <div className="w-full h-48 bg-white/10 rounded-lg overflow-hidden mb-8">
//                             <div className="w-full h-full bg-gradient-to-t from-gray-800 to-gray-600 flex items-center justify-center">
//                                 {/* Architectural building silhouette */}
//                                 <svg viewBox="0 0 200 120" className="w-full h-full opacity-60">
//                                     <path d="M20 120 L20 60 L60 40 L100 60 L100 20 L140 40 L180 20 L180 120 Z"
//                                         fill="currentColor" opacity="0.8" />
//                                     <path d="M60 40 L100 60 L100 120 L60 120 Z"
//                                         fill="currentColor" opacity="0.6" />
//                                     <path d="M140 40 L180 20 L180 120 L140 120 Z"
//                                         fill="currentColor" opacity="0.4" />
//                                 </svg>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Optional: Additional contact info at bottom */}
//                 <div className="absolute bottom-8 left-16 text-xs text-gray-500">
//                     {freelancer?.email && <span>{freelancer.email}</span>}
//                     {freelancer?.phone && <span className="ml-4">{freelancer.phone}</span>}
//                     {freelancer?.website && <span className="ml-4">{freelancer.website}</span>}
//                 </div>
//             </div>

//             {/* Page 2: Greeting & Understanding */}
//             {/* <Section title="Greeting">{greeting}</Section>
//             <Section title="Project Understanding">{projectUnderstanding}</Section> */}

//             <div className="min-h-screen bg-gray-50 p-8">
//                 {/* Header */}
//                 <div className="flex justify-between items-start mb-12">
//                     <div className="text-sm font-medium text-gray-700">
//                         <div>{freelancer?.name}</div>
                       
//                     </div>
//                     <div className="text-lg font-bold text-gray-900 tracking-wide">
//                         PROJECT UNDERSTANDING
//                     </div>
//                 </div>

//                 {/* Main content area */}
//                 <div className="max-w-6xl mx-auto">
//                     {/* Large highlighted text block with integrated image */}
//                     <div className="relative">
//                         {/* Purple border frame */}
//                         <div className="border-4 border-purple-600 p-8 bg-white relative">
//                             <div className="flex">
//                                 {/* Left side - Main text */}
//                                 <div className="flex-1 pr-8">
//                                     <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-8">
//                                         <p>
//                                             {greeting || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
//                                         </p>
//                                     </h2>
//                                 </div>

//                                 {/* Right side - Integrated image */}
//                                 <div className="w-64 h-48 bg-gray-200 rounded-lg overflow-hidden shadow-lg">
//                                     {/* Placeholder for business meeting image */}
//                                     <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
//                                         <p>
//                                             {projectUnderstanding || "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Bottom text content */}
//                     {/* <div className="mt-12 max-w-md">
//                         <div className="text-sm text-gray-600 leading-relaxed space-y-4">
//                             <p>
//                                 {greeting || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
//                             </p>

//                             <p>
//                                 {projectUnderstanding || "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}
//                             </p>
//                         </div>
//                     </div> */}
//                 </div>
//             </div>

//             {/* Page 3: Objectives & Proposed Solutions */}
//             {/* <Section title="Objectives">{objectives}</Section>
//             <Section title="Proposed Solutions">{proposedSolutions}</Section> */}

//             <div className="min-h-screen bg-gray-50 p-8">
//                 {/* Header */}
//                 <div className="flex justify-between items-start mb-16">
//                     <div className="text-sm font-medium text-gray-700">
//                         <div>{freelancer?.name}</div>
                        
//                     </div>
//                     <div className="text-lg font-bold text-gray-900 tracking-wide">
//                         SOLUTION
//                     </div>
//                 </div>

//                 {/* Main content area */}
//                 <div className="max-w-5xl mx-auto">
                   

//                     {/* Bottom description text */}
//                     <div className="max-w-2xl">
//                         <p className="text-sm text-gray-600 leading-relaxed">
//                             {proposedSolutions || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             {/* Page 4: Timeline & Milestones */}
//             <Section title="Timeline">{timeline}</Section>
//             <Section title="Milestones">
//                 <ul className="list-disc list-inside text-gray-300">
//                     {milestones?.map((milestone, index) => (
//                         <li key={index}>{milestone}</li>
//                     ))}
//                 </ul>
//             </Section>

//             {/* Page 5: Budget & Technologies */}
//             <Section title="Budget">{budget}</Section>
//             <Section title="Technologies">
//                 <ul className="list-disc list-inside text-gray-300">
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

// export default DarkProposalTemplate;



// import React from 'react';

// const Section = ({ title, children, className = "" }) => (
//     <div className={`break-after-page py-12 px-8 ${className} bg-gray-900`}>
//         <h2 className="text-3xl font-bold border-b-2 border-blue-500 pb-4 mb-8 text-white">{title}</h2>
//         <div className="text-gray-300 space-y-4 text-lg leading-relaxed">
//             {children}
//         </div>
//     </div>
// );

// const DarkProposalTemplate = ({ proposal }) => {
//     const sampleProposal = {
//         client: {
//             name: "ABC Corporation",
//             email: "contact@abccorp.com",
//             company: "ABC Corporation"
//         },
//         freelancer: {
//             name: "Sarah Johnson",
//             title: "Senior Web Developer & UI/UX Designer",
//             email: "sarah@webstudio.com",
//             phone: "+1 (555) 123-4567",
//             website: "www.webstudio.com",
//             address: "123 Tech Street, San Francisco, CA 94105"
//         },
//         project: {
//             title: "E-Commerce Website Redesign & Development",
//             date: "March 2024"
//         },
//         greeting: "Dear ABC Corporation Team,\n\nThank you for considering our services for your e-commerce website redesign project. We are excited about the opportunity to work with your team and help transform your digital presence. This proposal outlines our understanding of your requirements and presents a comprehensive solution tailored to your business needs.",

//         projectUnderstanding: "Based on our initial discussions and requirements analysis, we understand that ABC Corporation is looking to:\n\n• Redesign and modernize the existing e-commerce platform\n• Improve user experience and conversion rates\n• Implement responsive design for mobile optimization\n• Integrate advanced payment processing systems\n• Enhance site performance and loading speeds\n• Implement SEO best practices\n• Create an intuitive admin dashboard for content management\n\nYour current platform faces challenges with outdated design, poor mobile experience, and limited scalability. Our solution will address these issues while positioning your business for future growth.",

//         objectives: "Our primary objectives for this project are:\n\n1. **Enhanced User Experience**: Create an intuitive, modern interface that guides users seamlessly through the purchasing process\n\n2. **Mobile-First Design**: Ensure optimal performance across all devices with responsive design principles\n\n3. **Performance Optimization**: Achieve loading times under 3 seconds and improve Core Web Vitals scores\n\n4. **Conversion Rate Improvement**: Implement proven UX patterns to increase conversion rates by at least 25%\n\n5. **Scalability**: Build a robust foundation that can handle increased traffic and product catalog expansion\n\n6. **SEO Enhancement**: Improve search engine visibility and organic traffic through technical and content optimization",

//         proposedSolutions: "Our comprehensive solution includes:\n\n**Phase 1: Discovery & Planning**\n• Detailed user research and competitor analysis\n• Information architecture and user journey mapping\n• Technical requirements documentation\n• Design system and brand guideline development\n\n**Phase 2: Design & Prototyping**\n• High-fidelity mockups for all key pages\n• Interactive prototypes for user testing\n• Mobile and desktop design variations\n• Accessibility compliance (WCAG 2.1 AA)\n\n**Phase 3: Development & Implementation**\n• Modern React.js frontend development\n• Node.js backend with secure API integration\n• Database optimization and migration\n• Payment gateway integration (Stripe, PayPal)\n• Advanced search and filtering functionality\n\n**Phase 4: Testing & Launch**\n• Comprehensive testing across devices and browsers\n• Performance optimization and security audits\n• Staff training and documentation\n• Smooth migration and go-live support",

//         timeline: "**Total Project Duration: 16 weeks**\n\n**Week 1-3: Discovery & Planning**\n• Stakeholder interviews and requirements gathering\n• User research and competitive analysis\n• Technical architecture planning\n\n**Week 4-7: Design Phase**\n• Wireframing and user flow creation\n• High-fidelity design mockups\n• Design system development\n• Client review and revisions\n\n**Week 8-13: Development Phase**\n• Frontend development and styling\n• Backend API development\n• Database setup and integration\n• Third-party service integrations\n\n**Week 14-16: Testing & Launch**\n• Quality assurance testing\n• Performance optimization\n• User acceptance testing\n• Go-live and post-launch support",

//         milestones: [
//             "Project kickoff and requirements finalization - Week 1",
//             "Wireframes and user flows approval - Week 4",
//             "Design mockups approval - Week 7",
//             "Frontend development completion - Week 11",
//             "Backend and integrations completion - Week 13",
//             "Testing and quality assurance completion - Week 15",
//             "Website launch and handover - Week 16"
//         ],

//         budget: "**Total Project Investment: $45,000**\n\n**Breakdown by Phase:**\n\n• Discovery & Planning: $8,000\n• Design & Prototyping: $12,000\n• Development & Implementation: $20,000\n• Testing & Launch: $5,000\n\n**What's Included:**\n• Complete website redesign and development\n• Mobile-responsive design\n• Content management system\n• SEO optimization\n• 3 months post-launch support\n• Training and documentation\n• Performance monitoring setup\n\n**Additional Services (Optional):**\n• Ongoing maintenance: $500/month\n• Content creation support: $150/hour\n• Additional integrations: Custom quote",

//         technologies: [
//             "Frontend: React.js, TypeScript, Tailwind CSS",
//             "Backend: Node.js, Express.js, MongoDB",
//             "Payment Processing: Stripe, PayPal",
//             "Hosting: AWS/Digital Ocean with CDN",
//             "Analytics: Google Analytics 4, Hotjar",
//             "SEO Tools: Schema markup, XML sitemaps",
//             "Development Tools: Git, Docker, CI/CD pipelines"
//         ],

//         paymentTerms: "**Payment Schedule:**\n\n• 30% deposit upon project approval ($13,500)\n• 40% at design approval milestone ($18,000)\n• 30% upon project completion ($13,500)\n\n**Payment Methods:**\nWe accept payments via bank transfer, check, or online payment platforms. All payments are due within 15 days of invoice receipt.\n\n**Terms:**\n• Late payments subject to 1.5% monthly service charge\n• Project timeline may be adjusted for payment delays\n• Final deliverables released upon full payment\n• Change requests outside scope will be quoted separately",

//         additionalNotes: "**Post-Launch Support:**\nWe provide 3 months of complimentary support including bug fixes, minor updates, and technical assistance. Our team will monitor site performance and provide monthly reports during this period.\n\n**Communication:**\nRegular progress updates will be provided via weekly status calls and a dedicated project management portal where you can track milestones, provide feedback, and access all project deliverables.\n\n**Intellectual Property:**\nUpon final payment, all custom code and designs become the property of ABC Corporation. We retain the right to showcase the project in our portfolio unless otherwise requested.\n\n**Quality Assurance:**\nWe guarantee our work and will address any issues that arise during the warranty period at no additional cost.",

//         closing: "We are confident that our proposed solution will exceed your expectations and deliver measurable results for your business. Our team brings over 8 years of combined experience in e-commerce development and has successfully launched 50+ websites for clients across various industries.\n\n**Next Steps:**\n\n1. Review this proposal and provide any feedback\n2. Schedule a follow-up call to discuss any questions\n3. Sign the project agreement and provide deposit\n4. Begin project kickoff within 5 business days\n\nWe look forward to partnering with ABC Corporation and helping you achieve your digital goals. Please don't hesitate to contact us with any questions or to discuss this proposal further.\n\nBest regards,\n\nSarah Johnson\nSenior Web Developer & UI/UX Designer\nWebStudio Solutions\nsarah@webstudio.com | +1 (555) 123-4567"
//     };

//     const data = proposal || sampleProposal;
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
//     } = data;

//     return (
//         <div className="w-[210mm] min-h-[297mm] mx-auto bg-gray-900 text-white shadow-2xl">

//             {/* Page 1: Professional Dark Cover Page */}
//             <div className="h-[297mm] relative bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
//                 {/* Geometric background pattern */}
//                 <div className="absolute inset-0 opacity-20">
//                     <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-blue-600/30 to-transparent"></div>
//                     <div className="absolute top-1/4 right-0 w-1/3 h-1/2 bg-blue-500/10 transform skew-y-12"></div>
//                     <div className="absolute bottom-0 left-1/4 w-1/2 h-1/3 bg-purple-600/10 transform -skew-x-12"></div>
//                 </div>

//                 {/* Header with studio info */}
//                 <div className="absolute top-8 right-8 text-right">
//                     <div className="flex items-center justify-end mb-2">
//                         <div className="w-8 h-8 mr-3 bg-blue-500 rounded-full flex items-center justify-center">
//                             <span className="text-white text-sm font-bold">WS</span>
//                         </div>
//                         <div>
//                             <div className="text-sm font-bold tracking-wider text-white">{freelancer.name}</div>
//                             <div className="text-xs text-gray-400">{freelancer.title}</div>
//                         </div>
//                     </div>
//                     <div className="text-xs text-gray-500 tracking-wider">
//                         {project.date?.toUpperCase() || 'MARCH 2024'}
//                     </div>
//                 </div>

//                 {/* Main content */}
//                 <div className="relative z-10 h-full flex flex-col justify-center px-12">
//                     <div className="mb-8">
//                         <h1 className="text-6xl font-bold text-white mb-4 leading-tight">PROJECT</h1>
//                         <h1 className="text-6xl font-bold text-blue-400 mb-8 leading-tight">PROPOSAL</h1>
//                         <div className="w-32 h-1 bg-blue-500 mb-8"></div>
//                     </div>

//                     <h2 className="text-3xl font-semibold text-gray-300 mb-16 max-w-2xl leading-relaxed">{project.title}</h2>

//                     <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 max-w-md border border-gray-700">
//                         <div className="mb-6">
//                             <p className="text-lg font-semibold text-gray-400 mb-2">Prepared for:</p>
//                             <p className="font-bold text-2xl text-white">{client.name}</p>
//                             <p className="text-gray-400">{client.email}</p>
//                         </div>

//                         <div>
//                             <p className="text-lg font-semibold text-gray-400 mb-2">Prepared by:</p>
//                             <p className="font-bold text-xl text-white">{freelancer.name}</p>
//                             <p className="text-gray-400">{freelancer.title}</p>
//                             <p className="text-blue-400">{freelancer.email}</p>
//                             <p className="text-gray-400">{freelancer.phone}</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Footer */}
//                 <div className="absolute bottom-8 left-12 text-gray-500 text-sm">
//                     <p>Confidential & Proprietary • {project.date || 'March 2024'}</p>
//                 </div>
//             </div>

//             {/* Page 2: Executive Summary - Dark */}
//             <div className="break-after-page py-12 px-8 bg-gray-800">
//                 <h2 className="text-3xl font-bold text-white mb-8">Executive Summary</h2>
//                 <div className="bg-gray-900/50 rounded-lg p-8 shadow-xl border border-gray-700">
//                     <div className="prose prose-lg max-w-none text-gray-300 leading-relaxed space-y-6">
//                         <p className="text-xl font-medium text-blue-400">Project Overview</p>
//                         <p>This proposal outlines a comprehensive solution for {client.name}'s digital transformation needs. Our approach combines strategic planning, innovative design, and robust development to deliver exceptional results.</p>

//                         <div className="grid md:grid-cols-3 gap-6 my-8">
//                             <div className="text-center p-4 bg-blue-900/30 rounded-lg border border-blue-800">
//                                 <div className="text-2xl font-bold text-blue-400">16</div>
//                                 <div className="text-gray-400">Weeks Timeline</div>
//                             </div>
//                             <div className="text-center p-4 bg-green-900/30 rounded-lg border border-green-800">
//                                 <div className="text-2xl font-bold text-green-400">$45K</div>
//                                 <div className="text-gray-400">Total Investment</div>
//                             </div>
//                             <div className="text-center p-4 bg-purple-900/30 rounded-lg border border-purple-800">
//                                 <div className="text-2xl font-bold text-purple-400">3</div>
//                                 <div className="text-gray-400">Months Support</div>
//                             </div>
//                         </div>

//                         <p>Our team brings proven expertise in modern web development, user experience design, and digital strategy to ensure your project's success.</p>
//                     </div>
//                 </div>
//             </div>

//             {/* Page 3: Project Understanding - Dark Modern Layout */}
//             <div className="break-after-page min-h-screen bg-gray-900 p-8">
//                 {/* Header */}
//                 <div className="flex justify-between items-start mb-12">
//                     <div className="text-sm font-medium text-gray-400">
//                         <div className="text-white">{freelancer.name}</div>
//                         <div>{freelancer.title}</div>
//                     </div>
//                     <div className="text-lg font-bold text-white tracking-wide">
//                         PROJECT UNDERSTANDING
//                     </div>
//                 </div>

//                 {/* Main content area */}
//                 <div className="max-w-6xl mx-auto">
//                     <div className="relative">
//                         {/* Blue accent border frame */}
//                         <div className="border-4 border-blue-500 p-8 bg-gray-800/50 relative backdrop-blur-sm">
//                             <div className="flex">
//                                 {/* Left side - Main text */}
//                                 <div className="flex-1 pr-8">
//                                     <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-8">
//                                         <div className="whitespace-pre-line">
//                                             {greeting || "We understand your vision and are committed to bringing it to life through innovative design and cutting-edge technology solutions."}
//                                         </div>
//                                     </h2>
//                                 </div>

//                                 {/* Right side - Content block */}
//                                 <div className="w-64 bg-gray-700/50 rounded-lg p-6 shadow-lg border border-gray-600">
//                                     <div className="text-gray-300 text-sm leading-relaxed">
//                                         <div className="whitespace-pre-line">
//                                             {projectUnderstanding || "Our analysis reveals key opportunities for transformation that will position your business for sustained growth and competitive advantage."}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Page 4: Greeting */}
//             <Section title="Introduction & Greeting">
//                 <div className="whitespace-pre-line">{greeting}</div>
//             </Section>

//             {/* Page 5: Project Understanding */}
//             <Section title="Detailed Project Understanding">
//                 <div className="whitespace-pre-line">{projectUnderstanding}</div>
//             </Section>

//             {/* Page 6: Objectives */}
//             <Section title="Project Objectives">
//                 <div className="whitespace-pre-line">{objectives}</div>
//             </Section>

//             {/* Page 7: Solution - Dark Modern Layout */}
//             <div className="break-after-page min-h-screen bg-gray-900 p-8">
//                 {/* Header */}
//                 <div className="flex justify-between items-start mb-16">
//                     <div className="text-sm font-medium text-gray-400">
//                         <div className="text-white">{freelancer.name}</div>
//                         <div>{freelancer.title}</div>
//                     </div>
//                     <div className="text-lg font-bold text-white tracking-wide">
//                         PROPOSED SOLUTION
//                     </div>
//                 </div>

//                 {/* Main content area */}
//                 <div className="max-w-5xl mx-auto">
//                     <div className="bg-gray-800/30 rounded-lg p-8 border border-gray-700">
//                         <div className="text-gray-300 leading-relaxed whitespace-pre-line">
//                             {proposedSolutions || "Our comprehensive solution leverages the latest technologies and industry best practices to deliver exceptional results that exceed expectations."}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Page 8: Timeline */}
//             <Section title="Project Timeline">
//                 <div className="whitespace-pre-line">{timeline}</div>
//             </Section>

//             {/* Page 9: Milestones - Dark */}
//             {/* <Section title="Key Milestones">
//                 <div className="space-y-3">
//                     {milestones?.map((milestone, index) => (
//                         <div key={index} className="flex items-start space-x-3 p-4 bg-gray-800/50 rounded-lg border-l-4 border-blue-500">
//                             <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
//                                 {index + 1}
//                             </div>
//                             <p className="text-gray-300">{milestone}</p>
//                         </div>
//                     ))}
//                 </div>
//             </Section> */}

//             {/* Page 10: Budget */}
//             <Section title="Investment & Budget">
//                 <div className="whitespace-pre-line">{budget}</div>
//             </Section>

//             {/* Page 11: Technologies - Dark */}
//             <Section title="Technologies & Tools">
//                 <div className="grid md:grid-cols-2 gap-4">
//                     {technologies?.map((tech, index) => (
//                         <div key={index} className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
//                             <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
//                             <p className="text-gray-300">{tech}</p>
//                         </div>
//                     ))}
//                 </div>
//             </Section>

//             {/* Page 12: Payment Terms */}
//             <Section title="Payment Terms & Conditions">
//                 <div className="whitespace-pre-line">{paymentTerms}</div>
//             </Section>

//             {/* Page 13: Additional Notes */}
//             <Section title="Additional Information">
//                 <div className="whitespace-pre-line">{additionalNotes}</div>
//             </Section>

//             {/* Page 14: Closing */}
//             <Section title="Next Steps & Closing" className="border-t-4 border-blue-500">
//                 <div className="whitespace-pre-line">{closing}</div>
//             </Section>

//             {/* Page 15: Contact & Footer - Dark */}
//             <div className="break-after-page py-12 px-8 bg-gradient-to-br from-gray-800 to-gray-900">
//                 <div className="text-center h-full flex flex-col justify-center">
//                     <h2 className="text-3xl font-bold text-white mb-8">Let's Get Started</h2>

//                     <div className="bg-gray-800/60 rounded-lg p-8 shadow-xl max-w-lg mx-auto border border-gray-700 backdrop-blur-sm">
//                         <div className="mb-6">
//                             <h3 className="text-xl font-semibold text-white mb-4">Contact Information</h3>
//                             <div className="space-y-2 text-gray-300">
//                                 <p><span className="font-medium text-gray-400">Email:</span> <span className="text-blue-400">{freelancer.email}</span></p>
//                                 <p><span className="font-medium text-gray-400">Phone:</span> {freelancer.phone}</p>
//                                 <p><span className="font-medium text-gray-400">Website:</span> <span className="text-blue-400">{freelancer.website}</span></p>
//                                 {freelancer.address && <p><span className="font-medium text-gray-400">Address:</span> {freelancer.address}</p>}
//                             </div>
//                         </div>

//                         <div className="border-t border-gray-600 pt-6">
//                             <p className="text-sm text-gray-400 mb-4">This proposal is valid for 30 days from the date of submission.</p>
//                             <p className="text-lg font-medium text-blue-400">We look forward to working with you!</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DarkProposalTemplate;


// import React from "react";

// const Section = ({ title, children, className = "" }) => (
//     <div
//         className={`break-after-page py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 ${className} bg-gray-900`}
//     >
//         <h2 className="text-2xl sm:text-3xl font-bold border-b-2 border-blue-500 pb-3 sm:pb-4 mb-6 sm:mb-8 text-white">
//             {title}
//         </h2>
//         <div className="text-gray-300 space-y-3 sm:space-y-4 text-base sm:text-lg leading-relaxed">
//             {children}
//         </div>
//     </div>
// );

// const DarkProposalTemplate = ({ proposal }) => {
//     const sampleProposal = {
//         client: { name: "ABC Corporation", email: "contact@abccorp.com" },
//         freelancer: {
//             name: "Sarah Johnson",
//             title: "Senior Web Developer & UI/UX Designer",
//             email: "sarah@webstudio.com",
//             phone: "+1 (555) 123-4567",
//             website: "www.webstudio.com",
//             address: "123 Tech Street, San Francisco, CA 94105",
//         },
//         project: { title: "E-Commerce Website Redesign & Development", date: "March 2024" },
//         greeting:
//             "Dear ABC Corporation Team,\n\nThank you for considering our services...",
//     };

//     const data = proposal || sampleProposal;
//     const { client, freelancer, project, greeting } = data;

//     return (
//         <div className="max-w-5xl w-full mx-auto bg-gray-900 text-white shadow-2xl overflow-hidden">
//             {/* Cover Page */}
//             <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden flex flex-col justify-center px-6 sm:px-12 py-12 sm:py-16">
//                 {/* Background accents */}
//                 <div className="absolute inset-0 opacity-20">
//                     <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-blue-600/30 to-transparent"></div>
//                     <div className="absolute top-1/4 right-0 w-1/3 h-1/2 bg-blue-500/10 transform skew-y-12"></div>
//                 </div>

//                 {/* Header */}
//                 <div className="absolute top-6 sm:top-8 right-6 sm:right-8 text-right">
//                     <div className="flex items-center justify-end mb-2">
//                         <div className="w-8 h-8 mr-3 bg-blue-500 rounded-full flex items-center justify-center">
//                             <span className="text-white text-sm font-bold">WS</span>
//                         </div>
//                         <div>
//                             <div className="text-sm font-bold text-white">{freelancer.name}</div>
//                             <div className="text-xs text-gray-400">{freelancer.title}</div>
//                         </div>
//                     </div>
//                     <div className="text-xs text-gray-500 tracking-wider">
//                         {project.date?.toUpperCase() || "MARCH 2024"}
//                     </div>
//                 </div>

//                 {/* Main */}
//                 <div className="relative z-10">
//                     <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-4 leading-tight">
//                         PROJECT
//                     </h1>
//                     <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-400 mb-6 sm:mb-8 leading-tight">
//                         PROPOSAL
//                     </h1>
//                     <div className="w-24 sm:w-32 h-1 bg-blue-500 mb-8"></div>

//                     <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-300 mb-10 sm:mb-16 leading-relaxed max-w-2xl">
//                         {project.title}
//                     </h2>

//                     <div className="bg-gray-800/50 rounded-lg p-6 sm:p-8 border border-gray-700 max-w-md">
//                         <div className="mb-6">
//                             <p className="text-lg font-semibold text-gray-400 mb-2">Prepared for:</p>
//                             <p className="font-bold text-2xl text-white">{client.name}</p>
//                             <p className="text-gray-400">{client.email}</p>
//                         </div>
//                         <div>
//                             <p className="text-lg font-semibold text-gray-400 mb-2">Prepared by:</p>
//                             <p className="font-bold text-xl text-white">{freelancer.name}</p>
//                             <p className="text-gray-400">{freelancer.title}</p>
//                             <p className="text-blue-400">{freelancer.email}</p>
//                             <p className="text-gray-400">{freelancer.phone}</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Footer */}
//                 <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-12 text-gray-500 text-xs sm:text-sm">
//                     <p>Confidential & Proprietary • {project.date || "March 2024"}</p>
//                 </div>
//             </div>

//             {/* Section Example */}
//             <Section title="Introduction & Greeting">
//                 <div className="whitespace-pre-line">{greeting}</div>
//             </Section>

//             {/* Footer Contact Section */}
//             <div className="py-10 sm:py-12 px-4 sm:px-8 bg-gradient-to-br from-gray-800 to-gray-900">
//                 <div className="text-center">
//                     <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">
//                         Let's Get Started
//                     </h2>
//                     <div className="bg-gray-800/60 rounded-lg p-6 sm:p-8 shadow-xl max-w-md mx-auto border border-gray-700">
//                         <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
//                             Contact Information
//                         </h3>
//                         <div className="space-y-2 text-gray-300 text-sm sm:text-base">
//                             <p>
//                                 <span className="font-medium text-gray-400">Email:</span>{" "}
//                                 <span className="text-blue-400">{freelancer.email}</span>
//                             </p>
//                             <p>
//                                 <span className="font-medium text-gray-400">Phone:</span> {freelancer.phone}
//                             </p>
//                             <p>
//                                 <span className="font-medium text-gray-400">Website:</span>{" "}
//                                 <span className="text-blue-400">{freelancer.website}</span>
//                             </p>
//                             {freelancer.address && (
//                                 <p>
//                                     <span className="font-medium text-gray-400">Address:</span>{" "}
//                                     {freelancer.address}
//                                 </p>
//                             )}
//                         </div>
//                         <div className="border-t border-gray-600 mt-6 pt-4">
//                             <p className="text-xs sm:text-sm text-gray-400 mb-2">
//                                 This proposal is valid for 30 days from submission.
//                             </p>
//                             <p className="text-base sm:text-lg font-medium text-blue-400">
//                                 We look forward to working with you!
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Print adjustments */}
//             <style jsx>{`
//         @media print {
//           .break-after-page {
//             page-break-after: always;
//           }
//         }
//       `}</style>
//         </div>
//     );
// };

// export default DarkProposalTemplate;


import React from 'react';

// Section component for consistent page structure
const Section = ({ title, children, className = "" }) => (
    // 'break-after-page' is key for print, 'py-8 md:py-12 px-4 md:px-8' for responsiveness
    <div className={`break-after-page py-8 md:py-12 px-4 md:px-8 ${className} bg-gray-900`}>
        <h2 className="text-2xl md:text-3xl font-bold border-b-2 border-blue-500 pb-4 mb-6 md:mb-8 text-white">{title}</h2>
        <div className="text-gray-300 space-y-4 text-base md:text-lg leading-relaxed">
            {children}
        </div>
    </div>
);

const DarkProposalTemplate = ({ proposal }) => {
    // Original sampleProposal data remains the same for brevity

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
        // Main wrapper: Fixed A4 width on large screens (for print), responsive max-width on smaller screens
        <div className="w-full lg:w-[210mm] lg:min-h-[297mm] mx-auto bg-gray-900 text-white shadow-2xl">

            {/* Page 1: Professional Dark Cover Page */}
            <div className="min-h-screen lg:h-[297mm] relative bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden p-8 lg:p-0">
                {/* Geometric background pattern - unchanged, it's relative to the parent div size */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-blue-600/30 to-transparent"></div>
                    <div className="absolute top-1/4 right-0 w-1/3 h-1/2 bg-blue-500/10 transform skew-y-12"></div>
                    <div className="absolute bottom-0 left-1/4 w-1/2 h-1/3 bg-purple-600/10 transform -skew-x-12"></div>
                </div>

                {/* Header with studio info */}
                {/* Responsive positioning and alignment */}
                <div className="relative z-10 pt-4 lg:absolute lg:top-8 lg:right-8 text-right">
                    <div className="flex items-center justify-start lg:justify-end mb-2">
                        <div className="w-8 h-8 mr-3 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">WS</span>
                        </div>
                        <div>
                            <div className="text-sm font-bold tracking-wider text-white">{freelancer.name}</div>
                            <div className="text-xs text-gray-400">{freelancer.title}</div>
                        </div>
                    </div>
                    <div className="text-xs text-gray-500 tracking-wider mt-2">
                        {project.date?.toUpperCase() || 'MARCH 2024'}
                    </div>
                </div>

                {/* Main content */}
                {/* Adjusted flex-col on small screens, px-4 for small screen padding */}
                <div className="relative z-10 h-full flex flex-col justify-start lg:justify-center px-4 lg:px-12 pt-20 lg:pt-0">
                    <div className="mb-8 mt-16 lg:mt-0">
                        {/* Smaller font sizes for mobile */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2 lg:mb-4 leading-tight">PROJECT</h1>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-400 mb-6 lg:mb-8 leading-tight">PROPOSAL</h1>
                        <div className="w-24 lg:w-32 h-1 bg-blue-500 mb-6 lg:mb-8"></div>
                    </div>

                    {/* Adjusted text size for responsiveness */}
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-300 mb-8 lg:mb-16 max-w-xl leading-relaxed">{project.title}</h2>

                    {/* Adjusted padding and max-width for responsiveness */}
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 lg:p-8 max-w-sm md:max-w-md border border-gray-700">
                        <div className="mb-6">
                            <p className="text-base font-semibold text-gray-400 mb-2">Prepared for:</p>
                            <p className="font-bold text-xl sm:text-2xl text-white">{client.name}</p>
                            <p className="text-gray-400">{client.email}</p>
                        </div>

                        <div>
                            <p className="text-base font-semibold text-gray-400 mb-2">Prepared by:</p>
                            <p className="font-bold text-lg sm:text-xl text-white">{freelancer.name}</p>
                            <p className="text-gray-400">{freelancer.title}</p>
                            <p className="text-blue-400">{freelancer.email}</p>
                            <p className="text-gray-400">{freelancer.phone}</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="relative z-10 mt-12 lg:absolute lg:bottom-8 lg:left-12 text-gray-500 text-xs lg:text-sm px-4 lg:px-0 pb-4 lg:pb-0">
                    <p>Confidential & Proprietary • {project.date || 'March 2024'}</p>
                </div>
            </div>

            {/* Page 2: Executive Summary - Dark */}
            <div className="break-after-page py-8 md:py-12 px-4 md:px-8 bg-gray-800">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8">Executive Summary</h2>
                <div className="bg-gray-900/50 rounded-lg p-6 md:p-8 shadow-xl border border-gray-700">
                    <div className="prose prose-lg max-w-none text-gray-300 leading-relaxed space-y-4 md:space-y-6">
                        <p className="text-lg md:text-xl font-medium text-blue-400">Project Overview</p>
                        <p>This proposal outlines a comprehensive solution for {client.name}'s digital transformation needs. Our approach combines strategic planning, innovative design, and robust development to deliver exceptional results.</p>

                        {/* Grid changes from md:grid-cols-3 to grid-cols-1 on mobile, then 3 on medium screens */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 my-6 md:my-8">
                            <div className="text-center p-4 bg-blue-900/30 rounded-lg border border-blue-800">
                                <div className="text-xl md:text-2xl font-bold text-blue-400">16</div>
                                <div className="text-sm md:text-base text-gray-400">Weeks Timeline</div>
                            </div>
                            <div className="text-center p-4 bg-green-900/30 rounded-lg border border-green-800">
                                <div className="text-xl md:text-2xl font-bold text-green-400">$45K</div>
                                <div className="text-sm md:text-base text-gray-400">Total Investment</div>
                            </div>
                            <div className="text-center p-4 bg-purple-900/30 rounded-lg border border-purple-800">
                                <div className="text-xl md:text-2xl font-bold text-purple-400">3</div>
                                <div className="text-sm md:text-base text-gray-400">Months Support</div>
                            </div>
                        </div>

                        <p>Our team brings proven expertise in modern web development, user experience design, and digital strategy to ensure your project's success.</p>
                    </div>
                </div>
            </div>

            {/* Page 3: Project Understanding - Dark Modern Layout */}
            <div className="break-after-page min-h-screen bg-gray-900 p-4 md:p-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-8 md:mb-12">
                    <div className="text-xs md:text-sm font-medium text-gray-400">
                        <div className="text-white">{freelancer.name}</div>
                        <div>{freelancer.title}</div>
                    </div>
                    <div className="text-base md:text-lg font-bold text-white tracking-wide">
                        PROJECT UNDERSTANDING
                    </div>
                </div>

                {/* Main content area */}
                <div className="max-w-6xl mx-auto">
                    <div className="relative">
                        {/* Blue accent border frame */}
                        <div className="border-4 border-blue-500 p-6 md:p-8 bg-gray-800/50 relative backdrop-blur-sm">
                            {/* Key change: flex-col on small screens, flex on large screens */}
                            <div className="flex flex-col lg:flex-row">
                                {/* Left side - Main text */}
                                {/* Added mb-6 on mobile, adjusted padding for mobile */}
                                <div className="flex-1 lg:pr-8 mb-6 lg:mb-0">
                                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                                        <div className="whitespace-pre-line">
                                            {greeting || "We understand your vision and are committed to bringing it to life through innovative design and cutting-edge technology solutions."}
                                        </div>
                                    </h2>
                                </div>

                                {/* Right side - Content block */}
                                {/* Changed fixed width to proportional width on mobile, max-w-full on mobile */}
                                <div className="w-full lg:w-64 bg-gray-700/50 rounded-lg p-6 shadow-lg border border-gray-600">
                                    <div className="text-gray-300 text-sm leading-relaxed">
                                        <div className="whitespace-pre-line">
                                            {projectUnderstanding || "Our analysis reveals key opportunities for transformation that will position your business for sustained growth and competitive advantage."}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Page 4: Greeting */}
            <Section title="Introduction & Greeting">
                <div className="whitespace-pre-line">{greeting}</div>
            </Section>

            {/* Page 5: Project Understanding */}
            <Section title="Detailed Project Understanding">
                <div className="whitespace-pre-line">{projectUnderstanding}</div>
            </Section>

            {/* Page 6: Objectives */}
            <Section title="Project Objectives">
                <div className="whitespace-pre-line">{objectives}</div>
            </Section>

            {/* Page 7: Solution - Dark Modern Layout */}
            <div className="break-after-page min-h-screen bg-gray-900 p-4 md:p-8">
                {/* Header - unchanged */}
                <div className="flex justify-between items-start mb-12 md:mb-16">
                    <div className="text-xs md:text-sm font-medium text-gray-400">
                        <div className="text-white">{freelancer.name}</div>
                        <div>{freelancer.title}</div>
                    </div>
                    <div className="text-base md:text-lg font-bold text-white tracking-wide">
                        PROPOSED SOLUTION
                    </div>
                </div>

                {/* Main content area */}
                <div className="max-w-5xl mx-auto">
                    <div className="bg-gray-800/30 rounded-lg p-6 md:p-8 border border-gray-700">
                        <div className="text-gray-300 leading-relaxed whitespace-pre-line text-base md:text-lg">
                            {proposedSolutions || "Our comprehensive solution leverages the latest technologies and industry best practices to deliver exceptional results that exceed expectations."}
                        </div>
                    </div>
                </div>
            </div>

            {/* Page 8: Timeline */}
            <Section title="Project Timeline">
                <div className="whitespace-pre-line">{timeline}</div>
            </Section>

            {/* Page 9: Milestones - Dark (Uncommented and made responsive) */}
            <Section title="Key Milestones">
                <div className="space-y-3">
                    {milestones?.map((milestone, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 md:p-4 bg-gray-800/50 rounded-lg border-l-4 border-blue-500">
                            <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold mt-0.5">
                                {index + 1}
                            </div>
                            <p className="text-gray-300 text-sm md:text-base">{milestone}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Page 10: Budget */}
            <Section title="Investment & Budget">
                <div className="whitespace-pre-line">{budget}</div>
            </Section>

            {/* Page 11: Technologies - Dark */}
            <Section title="Technologies & Tools">
                {/* Grid changed to 1 column on small screens, 2 on medium screens */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    {technologies?.map((tech, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 md:p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                            <div className="w-2 h-2 md:w-3 md:h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
                            <p className="text-gray-300 text-sm md:text-base">{tech}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Page 12: Payment Terms */}
            <Section title="Payment Terms & Conditions">
                <div className="whitespace-pre-line">{paymentTerms}</div>
            </Section>

            {/* Page 13: Additional Notes */}
            <Section title="Additional Information">
                <div className="whitespace-pre-line">{additionalNotes}</div>
            </Section>

            {/* Page 14: Closing */}
            <Section title="Next Steps & Closing" className="border-t-4 border-blue-500">
                <div className="whitespace-pre-line">{closing}</div>
            </Section>

            {/* Page 15: Contact & Footer - Dark */}
            <div className="break-after-page py-8 md:py-12 px-4 md:px-8 bg-gradient-to-br from-gray-800 to-gray-900">
                <div className="text-center h-full flex flex-col justify-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8">Let's Get Started</h2>

                    <div className="bg-gray-800/60 rounded-lg p-6 md:p-8 shadow-xl max-w-sm md:max-w-lg mx-auto border border-gray-700 backdrop-blur-sm">
                        <div className="mb-6">
                            <h3 className="text-lg md:text-xl font-semibold text-white mb-4">Contact Information</h3>
                            <div className="space-y-2 text-gray-300 text-sm md:text-base">
                                <p><span className="font-medium text-gray-400">Email:</span> <span className="text-blue-400">{freelancer.email}</span></p>
                                <p><span className="font-medium text-gray-400">Phone:</span> {freelancer.phone}</p>
                                <p><span className="font-medium text-gray-400">Website:</span> <span className="text-blue-400">{freelancer.website}</span></p>
                                {freelancer.address && <p><span className="font-medium text-gray-400">Address:</span> {freelancer.address}</p>}
                            </div>
                        </div>

                        <div className="border-t border-gray-600 pt-6">
                            <p className="text-xs md:text-sm text-gray-400 mb-4">This proposal is valid for 30 days from the date of submission.</p>
                            <p className="text-base md:text-lg font-medium text-blue-400">We look forward to working with you!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DarkProposalTemplate;