// import { useState } from "react";

// const skillsOptions = [
//     // Development
//     "Frontend Development",
//     "Backend Development",
//     "Full Stack Development",
//     "Mobile App Development",
//     "Game Development",
//     "Web Design & Development",
//     "Blockchain Development",
//     "E-commerce Development",
//     "WordPress Development",

//     // Design & Creative
//     "UI/UX Design",
//     "Graphic Designing",
//     "Logo & Brand Identity Design",
//     "Illustration",
//     "3D Modeling & Rendering",
//     "Animation & Motion Graphics",
//     "Video Editing",
//     "Photography & Photo Editing",

//     // Writing & Content
//     "Content Writing",
//     "Copywriting",
//     "Technical Writing",
//     "Script Writing",
//     "Ghostwriting",
//     "Translation & Transcription",
//     "Proofreading & Editing",

//     // Marketing & Sales
//     "SEO (Search Engine Optimization)",
//     "Social Media Marketing",
//     "Email Marketing",
//     "Paid Ads (Google/Facebook/Instagram)",
//     "Affiliate Marketing",
//     "Lead Generation",
//     "Brand Strategy",

//     // Data & AI
//     "Data Entry",
//     "Data Analysis",
//     "Data Science",
//     "Machine Learning",
//     "Artificial Intelligence (AI)",
//     "Chatbot Development",
//     "Natural Language Processing (NLP)",

//     // Tech & IT
//     "DevOps & Cloud Engineering",
//     "Cybersecurity",
//     "Database Management",
//     "Systems Administration",
//     "IT Support",
//     "QA Testing & Automation",

//     // Business & Management
//     "Project Management",
//     "Virtual Assistance",
//     "Customer Support",
//     "Business Consulting",
//     "Financial Consulting",
//     "HR & Recruitment",

//     // Other Freelance Services
//     "Music & Audio Production",
//     "Voice Over",
//     "Podcast Editing",
//     "Event Planning",
//     "Online Tutoring & Coaching"
// ];


// export default function SkillsDropdown({ formData, setFormData }) {
//     const [isOpen, setIsOpen] = useState(false);
//     const [searchTerm, setSearchTerm] = useState("");

//     const toggleDropdown = () => setIsOpen((prev) => !prev);

//     const handleSelect = (skill) => {
//         setFormData((prev) => {
//             const updatedSkills = prev.skills.includes(skill)
//                 ? prev.skills.filter((s) => s !== skill)
//                 : [...prev.skills, skill];
//             return { ...prev, skills: updatedSkills };
//         });
//     };

//     const filteredOptions = skillsOptions.filter((skill) =>
//         skill.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <div className="space-y-3">
//             <label className="block font-medium text-gray-700">Skills *</label>

//             {/* Selected skills display */}
//             <div
//                 className="border border-gray-300 rounded px-3 py-2 flex flex-wrap gap-2 cursor-pointer"
//                 onClick={toggleDropdown}
//             >
//                 {formData.skills.length > 0 ? (
//                     formData.skills.map((skill) => (
//                         <span
//                             key={skill}
//                             className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm flex items-center gap-1"
//                         >
//                             {skill}
//                             <button
//                                 type="button"
//                                 onClick={(e) => {
//                                     e.stopPropagation();
//                                     handleSelect(skill);
//                                 }}
//                                 className="text-purple-500 hover:text-purple-700"
//                             >
//                                 ✕
//                             </button>
//                         </span>
//                     ))
//                 ) : (
//                     <span className="text-gray-400">Select skills...</span>
//                 )}
//             </div>

//             {/* Dropdown */}
//             {isOpen && (
//                 <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded shadow-lg z-10">
//                     <input
//                         type="text"
//                         placeholder="Search..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         className="w-full border-b px-3 py-2 outline-none"
//                     />
//                     <div className="max-h-48 overflow-y-auto">
//                         {filteredOptions.map((skill) => (
//                             <label
//                                 key={skill}
//                                 className="flex items-center px-3 py-2 hover:bg-purple-50 cursor-pointer"
//                             >
//                                 <input
//                                     type="checkbox"
//                                     checked={formData.skills.includes(skill)}
//                                     onChange={() => handleSelect(skill)}
//                                     className="mr-2"
//                                 />
//                                 {skill}
//                             </label>
//                         ))}
//                         {filteredOptions.length === 0 && (
//                             <p className="px-3 py-2 text-gray-500 text-sm">No skills found</p>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }
import { useState } from "react";

