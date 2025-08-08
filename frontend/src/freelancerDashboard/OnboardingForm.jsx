// import React, { useState } from 'react';
// import axios from 'axios';
// import {  useNavigate } from 'react-router-dom';

// const skillsOptions = ['React', 'Node.js', 'MongoDB', 'Tailwind', 'UI/UX', 'Python'];
// const workTypes = ['Web Development', 'UI/UX Design', 'App Development', 'DevOps'];
// const heardFromOptions = ['Friend', 'Social Media', 'Google Search', 'College', 'Other'];

// export default function OnboardingForm() {
//     const [formData, setFormData] = useState({
//         bio: '',
//         skills: [],
//         typeOfWork: [],
//         workExperience: '',
//         city: '',
//         country: '',
//         heardUsFrom: '',
//         phone: '',
//         website: '',
//     });
//     const [profileImage, setProfileImage] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleCheckboxChange = (e, field) => {
//         const { value, checked } = e.target;
//         setFormData((prev) => {
//             const updated = checked
//                 ? [...prev[field], value]
//                 : prev[field].filter((item) => item !== value);
//             return { ...prev, [field]: updated };
//         });
//     };

//     const handleFileChange = (e) => {
//         setProfileImage(e.target.files[0]);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         const payload = new FormData();
//         if (profileImage) payload.append('profile', profileImage);
//         payload.append('bio', formData.bio);
//         payload.append('skills', JSON.stringify(formData.skills));
//         payload.append('typeOfWork', JSON.stringify(formData.typeOfWork));
//         payload.append('workExperience', formData.workExperience);
//         payload.append('phone', formData.phone);
//         payload.append('website', formData.website);
//         payload.append('location[city]', formData.city);
//         payload.append('location[country]', formData.country);
//         payload.append('heardUsFrom', formData.heardUsFrom);

//         try {
//             const token = localStorage.getItem('authToken'); // Ensure token is saved on login
//             const response = await axios.put(`${ import.meta.env.VITE_REACT_APP_BACKEND_BASEURL }/api/freelancer/onboard` , payload, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             alert('Profile updated successfully');
//             navigate('/dashboard'); // Redirect to dashboard after successful submission
            
//             console.log(response.data);
//         } catch (err) {
//             console.error(err);
//             alert('Failed to submit form');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg space-y-6 mt-10">
//             <h2 className="text-xl font-semibold text-gray-800">Complete Your Profile</h2>

//             {/* Profile Pic */}
//             <div>
//                 <label className="block font-medium text-gray-700 mb-1">Profile Picture</label>
//                 <input type="file" accept="image/*" onChange={handleFileChange} />
//             </div>

//             {/* Bio */}
//             <div>
//                 <label className="block font-medium text-gray-700 mb-1">Bio</label>
//                 <textarea
//                     name="bio"
//                     rows="3"
//                     value={formData.bio}
//                     onChange={handleChange}
//                     className="w-full border px-3 py-2 rounded-md focus:outline-none"
//                     placeholder="Write a short bio"
//                 ></textarea>
//             </div>

//             {/* Skills */}
//             <div>
//                 <label className="block font-medium text-gray-700 mb-1">Skills</label>
//                 <div className="flex flex-wrap gap-3">
//                     {skillsOptions.map((skill) => (
//                         <label key={skill} className="flex items-center gap-1">
//                             <input
//                                 type="checkbox"
//                                 value={skill}
//                                 checked={formData.skills.includes(skill)}
//                                 onChange={(e) => handleCheckboxChange(e, 'skills')}
//                             />
//                             {skill}
//                         </label>
//                     ))}
//                 </div>
//             </div>

//             {/* Type of Work */}
//             <div>
//                 <label className="block font-medium text-gray-700 mb-1">Type of Work</label>
//                 <div className="flex flex-wrap gap-3">
//                     {workTypes.map((work) => (
//                         <label key={work} className="flex items-center gap-1">
//                             <input
//                                 type="checkbox"
//                                 value={work}
//                                 checked={formData.typeOfWork.includes(work)}
//                                 onChange={(e) => handleCheckboxChange(e, 'typeOfWork')}
//                             />
//                             {work}
//                         </label>
//                     ))}
//                 </div>
//             </div>

