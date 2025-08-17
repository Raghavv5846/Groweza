// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const ProposalManagement = () => {
//   const [isNewClient, setIsNewClient] = useState(null);
//   const [clients, setClients] = useState([]);
//   const [formData, setFormData] = useState({
//     clientEmail: '',
//     clientName: '',
//     projectTitle: '',
//     projectDescription: '',
//     customNotes: '',
//     document: null,
//   });
//   const [preview, setPreview] = useState('');
//   const token = localStorage.getItem('authToken');

//   useEffect(() => {
//     if (isNewClient === false) {
//       axios
//         .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/clients`, {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         .then((res) => setClients(res.data))
//         .catch(() => toast.error('Failed to load clients'));
//     }
//   }, [isNewClient]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'document') {
//       setFormData({ ...formData, document: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleGenerate = async () => {
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/proposal/generate`,
//         {
//           projectTitle: formData.projectTitle,
//           projectDescription: formData.projectDescription,
//           clientName: formData.clientName,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setPreview(res.data.generatedProposal);
//     } catch (err) {
//       toast.error('Failed to generate proposal');
//     }
//   };

//   const handleSubmit = async () => {
//     const data = new FormData();
//     for (const key in formData) {
//       if (formData[key]) data.append(key, formData[key]);
//     }

//     try {
//       await axios.post(
//         `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/proposal`,
//         data,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );
//       toast.success('Proposal submitted');
//     } catch (err) {
//       toast.error('Submission failed');
//     }
//   };

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
//       <div>
//         <h2 className="text-xl font-semibold mb-4">Create Proposal</h2>

//         {isNewClient === null && (
//           <div className="mb-4">
//             <button
//               onClick={() => setIsNewClient(false)}
//               className="mr-4 px-4 py-2 bg-blue-600 text-white rounded"
//             >
//               Existing Client
//             </button>
//             <button
//               onClick={() => setIsNewClient(true)}
//               className="px-4 py-2 bg-green-600 text-white rounded"
//             >
//               New Client
//             </button>
//           </div>
//         )}

//         {isNewClient !== null && (
//           <div className="space-y-4">
//             {!isNewClient && (
//               <select
//                 className="w-full border rounded p-2"
//                 onChange={(e) => {
//                   const selected = clients.find(c => c._id === e.target.value);
//                   setFormData({
//                     ...formData,
//                     clientEmail: selected.email,
//                     clientName: selected.name,
//                   });
//                 }}
//               >
//                 <option value="">Select Client</option>
//                 {clients.map(client => (
//                   <option key={client._id} value={client._id}>
//                     {client.name} ({client.email})
//                   </option>
//                 ))}
//               </select>

              
//             )}

//             {isNewClient && (
//               <>
//                 <input
//                   type="text"
//                   name="clientName"
//                   placeholder="Client Name"
//                   className="w-full border rounded p-2"
//                   onChange={handleChange}
//                 />
//                 <input
//                   type="email"
//                   name="clientEmail"
//                   placeholder="Client Email"
//                   className="w-full border rounded p-2"
//                   onChange={handleChange}
//                 />
//               </>
//             )}

//             <input
//               type="text"
//               name="projectTitle"
//               placeholder="Project Title"
//               className="w-full border rounded p-2"
//               onChange={handleChange}
//             />
//             <textarea
//               name="projectDescription"
//               placeholder="Project Description"
//               className="w-full border rounded p-2"
//               rows={4}
//               onChange={handleChange}
//             ></textarea>
//             <textarea
//               name="customNotes"
//               placeholder="Additional Notes"
//               className="w-full border rounded p-2"
//               rows={2}
//               onChange={handleChange}
//             ></textarea>
//             <input
//               type="file"
//               name="document"
//               className="w-full"
//               onChange={handleChange}
//             />

//             <div className="flex gap-2">
//               <button
//                 onClick={handleGenerate}
//                 className="bg-yellow-500 text-white px-4 py-2 rounded"
//               >
//                 Generate Proposal
//               </button>
//               <button
//                 onClick={handleSubmit}
//                 className="bg-purple-600 text-white px-4 py-2 rounded"
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="bg-white shadow p-4 rounded">
//         <h3 className="text-lg font-semibold mb-2">Proposal Preview</h3>
//         <pre className="whitespace-pre-wrap text-sm text-gray-800">
//           {preview || 'No content generated yet.'}
//         </pre>
//         <div className="flex gap-2 mt-4">
//           <button className="bg-blue-600 text-white px-3 py-1 rounded">Share via Email</button>
//           <button className="bg-green-600 text-white px-3 py-1 rounded">WhatsApp</button>
//           <button className="bg-gray-800 text-white px-3 py-1 rounded">Download</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProposalManagement;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import {
//   FileText, Send, Download, Share2,
//   MessageCircle, Mail, Plus, Users
// } from 'lucide-react';

// const ProposalManagement = () => {
//   const [isNewClient, setIsNewClient] = useState(null);
//   const [clients, setClients] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     clientEmail: '',
//     clientName: '',
//     projectTitle: '',
//     projectDescription: '',
//     customNotes: '',
//     document: null,
//     // clientCompany: '', // <-- NEW FIELD
//   });
//   const [preview, setPreview] = useState('');
//   const token = localStorage.getItem('authToken');

//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         setIsLoading(true);
//         const res = await axios.get(
//           `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/clients`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setClients(res.data);
//       } catch (error) {
//         toast.error('Failed to load clients');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (isNewClient === false) {
//       fetchClients();
//     }
//   }, [isNewClient, token]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'document') {
//       setFormData(prev => ({ ...prev, document: files[0] }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const isFormValid = () => {
//     const { clientEmail, clientName, projectTitle, projectDescription } = formData;
//     return clientEmail && clientName && projectTitle && projectDescription;
//   };

//   const handleGenerate = async () => {
//     const { clientName, clientEmail,  projectTitle, projectDescription } = formData;

//     if (!clientName || !clientEmail  || !projectTitle || !projectDescription) {
//       toast.error('Please fill all required fields to generate proposal.');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/proposal/generate`,
//         {
//           clientName,
//           clientEmail,
//           // clientCompany,
//           projectTitle,
//           projectDescription,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setPreview(res.data.generatedProposal || '');
//     } catch (err) {
//       toast.error('Failed to generate proposal');
//     } finally {
//       setIsLoading(false);
//     }
//   };