const skillsOptions = [
    // Development
    "Frontend Development",
    "Backend Development",
    "Full Stack Development",
    "Mobile App Development",
    "Game Development",
    "Web Design & Development",
    "Blockchain Development",
    "E-commerce Development",
    "WordPress Development",

    // Design & Creative
    "UI/UX Design",
    "Graphic Designing",
    "Logo & Brand Identity Design",
    "Illustration",
    "3D Modeling & Rendering",
    "Animation & Motion Graphics",
    "Video Editing",
    "Photography & Photo Editing",

    // Writing & Content
    "Content Writing",
    "Copywriting",
    "Technical Writing",
    "Script Writing",
    "Ghostwriting",
    "Translation & Transcription",
    "Proofreading & Editing",

    // Marketing & Sales
    "SEO (Search Engine Optimization)",
    "Social Media Marketing",
    "Email Marketing",
    "Paid Ads (Google/Facebook/Instagram)",
    "Affiliate Marketing",
    "Lead Generation",
    "Brand Strategy",

    // Data & AI
    "Data Entry",
    "Data Analysis",
    "Data Science",
    "Machine Learning",
    "Artificial Intelligence (AI)",
    "Chatbot Development",
    "Natural Language Processing (NLP)",

    // Tech & IT
    "DevOps & Cloud Engineering",
    "Cybersecurity",
    "Database Management",
    "Systems Administration",
    "IT Support",
    "QA Testing & Automation",

    // Business & Management
    "Project Management",
    "Virtual Assistance",
    "Customer Support",
    "Business Consulting",
    "Financial Consulting",
    "HR & Recruitment",

    // Other Freelance Services
    "Music & Audio Production",
    "Voice Over",
    "Podcast Editing",
    "Event Planning",
    "Online Tutoring & Coaching"
];

export default function SkillsDropdown({ formData, setFormData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleSelect = (skill) => {
        setFormData((prev) => {
            const updatedSkills = prev.skills.includes(skill)
                ? prev.skills.filter((s) => s !== skill)
                : [...prev.skills, skill];
            return { ...prev, skills: updatedSkills };
        });
    };

    const filteredOptions = skillsOptions.filter((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-3 relative">
            <label className="block font-medium text-gray-700">Skills *</label>

            {/* Selected skills display */}
            <div
                className="border border-gray-300 rounded px-3 py-2 flex flex-wrap gap-2 cursor-pointer"
                onClick={toggleDropdown}
            >
                {formData.skills.length > 0 ? (
                    formData.skills.map((skill) => (
                        <span
                            key={skill}
                            className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm flex items-center gap-1"
                        >
                            {skill}
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelect(skill);
                                }}
                                className="text-purple-500 hover:text-purple-700"
                            >
                                ✕
                            </button>
                        </span>
                    ))
                ) : (
                    <span className="text-gray-400">Select skills...</span>
                )}
            </div>

            {/* Dropdown */}
            {/* {isOpen && (
                <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full border-b px-3 py-2 outline-none"
                    />
                    <div className="max-h-48 overflow-y-auto">
                        {filteredOptions.map((skill) => (
                            <label
                                key={skill}
                                className="flex items-center px-3 py-2 hover:bg-purple-50 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={formData.skills.includes(skill)}
                                    onChange={() => handleSelect(skill)}
                                    className="mr-2"
                                />
                                {skill}
                            </label>
                        ))}
                        {filteredOptions.length === 0 && (
                            <p className="px-3 py-2 text-gray-500 text-sm">
                                No skills found
                            </p>
                        )}
                    </div>
                    
                    <div className="border-t p-2 text-right">
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 text-sm"
                        >
                            Done
                        </button>
                    </div>
                </div>
            )} */}
            {isOpen && (
                <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10">
                    {/* Search + Close Row */}
                    <div className="flex items-center border-b">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1 px-3 py-2 outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="px-3 text-gray-500 hover:text-gray-700 text-lg cursor-pointer"
                            title="Close"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Skills list */}
                    <div className="max-h-48 overflow-y-auto">
                        {filteredOptions.map((skill) => (
                            <label
                                key={skill}
                                className="flex items-center px-3 py-2 hover:bg-purple-50 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={formData.skills.includes(skill)}
                                    onChange={() => handleSelect(skill)}
                                    className="mr-2"
                                />
                                {skill}
                            </label>
                        ))}
                        {filteredOptions.length === 0 && (
                            <p className="px-3 py-2 text-gray-500 text-sm">
                                No skills found
                            </p>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
}