//             {/* Experience */}
//             <div>
//                 <label className="block font-medium text-gray-700 mb-1">Work Experience</label>
//                 <input
//                     type="text"
//                     name="workExperience"
//                     value={formData.workExperience}
//                     onChange={handleChange}
//                     className="w-full border px-3 py-2 rounded-md focus:outline-none"
//                     placeholder="e.g., 3+ years freelance dev"
//                 />
//             </div>
//             {/* Phone Number */}
//             <div>
//                 <label className="block font-medium text-gray-700 mb-1">Phone Number</label>
//                 <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     required
//                     className="w-full border px-3 py-2 rounded-md focus:outline-none"
//                     placeholder="Enter your phone number"
//                 />
//             </div>

//             {/* Website */}
//             <div>
//                 <label className="block font-medium text-gray-700 mb-1">Website (Optional)</label>
//                 <input
//                     type="url"
//                     name="website"
//                     value={formData.website}
//                     onChange={handleChange}
//                     className="w-full border px-3 py-2 rounded-md focus:outline-none"
//                     placeholder="https://yourwebsite.com"
//                 />
//             </div>


//             {/* Location */}
//             <div className="flex gap-4">
//                 <div className="flex-1">
//                     <label className="block font-medium text-gray-700 mb-1">City</label>
//                     <input
//                         type="text"
//                         name="city"
//                         value={formData.city}
//                         onChange={handleChange}
//                         className="w-full border px-3 py-2 rounded-md focus:outline-none"
//                     />
//                 </div>
//                 <div className="flex-1">
//                     <label className="block font-medium text-gray-700 mb-1">Country</label>
//                     <input
//                         type="text"
//                         name="country"
//                         value={formData.country}
//                         onChange={handleChange}
//                         className="w-full border px-3 py-2 rounded-md focus:outline-none"
//                     />
//                 </div>
//             </div>

//             {/* Heard From */}
//             <div>
//                 <label className="block font-medium text-gray-700 mb-1">How did you hear about us?</label>
//                 <select
//                     name="heardUsFrom"
//                     value={formData.heardUsFrom}
//                     onChange={handleChange}
//                     className="w-full border px-3 py-2 rounded-md focus:outline-none"
//                 >
//                     <option value="">Select</option>
//                     {heardFromOptions.map((option) => (
//                         <option key={option}>{option}</option>
//                     ))}
//                 </select>
//             </div>

//             <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
//             >
//                 {loading ? 'Submitting...' : 'Submit'}
//             </button>
//         </form>
//     );
// }

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const skillsOptions = ['React', 'Node.js', 'MongoDB', 'Tailwind', 'UI/UX', 'Python'];
const workTypes = ['Web Development', 'UI/UX Design', 'App Development', 'DevOps'];
const heardFromOptions = ['Friend', 'Social Media', 'Google Search', 'College', 'Other'];