//   const handleSubmit = async () => {
//     if (!isFormValid()) {
//       toast.error('Please fill all required fields.');
//       return;
//     }

//     setIsLoading(true);
//     const data = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       if (value) data.append(key, value);
//     });

//     try {
//       await axios.post(
//         `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/proposal`,
//         data,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );
//       toast.success('Proposal submitted');
//     } catch (err) {
//       toast.error('Submission failed');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleShare = (method) => {
//     alert(`Sharing via ${method}...`);
//   };

//   const resetForm = () => {
//     setIsNewClient(null);
//     setFormData({
//       clientEmail: '',
//       clientName: '',
//       projectTitle: '',
//       projectDescription: '',
//       customNotes: '',
//       document: null,
//     });
//     setPreview('');
//   };


//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-4 sm:p-6 lg:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8 animate-fade-in">
//           <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-3">
//             Create <span className="text-purple-600">Professional Proposal</span>
//           </h1>
//           <p className="text-gray-600 text-lg sm:text-xl">Generate beautiful proposals in minutes</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
//           {/* Form Section */}
//           <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 animate-slide-in-left border border-purple-100">
//             <div className="flex items-center mb-6">
//               <div className="w-1 h-8 bg-purple-600 rounded-full mr-4"></div>
//               <h2 className="text-2xl font-semibold text-gray-800">Proposal Details</h2>
//             </div>

//             {/* Client Type Selection */}
//             {isNewClient === null && (
//               <div className="mb-8 animate-fade-in">
//                 <p className="text-gray-700 mb-4 font-medium">Select Client Type</p>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <button
//                     onClick={() => setIsNewClient(false)}
//                     className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 hover:from-purple-700 hover:to-purple-800 hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
//                   >
//                     <Users className="w-5 h-5" />
//                     Existing Client
//                   </button>
//                   <button
//                     onClick={() => setIsNewClient(true)}
//                     className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold transition-all duration-300 hover:from-green-600 hover:to-green-700 hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
//                   >
//                     <Plus className="w-5 h-5" />
//                     New Client
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Form Fields */}
//             {isNewClient !== null && (
//               <div className="space-y-6 animate-slide-in-up">
//                 {/* Client Selection/Input */}
//                 {!isNewClient && (
//                   <div className="space-y-2">
//                     <label className="block text-sm font-semibold text-gray-700">Select Client</label>
//                     {isLoading ? (
//                       <div className="w-full border-2 border-purple-200 rounded-xl p-4 animate-pulse bg-gray-100">
//                         Loading clients...
//                       </div>
//                     ) : (
//                       <select
//                         className="w-full border-2 border-purple-200 rounded-xl p-4 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white"
//                         onChange={(e) => {
//                           const selected = clients.find(c => c._id === e.target.value);
//                           if (selected) {
//                             setFormData({
//                               ...formData,
//                               clientEmail: selected.email,
//                               clientName: selected.name,
//                             });
//                           }
//                         }}
//                       >
//                         <option value="">-- Select Client --</option>
//                         {clients.map(client => (
//                           <option key={client._id} value={client._id}>
//                             {client.name} ({client.email})
//                           </option>
//                         ))}
//                       </select>
//                     )}
//                   </div>
//                 )}

//                 {isNewClient && (
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <label className="block text-sm font-semibold text-gray-700">Client Name</label>
//                       <input
//                         type="text"
//                         name="clientName"
//                         placeholder="Enter client name"
//                         className="w-full border-2 border-purple-200 rounded-xl p-4 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
//                         onChange={handleChange}
//                         value={formData.clientName}
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <label className="block text-sm font-semibold text-gray-700">Client Email</label>
//                       <input
//                         type="email"
//                         name="clientEmail"
//                         placeholder="Enter client email"
//                         className="w-full border-2 border-purple-200 rounded-xl p-4 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
//                         onChange={handleChange}
//                         value={formData.clientEmail}
//                       />
//                     </div>
//                   </div>
//                 )}

