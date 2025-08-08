// components/templates/MinimalPortfolio.jsx
// export const MinimalPortfolio = ({ data }) => {
//     return (
//         <div className="min-h-screen bg-white p-8 text-gray-800 font-sans">
//             <img src={data.avatar} alt="avatar" className="w-24 h-24 rounded-full" />
//             <h1 className="text-4xl font-bold mt-4">{data.name}</h1>
//             <p className="text-lg">{data.bio}</p>
//             <h2 className="mt-6 text-2xl font-semibold">Skills</h2>
//             <ul className="list-disc ml-6">
//                 {data.skills.map((skill) => <li key={skill}>{skill}</li>)}
//             </ul>
//         </div>
//     );
// };


// pages/PortfolioPage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const MinimalPortfolio = ({data}) => {

    const [formData, setFormData] = useState({
        clientName: '',
        clientEmail: '',
        meetingDate: '',
        startTime: '',
        endTime: '',
        notes: '',
    });
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);


    if (!data) return <div className="p-8">Loading...</div>;
    const { profile, projects, testimonials, clients } = data;

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMsg('');
        setErrorMsg('');

        try {
            await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/meetings/request`, {
                freelancerId: profile._id,
                ...formData
            });

            setSuccessMsg("Meeting request submitted successfully. You'll receive an email if accepted.");
            setFormData({
                clientName: '',
                clientEmail: '',
                meetingDate: '',
                startTime: '',
                endTime: '',
                notes: '',
            });
        } catch (err) {
            setErrorMsg('Failed to submit meeting request. Please try again later.');
        }

        setLoading(false);
    };

    return (
        <div className="max-w-6xl mx-auto p-8 space-y-12">
            {/* Header */}
            <div className="flex items-center gap-6">
                <img src={profile.profile} alt="Profile" className="w-28 h-28 rounded-full object-cover" />
                <div>
                    <h1 className="text-3xl font-bold">{profile.name}</h1>
                    <p className="text-gray-600">{profile.location?.city}, {profile.location?.country}</p>
                    <p className="mt-2 text-gray-700">{profile.bio}</p>
                </div>
            </div>

            {/* Skills */}
            <div>
                <h2 className="text-xl font-semibold mb-2">Skills</h2>
                <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, i) => (
                        <span key={i} className="bg-gray-100 px-3 py-1 rounded-full">{skill}</span>
                    ))}
                </div>
            </div>

            {/* Projects */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map(project => (
                        <div key={project._id} className="p-4 border rounded-lg shadow">
                            {project.image?.url && (
                                <img src={project.image.url} alt="Project" className="w-full h-48 object-cover mb-4 rounded" />
                            )}
                            <h3 className="text-lg font-bold">{project.title}</h3>
                            <p className="text-gray-600">{project.description}</p>
                            <div className="mt-2 text-sm text-blue-600">
                                {project.technologies.join(', ')}
                            </div>
                            {project.link && <a href={project.link} className="text-blue-500 underline text-sm">Live Demo</a>}
                            {project.githubUrl && <a href={project.githubUrl} className="text-blue-500 ml-2 underline text-sm">GitHub</a>}
                        </div>
                    ))}
                </div>
            </div>

            {/* Testimonials */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Testimonials</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map(t => (
                        <div key={t._id} className="p-4 border rounded-lg bg-gray-50">
                            <div className="flex items-center gap-4 mb-2">
                                <img src={t.clientPhoto?.url} alt={t.clientName} className="w-12 h-12 rounded-full" />
                                <div>
                                    <p className="font-semibold">{t.clientName}</p>
                                    <p className="text-xs text-gray-600">{t.clientRole} at {t.clientCompany}</p>
                                </div>
                            </div>
                            <p className="text-gray-700 italic">“{t.feedback}”</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Client Work Summary */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Client Work Summary</h2>
                {clients.map((client, idx) => (
                    <div key={idx} className="mb-6 border-b pb-4">
                        <h3 className="font-bold text-lg">{client.name} ({client.company})</h3>
                        <ul className="ml-4 list-disc text-gray-700 mt-2">
                            {client.works.map((work, i) => (
                                <li key={i}>
                                    <span className="font-medium">{work.fieldOfWork}</span> – {work.workDescription} <br />
                                    <span className="text-sm text-gray-500">
                                        ₹{work.cost} | {new Date(work.startDate).toLocaleDateString()} - {new Date(work.endDate).toLocaleDateString()}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Meeting Request Form */}
            <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Set a Meeting</h2>
                {successMsg && <p className="text-green-600 mb-2">{successMsg}</p>}
                {errorMsg && <p className="text-red-600 mb-2">{errorMsg}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="clientName" value={formData.clientName} onChange={handleChange}
                        placeholder="Your Name" required className="w-full border px-3 py-2 rounded" />
                    <input type="email" name="clientEmail" value={formData.clientEmail} onChange={handleChange}
                        placeholder="Your Email" required className="w-full border px-3 py-2 rounded" />
                    <input type="date" name="meetingDate" value={formData.meetingDate} onChange={handleChange}
                        required className="w-full border px-3 py-2 rounded" />
                    <div className="flex gap-4">
                        <input type="time" name="startTime" value={formData.startTime} onChange={handleChange}
                            required className="w-full border px-3 py-2 rounded" />
                        <input type="time" name="endTime" value={formData.endTime} onChange={handleChange}
                            required className="w-full border px-3 py-2 rounded" />
                    </div>
                    <textarea name="notes" value={formData.notes} onChange={handleChange}
                        placeholder="Any notes..." className="w-full border px-3 py-2 rounded" rows={3} />
                    <button type="submit" disabled={loading}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        {loading ? "Submitting..." : "Submit Request"}
                    </button>
                </form>
            </div>
        </div>
    );
};