export default function OnboardingForm() {
    const [formData, setFormData] = useState({
        bio: '',
        skills: [],
        typeOfWork: [],
        workExperience: '',
        city: '',
        country: '',
        heardUsFrom: '',
        phone: '',
        website: '',
    });
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e, field) => {
        const { value, checked } = e.target;
        setFormData((prev) => {
            const updated = checked
                ? [...prev[field], value]
                : prev[field].filter((item) => item !== value);
            return { ...prev, [field]: updated };
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);

        // Create preview URL
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = new FormData();
        if (profileImage) payload.append('profile', profileImage);
        payload.append('bio', formData.bio);
        payload.append('skills', JSON.stringify(formData.skills));
        payload.append('typeOfWork', JSON.stringify(formData.typeOfWork));
        payload.append('workExperience', formData.workExperience);
        payload.append('phone', formData.phone);
        payload.append('website', formData.website);
        payload.append('location[city]', formData.city);
        payload.append('location[country]', formData.country);
        payload.append('heardUsFrom', formData.heardUsFrom);

        try {
            const token = localStorage.getItem('authToken');

            const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/freelancer/onboard`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: payload,
            });
            
            if (!response.ok) {
                throw new Error('Failed to submit form');
            }
            
            const data = await response.json();
            

 

            alert('Profile updated successfully');
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert('Failed to submit form');
        } finally {
            setLoading(false);
        }
    };

    const nextStep = () => {
        if (currentStep < 3) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const isStepValid = () => {
        switch (currentStep) {
            case 1:
                return formData.bio.trim() && formData.skills.length > 0;
            case 2:
                return formData.typeOfWork.length > 0 && formData.workExperience.trim() && formData.phone.trim();
            case 3:
                return formData.city.trim() && formData.country.trim() && formData.heardUsFrom;
            default:
                return false;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 animate-fade-in">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                        Create <span className="text-purple-600">Professional</span> Profile
                    </h1>
                    <p className="text-gray-600 text-base sm:text-lg">Complete your profile to get started</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8 animate-slide-in-down">
                    <div className="flex items-center justify-between mb-4">
                        {[1, 2, 3].map((step) => (
                            <div
                                key={step}
                                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${step <= currentStep
                                        ? 'bg-purple-600 border-purple-600 text-white'
                                        : 'border-gray-300 text-gray-400'
                                    }`}
                            >
                                {step}
                            </div>
                        ))}
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-500 ease-out"
                            style={{ width: `${(currentStep / 3) * 100}%` }}
                        ></div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-2xl overflow-hidden">
                    <div className="p-6 sm:p-8 lg:p-10">
                        {/* Step 1: Basic Info */}
                        {currentStep === 1 && (
                            <div className="space-y-6 animate-fade-in">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-purple-600 font-bold">1</span>
                                    </div>
                                    Basic Information
                                </h2>

                                {/* Profile Picture */}
                                <div className="flex flex-col items-center space-y-4">
                                    <div className="relative group">
                                        {imagePreview ? (
                                            <img
                                                src={imagePreview}
                                                alt="Profile preview"
                                                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-purple-200 transition-transform duration-300 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 border-4 border-purple-200 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                                                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                                </svg>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <span className="text-white text-sm font-medium">Change</span>
                                        </div>
                                    </div>
                                    <label className="cursor-pointer">
                                        <span className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 inline-block">
                                            Choose Profile Picture
                                        </span>
                                        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                                    </label>
                                </div>

                                {/* Bio */}
                                <div className="space-y-2">
                                    <label className="block font-medium text-gray-700">Bio *</label>
                                    <textarea
                                        name="bio"
                                        rows="4"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 resize-none"
                                        placeholder="Write a compelling bio that showcases your expertise..."
                                    ></textarea>
                                </div>

                                {/* Skills */}
                                <div className="space-y-3">
                                    <label className="block font-medium text-gray-700">Skills *</label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {skillsOptions.map((skill) => (
                                            <label key={skill} className="flex items-center group cursor-pointer">
                                                <div className="relative">
                                                    <input
                                                        type="checkbox"
                                                        value={skill}
                                                        checked={formData.skills.includes(skill)}
                                                        onChange={(e) => handleCheckboxChange(e, 'skills')}
                                                        className="sr-only"
                                                    />
                                                    <div className={`w-5 h-5 border-2 rounded transition-all duration-300 ${formData.skills.includes(skill)
                                                            ? 'bg-purple-600 border-purple-600'
                                                            : 'border-gray-300 group-hover:border-purple-400'
                                                        }`}>
                                                        {formData.skills.includes(skill) && (
                                                            <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                                            </svg>
                                                        )}
                                                    </div>
                                                </div>
                                                <span className={`ml-3 transition-colors duration-300 ${formData.skills.includes(skill) ? 'text-purple-700 font-medium' : 'text-gray-700'
                                                    }`}>
                                                    {skill}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Work Information */}
                        {currentStep === 2 && (
                            <div className="space-y-6 animate-fade-in">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-purple-600 font-bold">2</span>
                                    </div>
                                    Work Information
                                </h2>

                                {/* Type of Work */}
                                <div className="space-y-3">
                                    <label className="block font-medium text-gray-700">Type of Work *</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {workTypes.map((work) => (
                                            <label key={work} className="flex items-center group cursor-pointer p-3 border-2 border-gray-200 rounded-lg hover:border-purple-300 transition-all duration-300">
                                                <div className="relative">
                                                    <input
                                                        type="checkbox"
                                                        value={work}
                                                        checked={formData.typeOfWork.includes(work)}
                                                        onChange={(e) => handleCheckboxChange(e, 'typeOfWork')}
                                                        className="sr-only"
                                                    />
                                                    <div className={`w-5 h-5 border-2 rounded transition-all duration-300 ${formData.typeOfWork.includes(work)
                                                            ? 'bg-purple-600 border-purple-600'
                                                            : 'border-gray-300 group-hover:border-purple-400'
                                                        }`}>
                                                        {formData.typeOfWork.includes(work) && (
                                                            <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                                            </svg>
                                                        )}
                                                    </div>
                                                </div>
                                                <span className={`ml-3 transition-colors duration-300 ${formData.typeOfWork.includes(work) ? 'text-purple-700 font-medium' : 'text-gray-700'
                                                    }`}>
                                                    {work}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Experience & Phone */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block font-medium text-gray-700">Work Experience *</label>
                                        <input
                                            type="text"
                                            name="workExperience"
                                            value={formData.workExperience}
                                            onChange={handleChange}
                                            className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                                            placeholder="e.g., 3+ years freelance developer"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block font-medium text-gray-700">Phone Number *</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                                            placeholder="Enter your phone number"
                                        />
                                    </div>
                                </div>

                                {/* Website */}
                                <div className="space-y-2">
                                    <label className="block font-medium text-gray-700">Website (Optional)</label>
                                    <input
                                        type="url"
                                        name="website"
                                        value={formData.website}
                                        onChange={handleChange}
                                        className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                                        placeholder="https://yourwebsite.com"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 3: Location & Final Details */}
                        {currentStep === 3 && (
                            <div className="space-y-6 animate-fade-in">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-purple-600 font-bold">3</span>
                                    </div>
                                    Location & Details
                                </h2>

                                {/* Location */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block font-medium text-gray-700">City *</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                                            placeholder="Enter your city"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block font-medium text-gray-700">Country *</label>
                                        <input
                                            type="text"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleChange}
                                            className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                                            placeholder="Enter your country"
                                        />
                                    </div>
                                </div>

                                {/* Heard From */}
                                <div className="space-y-2">
                                    <label className="block font-medium text-gray-700">How did you hear about us? *</label>
                                    <select
                                        name="heardUsFrom"
                                        value={formData.heardUsFrom}
                                        onChange={handleChange}
                                        className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white"
                                    >
                                        <option value="">Select an option</option>
                                        {heardFromOptions.map((option) => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={prevStep}
                                disabled={currentStep === 1}
                                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${currentStep === 1
                                        ? 'text-gray-400 cursor-not-allowed'
                                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                                    }`}
                            >
                                Previous
                            </button>

                            {currentStep < 3 ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    disabled={!isStepValid()}
                                    className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${isStepValid()
                                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    Next Step
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={loading || !isStepValid()}
                                    className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${loading || !isStepValid()
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                                        }`}
                                >
                                    {loading ? (
                                        <div className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Submitting...
                                        </div>
                                    ) : (
                                        'Complete Profile'
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes slide-in-down {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out;
                }
                
                .animate-slide-in-down {
                    animation: slide-in-down 0.6s ease-out;
                }
            `}</style>
        </div>
    );
}