//                 <div className="space-y-2">
//                   <label className="block text-sm font-semibold text-gray-700">Project Title</label>
//                   <input
//                     type="text"
//                     name="projectTitle"
//                     placeholder="Enter project title"
//                     className="w-full border-2 border-purple-200 rounded-xl p-4 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
//                     onChange={handleChange}
//                     value={formData.projectTitle}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label className="block text-sm font-semibold text-gray-700">Project Description</label>
//                   <textarea
//                     name="projectDescription"
//                     placeholder="Describe your project in detail"
//                     className="w-full border-2 border-purple-200 rounded-xl p-4 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 resize-none"
//                     rows={4}
//                     onChange={handleChange}
//                     value={formData.projectDescription}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label className="block text-sm font-semibold text-gray-700">Additional Notes</label>
//                   <textarea
//                     name="customNotes"
//                     placeholder="Any additional requirements or notes"
//                     className="w-full border-2 border-purple-200 rounded-xl p-4 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 resize-none"
//                     rows={3}
//                     onChange={handleChange}
//                     value={formData.customNotes}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label className="block text-sm font-semibold text-gray-700">Upload Document</label>
//                   <input
//                     type="file"
//                     name="document"
//                     className="w-full border-2 border-purple-200 rounded-xl p-4 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200"
//                     onChange={handleChange}
//                   />
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex flex-col sm:flex-row gap-4 pt-4">
//                   <button
//                     onClick={handleGenerate}
//                     disabled={isLoading || !formData.projectTitle || !formData.clientName}
//                     className="flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-xl transition-all duration-300 hover:from-yellow-600 hover:to-orange-600 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none hover:scale-105 active:scale-95 cursor-pointer"
//                   >
//                     {isLoading ? (
//                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                     ) : (
//                       <FileText className="w-5 h-5" />
//                     )}
//                     Generate Proposal
//                   </button>
//                   {/* <button
//                     onClick={handleSubmit}
//                     disabled={isLoading || !preview}
//                     className="flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 hover:from-purple-700 hover:to-purple-800 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none hover:scale-105 active:scale-95"
//                   >
//                     <Send className="w-5 h-5" />
//                     Submit Proposal
//                   </button> */}
//                 </div>

//                 <button
//                   onClick={resetForm}
//                   className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer"
//                 >
//                   Reset Form
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Preview Section */}
//           <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 animate-slide-in-right border border-purple-100">
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center">
//                 <div className="w-1 h-8 bg-purple-600 rounded-full mr-4"></div>
//                 <h3 className="text-2xl font-semibold text-gray-800">Proposal Preview</h3>
//               </div>
//               <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
//                 <FileText className="w-6 h-6 text-purple-600" />
//               </div>
//             </div>

//             <div className="bg-gray-50 rounded-xl p-6 mb-6 min-h-[300px] border-2 border-dashed border-gray-200">
//               {isLoading ? (
//                 <div className="flex items-center justify-center h-64">
//                   <div className="text-center">
//                     <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//                     <p className="text-gray-600">Generating your proposal...</p>
//                   </div>
//                 </div>
//               ) : preview ? (
//                 <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed animate-fade-in">
//                   {preview}
//                 </pre>
//               ) : (
//                 <div className="flex items-center justify-center h-64 text-center">
//                   <div>
//                     <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                     <p className="text-gray-500 text-lg">Select a client and fill project details to see the preview</p>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Share Buttons */}
//             {preview && (
//               <div className="flex flex-wrap gap-3 animate-fade-in">
//                 <button
//                   onClick={() => handleShare('Email')}
//                   className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium transition-all duration-300 hover:bg-blue-700 hover:shadow-md hover:scale-105 active:scale-95 cursor-pointer"
//                 >
//                   <Mail className="w-4 h-4" />
//                   Email
//                 </button>
//                 {/* <button
//                   onClick={() => handleShare('WhatsApp')}
//                   className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium transition-all duration-300 hover:bg-green-700 hover:shadow-md hover:scale-105 active:scale-95"
//                 >
//                   <MessageCircle className="w-4 h-4" />
//                   WhatsApp
//                 </button> */}
//                 <button
//                   onClick={() => handleShare('Download')}
//                   className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg font-medium transition-all duration-300 hover:bg-gray-900 hover:shadow-md hover:scale-105 active:scale-95  cursor-pointer"
//                 >
//                   <Download className="w-4 h-4" />
//                   Download
//                 </button>
//                 {/* <button
//                   onClick={() => handleShare('Share')}
//                   className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium transition-all duration-300 hover:bg-purple-700 hover:shadow-md hover:scale-105 active:scale-95"
//                 >
//                   <Share2 className="w-4 h-4" />
//                   Share
//                 </button> */}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Custom CSS for animations */}
//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
        
//         @keyframes slideInLeft {
//           from { 
//             opacity: 0; 
//             transform: translateX(-50px); 
//           }
//           to { 
//             opacity: 1; 
//             transform: translateX(0); 
//           }
//         }
        
//         @keyframes slideInRight {
//           from { 
//             opacity: 0; 
//             transform: translateX(50px); 
//           }
//           to { 
//             opacity: 1; 
//             transform: translateX(0); 
//           }
//         }
        
//         @keyframes slideInUp {
//           from { 
//             opacity: 0; 
//             transform: translateY(30px); 
//           }
//           to { 
//             opacity: 1; 
//             transform: translateY(0); 
//           }
//         }
        
//         .animate-fade-in {
//           animation: fadeIn 0.6s ease-out;
//         }
        
//         .animate-slide-in-left {
//           animation: slideInLeft 0.8s ease-out;
//         }
        
//         .animate-slide-in-right {
//           animation: slideInRight 0.8s ease-out;
//         }
        
//         .animate-slide-in-up {
//           animation: slideInUp 0.6s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProposalManagement;



// Updated ProposalManagement with Multi-template Support and Fake Download
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import DarkProposalTemplate from './ProposalTemplates/DarkProposalTemplate';
// import MultiPageProposalTemplate from './ProposalTemplates/ProposalTemplate';
// import { PDFDownloadLink } from '@react-pdf/renderer';
// import DarkProposalPDF from './ProposalTemplates/DarkProposalTemplate';
// import DarkDownloadableProposalPDF from './downladableProposalTemplates/darkProposalTemplate';
// import LightDownloadableProposalPDF from './downladableProposalTemplates/LightProposal';
// // import other templates like LightProposalTemplate etc., if available

// const templateComponents = {
//   Dark: DarkProposalTemplate,
//   Light: MultiPageProposalTemplate
//   // Light: LightProposalTemplate,
//   // Classic: ClassicProposalTemplate
// };
// const pdfTemplateComponents = {
//   Dark: DarkDownloadableProposalPDF,
//   Light: LightDownloadableProposalPDF,
//   // Classic: ClassicDownloadableProposalPDF,
// };

// const ProposalManagement = () => {
//   const [isNewClient, setIsNewClient] = useState(null);
//   const [clients, setClients] = useState([]);
//   const [formData, setFormData] = useState({
//     clientEmail: '',
//     clientName: '',
//     projectTitle: '',
//     projectDescription: '',
//     customNotes: '',
//     document: null,
//   });
//   const [template, setTemplate] = useState('Dark');
//   const [previewData, setPreviewData] = useState(null);
//   const token = localStorage.getItem('authToken');

//   useEffect(() => {
//     if (isNewClient === false) {
//       axios
//         .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/clients`, {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         .then((res) => setClients(res.data))
//         .catch(() => toast.error('Failed to load clients'));
//     }
//   }, [isNewClient]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'document') {
//       setFormData({ ...formData, document: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleGenerate = async () => {
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/proposal/generate`,
//         {
//           projectTitle: formData.projectTitle,
//           projectDescription: formData.projectDescription,
//           clientName: formData.clientName,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setPreviewData({
//         client: {
//           name: formData.clientName,
//           email: formData.clientEmail,
//         },
//         freelancer: res.data.freelancer,
//         project: {
//           title: formData.projectTitle,
//           description: formData.projectDescription,
//         },
//         ...res.data.structuredProposal, // contains all sections like greeting, objectives etc.
//       });
//     } catch (err) {
//       toast.error('Failed to generate proposal');
//     }
//   };

//   const handleSubmit = async () => {
//     const data = new FormData();
//     for (const key in formData) {
//       if (formData[key]) data.append(key, formData[key]);
//     }

//     try {
//       await axios.post(
//         `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/proposal`,
//         data,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );
//       toast.success('Proposal submitted');
//     } catch (err) {
//       toast.error('Submission failed');
//     }
//   };

//   const TemplateComponent = templateComponents[template];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
//       <div>
//         <h2 className="text-xl font-semibold mb-4">Create Proposal</h2>

//         {isNewClient === null && (
//           <div className="mb-4">
//             <button
//               onClick={() => setIsNewClient(false)}
//               className="mr-4 px-4 py-2 bg-blue-600 text-white rounded"
//             >
//               Existing Client
//             </button>
//             <button
//               onClick={() => setIsNewClient(true)}
//               className="px-4 py-2 bg-green-600 text-white rounded"
//             >
//               New Client
//             </button>
//           </div>
//         )}

//         {isNewClient !== null && (
//           <div className="space-y-4">
//             {!isNewClient && (
//               <select
//                 className="w-full border rounded p-2"
//                 onChange={(e) => {
//                   const selected = clients.find(c => c._id === e.target.value);
//                   setFormData({
//                     ...formData,
//                     clientEmail: selected.email,
//                     clientName: selected.name,
//                   });
//                 }}
//               >
//                 <option value="">Select Client</option>
//                 {clients.map(client => (
//                   <option key={client._id} value={client._id}>
//                     {client.name} ({client.email})
//                   </option>
//                 ))}
//               </select>
//             )}

//             {isNewClient && (
//               <>
//                 <input
//                   type="text"
//                   name="clientName"
//                   placeholder="Client Name"
//                   className="w-full border rounded p-2"
//                   onChange={handleChange}
//                 />
//                 <input
//                   type="email"
//                   name="clientEmail"
//                   placeholder="Client Email"
//                   className="w-full border rounded p-2"
//                   onChange={handleChange}
//                 />
//               </>
//             )}

//             <input
//               type="text"
//               name="projectTitle"
//               placeholder="Project Title"
//               className="w-full border rounded p-2"
//               onChange={handleChange}
//             />
//             <textarea
//               name="projectDescription"
//               placeholder="Project Description"
//               className="w-full border rounded p-2"
//               rows={4}
//               onChange={handleChange}
//             ></textarea>
//             <textarea
//               name="customNotes"
//               placeholder="Additional Notes"
//               className="w-full border rounded p-2"
//               rows={2}
//               onChange={handleChange}
//             ></textarea>
//             <input
//               type="file"
//               name="document"
//               className="w-full"
//               onChange={handleChange}
//             />

//             <div>
//               <label className="block mb-1 font-medium">Select Template</label>
//               <select
//                 value={template}
//                 onChange={(e) => setTemplate(e.target.value)}
//                 className="w-full border rounded p-2"
//               >
//                 {Object.keys(templateComponents).map((key) => (
//                   <option key={key} value={key}>{key}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="flex gap-2">
//               <button
//                 onClick={handleGenerate}
//                 className="bg-yellow-500 text-white px-4 py-2 rounded"
//               >
//                 Generate Proposal
//               </button>
//               {/* <button
//                 onClick={handleSubmit}
//                 className="bg-purple-600 text-white px-4 py-2 rounded"
//               >
//                 Submit
//               </button> */}
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="bg-white shadow p-4 rounded">
//         <h3 className="text-lg font-semibold mb-2">Proposal Preview</h3>

//         {previewData ? (
//           <div className="border border-gray-300 rounded print:border-0 max-h-[600px] overflow-auto">
//             <TemplateComponent proposal={previewData} />
//           </div>
//         ) : (
//           <p className="text-sm text-gray-600">No content generated yet.</p>
//         )}

//         <div className="flex gap-2 mt-4">
//           <button
//             onClick={() => toast.info('Email feature coming soon.')}
//             className="bg-blue-600 text-white px-3 py-1 rounded"
//           >
//             Share via Email
//           </button>

//           {/* <button
//       onClick={() => toast.info('WhatsApp feature coming soon.')}
//       className="bg-green-600 text-white px-3 py-1 rounded"
//     >
//       WhatsApp
//     </button> */}

//           {previewData && pdfTemplateComponents[template] && (
//             <PDFDownloadLink
//               document={React.createElement(pdfTemplateComponents[template], {
//                 proposal: previewData,
//               })}
//               fileName={`Proposal_${formData.projectTitle || 'Untitled'}.pdf`}
//             >
//               {({ loading }) => (
//                 <button
//                   className="bg-gray-800 text-white px-3 py-1 rounded"
//                   disabled={loading}
//                 >
//                   {loading ? 'Preparing PDF...' : 'Download PDF'}
//                 </button>
//               )}
//             </PDFDownloadLink>
//           )}

//         </div>
//       </div>

//     </div>
//   );
// };

// export default ProposalManagement;



import React, { useEffect, useState } from 'react';
import { FileText, Upload, Download, Mail, Eye, Sparkles, X, Crown, Zap, Check, Lock } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import DarkProposalTemplate from './ProposalTemplates/DarkProposalTemplate';
import MultiPageProposalTemplate from './ProposalTemplates/ProposalTemplate';
import DarkDownloadableProposalPDF from './downladableProposalTemplates/darkProposalTemplate';
import LightDownloadableProposalPDF from './downladableProposalTemplates/LightProposal';
import { PDFDownloadLink } from '@react-pdf/renderer';


// const templateComponents = {
//   Dark: DarkProposalTemplate,
//   Light: MultiPageProposalTemplate
// };

const templateComponents = {
  Dark: DarkProposalTemplate,        // Basic
  Light: MultiPageProposalTemplate,  // Premium
};



const pdfTemplateComponents = {
  Dark: DarkDownloadableProposalPDF,
  Light: LightDownloadableProposalPDF,
};

const ProposalManagement = () => {
  const [isNewClient, setIsNewClient] = useState(null);
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    clientEmail: '',
    clientName: '',
    projectTitle: '',
    projectDescription: '',
    customNotes: '',
    document: null,
  });
  const [template, setTemplate] = useState('Dark');
  const [previewData, setPreviewData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const [subscription, setSubscription] = useState(null);
  const token = localStorage.getItem('authToken');


  // Fetch Subscription =>
  // need to see if it works tomorrow 
  // useEffect(() => {
  //     const token = localStorage.getItem("authToken");
  //     if (!token) {
  //         return;
  //     }

  //     axios
  //         .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/freelancer/me`, {
  //             headers: { Authorization: `Bearer ${token}` },
  //         })
  //         .then((res) => setUser(res.data))
  //         .catch(() => setUser(null))
  // }, []);
  // const isClientLimitReached =
  //     user.subscription.limits.clients.used >= user.subscription.limits.clients.max;
  // const isPremiumTemplate = Object.keys(templateComponents.Premium).includes(template);
  // const isLocked = userPlan === "basic" && isPremiumTemplate;



  // const isPremium = template === "Light";
  // const isBasicUser = subscription?.plan === "Basic";
  // const isLocked = isBasicUser && isPremium;

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/subscription/me`)
      .then((res) => setSubscription(res.data))
      .catch((err) => console.error("Error fetching subscription:", err));
  }, []);

  const isProposalLimitReached =
    subscription?.limits?.proposals?.used >= subscription?.limits?.proposals?.max;



  const isPremium = template === "Light";
  const isBasicUser = subscription?.plan === "Basic";
  const isLocked = isBasicUser && isPremium;



  useEffect(() => {
    if (isNewClient === false) {

      axios
        .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/clients`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setClients(res.data))
        .catch(() => toast.error('Failed to load clients'));
    }
  }, [isNewClient]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'document') {
      setFormData({ ...formData, document: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);

    try {

      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/proposal/generate`,
        {
          projectTitle: formData.projectTitle,
          projectDescription: formData.projectDescription,
          clientName: formData.clientName,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPreviewData({
        client: {
          name: formData.clientName,
          email: formData.clientEmail,
        },
        freelancer: res.data.freelancer,
        project: {
          title: formData.projectTitle,
          description: formData.projectDescription,
        },
        ...res.data.structuredProposal, // contains all sections like greeting, objectives etc.
      });
    } catch (err) {
      toast.error('Failed to generate proposal');
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const data = new FormData();
    for (const key in formData) {
      if (formData[key]) data.append(key, formData[key]);
    }

    try {

      await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/proposal`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      

      console.log('Proposal submitted successfully');
      toast.success('Proposal submitted');
    } catch (err) {
      console.error('Submission failed:', err);
      toast.error('Submission failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailShare = () => {
    console.log('Email feature would be implemented here');
    toast.info('Email feature coming soon.');
  };

  const handlePDFDownload = () => {
    console.log('PDF download would be implemented here');
    // This would use PDFDownloadLink in real implementation
  };
  const TemplateComponent = templateComponents[template];

  return (
    // <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4 lg:p-8">
    //   <div className="w-7xl mx-auto">
    //     {/* Header */}
    //     <div className="text-center mb-8 animate-fade-in">
    //       <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
    //         Create Professional Proposal
    //       </h1>
    //       <p className="text-gray-600 text-lg">Generate beautiful proposals in minutes</p>
    //     </div>

    //     <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
    //       {/* Left Panel - Form */}
    //       <div className="space-y-6">
    //         <div className="bg-white rounded-2xl shadow-xl border border-purple-100 p-6 lg:p-8 animate-slide-up">
    //           <div className="flex items-center gap-3 mb-6">
    //             <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
    //               <FileText className="w-4 h-4 text-purple-600" />
    //             </div>
    //             <h2 className="text-xl font-semibold text-gray-800">Proposal Details</h2>
    //           </div>

    //           {/* Client Type Selection */}
    //           {isNewClient === null && (
    //             <div className="mb-6 animate-fade-in">
    //               <label className="block text-sm font-medium text-gray-700 mb-3">Select Client</label>
    //               <div className="flex flex-col sm:flex-row gap-3">
    //                 <button
    //                   onClick={() => setIsNewClient(false)}
    //                   className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
    //                 >
    //                   Existing Client
    //                 </button>
    //                 <button
    //                   onClick={() => setIsNewClient(true)}
    //                   className="flex-1 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
    //                 >
    //                   New Client
    //                 </button>
    //               </div>
    //             </div>
    //           )}

    //           {/* Form Fields */}
    //           {isNewClient !== null && (
    //             <div className="space-y-5 animate-fade-in">
    //               {!isNewClient && (
    //                 <div>
    //                   <label className="block text-sm font-medium text-gray-700 mb-2">Choose Client</label>
    //                   <select
    //                     className="w-full border border-gray-200 rounded-xl p-4 text-gray-700 bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
    //                     onChange={(e) => {
    //                       const selected = clients.find(c => c._id === e.target.value);
    //                       if (selected) {
    //                         setFormData({
    //                           ...formData,
    //                           clientEmail: selected.email,
    //                           clientName: selected.name,
    //                         });
    //                       }
    //                     }}
    //                   >
    //                     <option value="">-- Select Client --</option>
    //                     {clients.map(client => (
    //                       <option key={client._id} value={client._id}>
    //                         {client.name} ({client.email})
    //                       </option>
    //                     ))}
    //                   </select>
    //                 </div>
    //               )}

    //               {isNewClient && (
    //                 <>
    //                   <div>
    //                     <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
    //                     <input
    //                       type="text"
    //                       name="clientName"
    //                       placeholder="Enter client name"
    //                       className="w-full border border-gray-200 rounded-xl p-4 text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
    //                       onChange={handleChange}
    //                     />
    //                   </div>
    //                   <div>
    //                     <label className="block text-sm font-medium text-gray-700 mb-2">Client Email</label>
    //                     <input
    //                       type="email"
    //                       name="clientEmail"
    //                       placeholder="client@example.com"
    //                       className="w-full border border-gray-200 rounded-xl p-4 text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
    //                       onChange={handleChange}
    //                     />
    //                   </div>
    //                 </>
    //               )}

    //               <div>
    //                 <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
    //                 <input
    //                   type="text"
    //                   name="projectTitle"
    //                   placeholder="Enter project title"
    //                   className="w-full border border-gray-200 rounded-xl p-4 text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
    //                   onChange={handleChange}
    //                 />
    //               </div>

    //               <div>
    //                 <label className="block text-sm font-medium text-gray-700 mb-2">Project Description</label>
    //                 <textarea
    //                   name="projectDescription"
    //                   placeholder="Describe your project requirements..."
    //                   className="w-full border border-gray-200 rounded-xl p-4 text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
    //                   rows={4}
    //                   onChange={handleChange}
    //                 />
    //               </div>

    //               <div>
    //                 <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
    //                 <textarea
    //                   name="customNotes"
    //                   placeholder="Any additional notes or requirements..."
    //                   className="w-full border border-gray-200 rounded-xl p-4 text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
    //                   rows={2}
    //                   onChange={handleChange}
    //                 />
    //               </div>

    //               {/* <div>
    //                 <label className="block text-sm font-medium text-gray-700 mb-2">Upload Document (Optional)</label>
    //                 <div className="relative">
    //                   <input
    //                     type="file"
    //                     name="document"
    //                     className="w-full border border-gray-200 rounded-xl p-4 text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
    //                     onChange={handleChange}
    //                   />
    //                   <Upload className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
    //                 </div>
    //               </div> */}

    //               <div>
    //                 <label className="block text-sm font-medium text-gray-700 mb-2">Select Template</label>
    //                 <select
    //                   value={template}
    //                   onChange={(e) => setTemplate(e.target.value)}
    //                   className="w-full border border-gray-200 rounded-xl p-4 text-gray-700 bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
    //                 >
    //                   {Object.keys(templateComponents).map((key) => (
    //                     <option key={key} value={key}>{key}</option>
    //                   ))}
    //                 </select>
    //               </div>

    //               <div className="flex flex-col sm:flex-row gap-3 pt-4">
    //                 <button
    //                   onClick={handleGenerate}
    //                   disabled={isGenerating}
    //                   className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-4 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
    //                 >
    //                   {isGenerating ? (
    //                     <>
    //                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    //                       Generating...
    //                     </>
    //                   ) : (
    //                     <>
    //                       <Sparkles className="w-4 h-4" />
    //                       Generate Proposal
    //                     </>
    //                   )}
    //                 </button>
    //               </div>
    //             </div>
    //           )}
    //         </div>
    //       </div>

    //       {/* Right Panel - Preview */}
    //       <div className="space-y-6">
    //         <div className="bg-white rounded-2xl shadow-xl border border-purple-100 p-6 lg:p-8 animate-slide-up min-h-[600px]">
    //           <div className="flex items-center justify-between mb-6">
    //             <div className="flex items-center gap-3">
    //               <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
    //                 <Eye className="w-4 h-4 text-purple-600" />
    //               </div>
    //               <h3 className="text-xl font-semibold text-gray-800">Proposal Preview</h3>
    //             </div>
    //           </div>

    //           {previewData ? (
    //             <div className="border border-gray-300 rounded print:border-0 max-h-[600px] overflow-auto">
    //               <TemplateComponent proposal={previewData} />
    //             </div>
    //           ) : (
    //             <div className="flex flex-col items-center justify-center h-64 text-center animate-pulse">
    //               <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
    //                 <FileText className="w-8 h-8 text-purple-400" />
    //               </div>
    //               <p className="text-gray-500">Select a client and work items to see the preview</p>
    //             </div>
    //           )}

    //           {/* Action Buttons */}
    //           {previewData && (
    //             <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200 animate-fade-in">
    //               <button
    //                 onClick={handleEmailShare}
    //                 className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
    //               >
    //                 <Mail className="w-4 h-4" />
    //                 Share via Email
    //               </button>

    //               {previewData && pdfTemplateComponents[template] && (
    //                 <PDFDownloadLink
    //                   document={React.createElement(pdfTemplateComponents[template], {
    //                     proposal: previewData,
    //                   })}
    //                   fileName={`Proposal_${formData.projectTitle || 'Untitled'}.pdf`}
    //                 >
    //                   {({ loading }) => (
    //                     <button
    //                       className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
    //                       disabled={loading}
    //                     >
    //                       {loading ? 'Preparing PDF...' : 'Download PDF'}
    //                     </button>
    //                   )}
    //                 </PDFDownloadLink>
    //               )}


    //             </div>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   <style jsx>{`
    //     @keyframes fade-in {
    //       from { opacity: 0; }
    //       to { opacity: 1; }
    //     }
        
    //     @keyframes slide-up {
    //       from { opacity: 0; transform: translateY(20px); }
    //       to { opacity: 1; transform: translateY(0); }
    //     }
        
    //     .animate-fade-in {
    //       animation: fade-in 0.6s ease-out;
    //     }
        
    //     .animate-slide-up {
    //       animation: slide-up 0.8s ease-out;
    //     }
    //   `}</style>
    // </div>
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-3 sm:p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2 sm:mb-4">
            Create Professional Proposal
          </h1>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg px-4">Generate beautiful proposals in minutes</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Panel - Form */}
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-purple-100 p-4 sm:p-6 lg:p-8 animate-slide-up">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Proposal Details</h2>
              </div>

              {/* Client Type Selection */}
              {isNewClient === null && (
                <div className="mb-4 sm:mb-6 animate-fade-in">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Select Client</label>
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => setIsNewClient(false)}
                      className="w-full px-4 sm:px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg sm:rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer text-sm sm:text-base"
                    >
                      Existing Client
                    </button>
                    <button
                      onClick={() => setIsNewClient(true)}
                      className="w-full px-4 sm:px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg sm:rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer text-sm sm:text-base"
                    >
                      New Client
                    </button>
                  </div>
                </div>
              )}

              {/* Form Fields */}
              {isNewClient !== null && (
                <div className="space-y-4 sm:space-y-5 animate-fade-in">
                  {!isNewClient && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Choose Client</label>
                      <select
                        className="w-full border border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 text-gray-700 bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                        onChange={(e) => {
                          const selected = clients.find(c => c._id === e.target.value);
                          if (selected) {
                            setFormData({
                              ...formData,
                              clientEmail: selected.email,
                              clientName: selected.name,
                            });
                          }
                        }}
                      >
                        <option value="">-- Select Client --</option>
                        {clients.map(client => (
                          <option key={client._id} value={client._id}>
                            {client.name} ({client.email})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {isNewClient && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                        <input
                          type="text"
                          name="clientName"
                          placeholder="Enter client name"
                          className="w-full border border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Client Email</label>
                        <input
                          type="email"
                          name="clientEmail"
                          placeholder="client@example.com"
                          className="w-full border border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                          onChange={handleChange}
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                    <input
                      type="text"
                      name="projectTitle"
                      placeholder="Enter project title"
                      className="w-full border border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Description</label>
                    <textarea
                      name="projectDescription"
                      placeholder="Describe your project requirements..."
                      className="w-full border border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none text-sm sm:text-base"
                      rows={3}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                    <textarea
                      name="customNotes"
                      placeholder="Any additional notes or requirements..."
                      className="w-full border border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none text-sm sm:text-base"
                      rows={2}
                      onChange={handleChange}
                    />
                  </div>

                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Template</label>
                    <select
                      value={template}
                      onChange={(e) => setTemplate(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 text-gray-700 bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                    >
                      {Object.keys(templateComponents).map((key) => (
                        <option key={key} value={key}>{key}</option>
                      ))}
                    </select>
                  </div> */}

                  {/* <div> */}
                    {/* Template Select */}
                    {/* <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Template
                      </label>
                      <select
                        value={template}
                        onChange={(e) => setTemplate(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 text-gray-700 bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                      > */}
                        {/* Render Basic templates */}
                        {/* <optgroup label="Basic">
                          {Object.keys(templateComponents.Basic).map((key) => (
                            <option key={key} value={key}>
                              {key}
                            </option>
                          ))}
                        </optgroup> */}

                        {/* Render Premium templates with lock for basic users */}
                        {/* <optgroup label="Premium">
                          {Object.keys(templateComponents.Premium).map((key) => (
                            <option key={key} value={key}>
                              {key} {userPlan === "basic" ? "🔒" : ""}
                            </option>
                          ))}
                        </optgroup>
                      </select>
                    </div>
                  </div> */}


                  {/* Template Selector */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Template
                    </label>
                    <div className="relative">
                      <select
                        value={template}
                        onChange={(e) => setTemplate(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg p-3 text-gray-700 bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      >
                        {/* Dark (Basic) */}
                        <option value="Dark">Dark </option>

                        {/* Light (Premium) */}
                        <option value="Light">
                          Light {isBasicUser && "🔒"}
                        </option>
                      </select>
                    </div>
                  </div>




                  {/* <div className="pt-2 sm:pt-4">
                    <button
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm sm:text-base"
                    >
                      {isGenerating ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          Generate Proposal
                        </>
                      )}
                    </button>
                  </div> */}


                  {/* <button
                    onClick={() =>
                      isProposalLimitReached ? setShowUpgradeModal(true) : handleGenerate()
                    }
                    disabled={isGenerating} // still clickable, just changes behavior
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all duration-200 transform active:scale-95 shadow-lg ${isProposalLimitReached
                        ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                        : "flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                      }`}
                  >
                    {isProposalLimitReached ? (
                      "Upgrade to Unlock"
                    ) : isGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Generate Proposal
                      </>
                    )}
                  </button> */}

                  {/* Proposal Button */}
                  {/* <button
                    onClick={() =>
                      isLocked
                        ? setShowUpgradeModal(true) // block if premium locked
                        : isProposalLimitReached
                          ? setShowUpgradeModal(true)
                          : handleGenerate()
                    }
                    disabled={isGenerating || isLocked}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all duration-200 transform active:scale-95 shadow-lg ${isLocked || isProposalLimitReached
                        ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                      }`}
                  >
                    {isLocked ? (
                      <>
                        <Lock className="w-4 h-4" />
                        Upgrade to Unlock
                      </>
                    ) : isProposalLimitReached ? (
                      "Upgrade to Unlock"
                    ) : isGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Generate Proposal
                      </>
                    )}
                  </button> */}

                  <button
                    onClick={() => {
                      if (isLocked || isProposalLimitReached) {
                        setShowUpgradeModal(true);
                      } else {
                        handleGenerate();
                      }
                    }}
                    disabled={isGenerating || isLocked}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all duration-200 transform active:scale-95 shadow-lg ${isLocked || isProposalLimitReached
                        ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                      }`}
                  >
                    {isLocked ? (
                      <>
                        <Lock className="w-4 h-4" />
                        Upgrade to Unlock
                      </>
                    ) : isProposalLimitReached ? (
                      "Upgrade to Unlock"
                    ) : isGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Generate Proposal
                      </>
                    )}
                  </button>

                  {/* Reset Button for Mobile */}
                  <div className="pt-2 xl:hidden">
                    <button
                      onClick={() => setIsNewClient(null)}
                      className="w-full px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-all duration-200 text-sm"
                    >
                      Back to Client Selection
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-purple-100 p-4 sm:p-6 lg:p-8 animate-slide-up">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Proposal Preview</h3>
                </div>
              </div>

              <div className="min-h-[300px] sm:min-h-[400px] lg:min-h-[600px]">
                {previewData ? (
                  <div className="border border-gray-300 rounded-lg overflow-auto max-h-[400px] sm:max-h-[500px] lg:max-h-[600px]">
                    <PreviewComponent proposal={previewData} />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-48 sm:h-64 text-center animate-pulse">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                      <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
                    </div>
                    <p className="text-gray-500 text-sm sm:text-base px-4">Select a client and fill in details to see the preview</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {previewData && (
                <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 animate-fade-in">
                  <button
                    onClick={handleEmailShare}
                    className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 sm:py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer text-sm sm:text-base"
                  >
                    <Mail className="w-4 h-4" />
                    Share via Email
                  </button>

                  <button
                    className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-4 py-3 sm:py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer text-sm sm:text-base"
                  >
                    Download PDF
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* upgrade modal */}
        {showUpgradeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden">
              {/* Header with Gradient */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white relative">
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="absolute top-4 right-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-200"
                >
                  <X size={20} />
                </button>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                    <Crown size={32} className="text-yellow-300" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Upgrade Required</h2>
                  <p className="text-purple-100 opacity-90">
                    Unlock unlimited potential with Professional
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="text-center mb-6">
                  <p className="text-gray-600 text-sm mb-4">
                    You've reached the limit for adding clients in the <span className="font-semibold text-gray-800">Basic Plan</span>.
                  </p>

                  {/* Features List */}
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-4 mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center justify-center gap-2">
                      <Zap size={16} className="text-purple-600" />
                      Professional Features
                    </h3>
                    <div className="space-y-2 text-sm">
                      {[
                        'Unlimited clients & meetings',
                        'Advanced scheduling tools',
                        'Custom branding options',
                        'Priority support'
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-gray-700">
                          <div className="w-4 h-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                            <Check size={10} className="text-white" />
                          </div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowUpgradeModal(false)}
                    className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 font-medium cursor-pointer"
                  >
                    Maybe Later
                  </button>
                  <button
                    onClick={() => alert("Redirect to PayPal/Upgrade Flow")}
                    className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
                  >
                    Upgrade Now
                  </button>
                </div>

                {/* Trust Badge */}
                <div className="text-center mt-4">
                  <p className="text-xs text-gray-500">
                    🔒 Secure payment • Cancel anytime
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        
        /* Mobile-specific optimizations */
        @media (max-width: 640px) {
          .min-h-screen {
            min-height: 100vh;
          }
        }
        
        /* Smooth scrolling for mobile */
        @media (max-width: 1280px) {
          .max-h-\\[400px\\],
          .max-h-\\[500px\\],
          .max-h-\\[600px\\] {
            -webkit-overflow-scrolling: touch;
          }
        }
      `}</style>
    </div>
  );
};

export default ProposalManagement;