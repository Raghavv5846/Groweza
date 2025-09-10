// // src/pages/Clients.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

// const Clients = () => {
//     const [clients, setClients] = useState([]);
//     const [newClient, setNewClient] = useState({ name: '', email: '', phone: '', company: '', notes: '' });
//     const [selectedClient, setSelectedClient] = useState(null);
//     const [workFile, setWorkFile] = useState(null);
//     const [workDetails, setWorkDetails] = useState({
//         fieldOfWork: '',
//         workDescription: '',
//         cost: '',
//         startDate: '',
//         endDate: '',
//     });

//     const token = localStorage.getItem('authToken');
//     const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

//     const fetchClients = async () => {
//         try {
//             const { data } = await axios.get(`${BASE_URL}/api/clients`, authHeaders);
//             setClients(data);
//         } catch (err) {
//             toast.error('Failed to fetch clients');
//         }
//     };

//     const handleAddClient = async () => {
//         try {
//             const { data } = await axios.post(`${BASE_URL}/api/clients`, newClient, authHeaders);
//             setClients(data.clients);
//             setNewClient({ name: '', email: '', phone: '', company: '', notes: '' });
//             toast.success('Client added');
//         } catch {
//             toast.error('Error adding client');
//         }
//     };

//     const handleDeleteClient = async (clientId) => {
//         try {
//             await axios.delete(`${BASE_URL}/api/clients/${clientId}`, authHeaders);
//             fetchClients();
//             toast.success('Client deleted');
//         } catch {
//             toast.error('Error deleting client');
//         }
//     };

//     const handleAddWork = async (clientId) => {
//         const formData = new FormData();
//         for (let key in workDetails) formData.append(key, workDetails[key]);
//         if (workFile) formData.append('document', workFile);

//         try {
//             await axios.post(`${BASE_URL}/api/clients/${clientId}/works`, formData, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             toast.success('Work added');
//             setWorkDetails({ fieldOfWork: '', workDescription: '', cost: '', startDate: '', endDate: '' });
//             setWorkFile(null);
//             fetchClients();
//         } catch {
//             toast.error('Failed to add work');
//         }
//     };

//     useEffect(() => {
//         fetchClients();
//     }, []);

//     return (
//         <div className="p-6 text-white">
//             <h2 className="text-2xl font-bold mb-4">Clients</h2>

//             <div className="mb-6">
//                 <input type="text" placeholder="Name" value={newClient.name} onChange={(e) => setNewClient({ ...newClient, name: e.target.value })} className="input" />
//                 <input type="email" placeholder="Email" value={newClient.email} onChange={(e) => setNewClient({ ...newClient, email: e.target.value })} className="input" />
//                 <input type="text" placeholder="Phone" value={newClient.phone} onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })} className="input" />
//                 <input type="text" placeholder="Company" value={newClient.company} onChange={(e) => setNewClient({ ...newClient, company: e.target.value })} className="input" />
//                 <textarea placeholder="Notes" value={newClient.notes} onChange={(e) => setNewClient({ ...newClient, notes: e.target.value })} className="input" />
//                 <button onClick={handleAddClient} className="btn">Add Client</button>
//             </div>

//             {clients.map((client) => (
//                 <div key={client._id} className="border border-gray-600 p-4 mb-4 rounded">
//                     <h3 className="text-xl font-semibold">{client.name}</h3>
//                     <p>{client.email} | {client.phone} | {client.company}</p>
//                     <p className="text-sm italic">{client.notes}</p>

//                     <button onClick={() => setSelectedClient(client._id)} className="btn-sm mt-2">Add Work</button>
//                     <button onClick={() => handleDeleteClient(client._id)} className="btn-sm ml-2 bg-red-500">Delete</button>

//                     {selectedClient === client._id && (
//                         <div className="mt-4 bg-gray-800 p-4 rounded">
//                             <input type="text" placeholder="Field of Work" value={workDetails.fieldOfWork} onChange={(e) => setWorkDetails({ ...workDetails, fieldOfWork: e.target.value })} className="input" />
//                             <textarea placeholder="Description" value={workDetails.workDescription} onChange={(e) => setWorkDetails({ ...workDetails, workDescription: e.target.value })} className="input" />
//                             <input type="number" placeholder="Cost" value={workDetails.cost} onChange={(e) => setWorkDetails({ ...workDetails, cost: e.target.value })} className="input" />
//                             <input type="date" value={workDetails.startDate} onChange={(e) => setWorkDetails({ ...workDetails, startDate: e.target.value })} className="input" />
//                             <input type="date" value={workDetails.endDate} onChange={(e) => setWorkDetails({ ...workDetails, endDate: e.target.value })} className="input" />
//                             <input type="file" onChange={(e) => setWorkFile(e.target.files[0])} className="input" />
//                             <button onClick={() => handleAddWork(client._id)} className="btn">Submit Work</button>
//                         </div>
//                     )}

//                     <ul className="mt-2 ml-4 text-sm">
//                         {client.works?.map((work) => (
//                             <li key={work._id} className="mb-1">🔹 {work.fieldOfWork} ({work.isWorkCompleted ? '✅ Done' : '🕒 Pending'})</li>
//                         ))}
//                     </ul>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Clients;


// import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { toast } from 'react-toastify';
// import { Plus, X, User, Mail, Phone, Building, FileText, Calendar, DollarSign, Edit, Trash2, Check, Clock } from 'lucide-react';

// // const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

// const Clients = () => {
//     const [clients, setClients] = useState([]);
//     const [newClient, setNewClient] = useState({ name: '', email: '', phone: '', company: '', notes: '' });
//     const [selectedClient, setSelectedClient] = useState(null);
//     const [workFile, setWorkFile] = useState(null);
//     const [workDetails, setWorkDetails] = useState({
//         fieldOfWork: '',
//         workDescription: '',
//         cost: '',
//         startDate: '',
//         endDate: '',
//     });
//     const [showModal, setShowModal] = useState(false);
//     const [showWorkModal, setShowWorkModal] = useState(false);

//     // const token = localStorage.getItem('authToken');
//     // const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

//     const fetchClients = async () => {
//         try {
//             // const { data } = await axios.get(`${BASE_URL}/api/clients`, authHeaders);
//             // setClients(data);
//             // Mock data for demonstration
//             const mockClients = [
//                 {
//                     _id: '1',
//                     name: 'John Doe',
//                     email: 'john@example.com',
//                     phone: '+1234567890',
//                     company: 'Tech Corp',
//                     notes: 'Important client from tech industry',
//                     works: [
//                         {
//                             _id: 'w1',
//                             fieldOfWork: 'Web Development',
//                             isWorkCompleted: true
//                         },
//                         {
//                             _id: 'w2',
//                             fieldOfWork: 'Mobile App',
//                             isWorkCompleted: false
//                         }
//                     ]
//                 },
//                 {
//                     _id: '2',
//                     name: 'Jane Smith',
//                     email: 'jane@example.com',
//                     phone: '+0987654321',
//                     company: 'Design Studio',
//                     notes: 'Creative agency specializing in branding',
//                     works: [
//                         {
//                             _id: 'w3',
//                             fieldOfWork: 'Logo Design',
//                             isWorkCompleted: true
//                         }
//                     ]
//                 }
//             ];
//             setClients(mockClients);
//         } catch (err) {
//             // toast.error('Failed to fetch clients');
//             console.error('Failed to fetch clients:', err);
//         }
//     };

//     const handleAddClient = async () => {
//         try {
//             // const { data } = await axios.post(`${BASE_URL}/api/clients`, newClient, authHeaders);
//             // setClients(data.clients);

//             // Mock implementation
//             const mockNewClient = {
//                 _id: Date.now().toString(),
//                 ...newClient,
//                 works: []
//             };
//             setClients([...clients, mockNewClient]);

//             setNewClient({ name: '', email: '', phone: '', company: '', notes: '' });
//             setShowModal(false);
//             // toast.success('Client added');
//             console.log('Client added successfully');
//         } catch {
//             // toast.error('Error adding client');
//             console.error('Error adding client');
//         }
//     };

//     const handleDeleteClient = async (clientId) => {
//         try {
//             // await axios.delete(`${BASE_URL}/api/clients/${clientId}`, authHeaders);

//             // Mock implementation
//             setClients(clients.filter(client => client._id !== clientId));

//             // toast.success('Client deleted');
//             console.log('Client deleted successfully');
//         } catch {
//             // toast.error('Error deleting client');
//             console.error('Error deleting client');
//         }
//     };

//     const handleAddWork = async (clientId) => {
//         // const formData = new FormData();
//         // for (let key in workDetails) formData.append(key, workDetails[key]);
//         // if (workFile) formData.append('document', workFile);

//         try {
//             // await axios.post(`${BASE_URL}/api/clients/${clientId}/works`, formData, {
//             //     headers: {
//             //         Authorization: `Bearer ${token}`,
//             //         'Content-Type': 'multipart/form-data',
//             //     },
//             // });

//             // Mock implementation
//             const mockWork = {
//                 _id: Date.now().toString(),
//                 fieldOfWork: workDetails.fieldOfWork,
//                 isWorkCompleted: false
//             };

//             setClients(clients.map(client =>
//                 client._id === clientId
//                     ? { ...client, works: [...(client.works || []), mockWork] }
//                     : client
//             ));

//             // toast.success('Work added');
//             console.log('Work added successfully');
//             setWorkDetails({ fieldOfWork: '', workDescription: '', cost: '', startDate: '', endDate: '' });
//             setWorkFile(null);
//             setShowWorkModal(false);
//             setSelectedClient(null);
//         } catch {
//             // toast.error('Failed to add work');
//             console.error('Failed to add work');
//         }
//     };

//     useEffect(() => {
//         fetchClients();
//     }, []);

//     const Modal = ({ isOpen, onClose, title, children }) => {
//         if (!isOpen) return null;

//         return (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//                 <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
//                     <div className="flex items-center justify-between p-6 border-b border-gray-200">
//                         <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
//                         <button
//                             onClick={onClose}
//                             className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                         >
//                             <X size={20} className="text-gray-600" />
//                         </button>
//                     </div>
//                     <div className="p-6">
//                         {children}
//                     </div>
//                 </div>
//             </div>
//         );
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//             <div className="max-w-7xl mx-auto">
//                 {/* Header */}
//                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
//                     <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Client Management</h1>
//                     <button
//                         onClick={() => setShowModal(true)}
//                         className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
//                     >
//                         <Plus size={20} className="mr-2" />
//                         Add Client
//                     </button>
//                 </div>

//                 {/* Empty State */}
//                 {clients.length === 0 && (
//                     <div className="text-center py-16 animate-fade-in">
//                         <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
//                             <Plus size={32} className="text-gray-400" />
//                         </div>
//                         <h2 className="text-xl font-semibold text-gray-900 mb-2">No clients yet</h2>
//                         <p className="text-gray-600 mb-6">Add your first client to get started managing payments and tasks.</p>
//                         <button
//                             onClick={() => setShowModal(true)}
//                             className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
//                         >
//                             <Plus size={20} className="mr-2" />
//                             Add Your First Client
//                         </button>
//                     </div>
//                 )}

//                 {/* Clients Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {clients.map((client, index) => (
//                         <div
//                             key={client._id}
//                             className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
//                             style={{ animationDelay: `${index * 0.1}s` }}
//                         >
//                             <div className="p-6">
//                                 {/* Client Header */}
//                                 <div className="flex items-start justify-between mb-4">
//                                     <div className="flex items-center">
//                                         <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
//                                             <User size={20} className="text-blue-600" />
//                                         </div>
//                                         <div>
//                                             <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
//                                             <p className="text-sm text-gray-600">{client.company}</p>
//                                         </div>
//                                     </div>
//                                     <div className="flex space-x-2">
//                                         <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
//                                             <Edit size={16} />
//                                         </button>
//                                         <button
//                                             onClick={() => handleDeleteClient(client._id)}
//                                             className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                                         >
//                                             <Trash2 size={16} />
//                                         </button>
//                                     </div>
//                                 </div>

//                                 {/* Client Details */}
//                                 <div className="space-y-2 mb-4">
//                                     <div className="flex items-center text-sm text-gray-600">
//                                         <Mail size={16} className="mr-2" />
//                                         {client.email}
//                                     </div>
//                                     <div className="flex items-center text-sm text-gray-600">
//                                         <Phone size={16} className="mr-2" />
//                                         {client.phone}
//                                     </div>
//                                     {client.notes && (
//                                         <div className="flex items-start text-sm text-gray-600">
//                                             <FileText size={16} className="mr-2 mt-0.5" />
//                                             <span className="italic">{client.notes}</span>
//                                         </div>
//                                     )}
//                                 </div>

//                                 {/* Works */}
//                                 {client.works && client.works.length > 0 && (
//                                     <div className="mb-4">
//                                         <h4 className="text-sm font-medium text-gray-900 mb-2">Works</h4>
//                                         <div className="space-y-1">
//                                             {client.works.map((work) => (
//                                                 <div key={work._id} className="flex items-center text-sm">
//                                                     {work.isWorkCompleted ? (
//                                                         <Check size={16} className="text-green-500 mr-2" />
//                                                     ) : (
//                                                         <Clock size={16} className="text-orange-500 mr-2" />
//                                                     )}
//                                                     <span className="text-gray-700">{work.fieldOfWork}</span>
//                                                     <span className={`ml-2 px-2 py-1 text-xs rounded-full ${work.isWorkCompleted
//                                                             ? 'bg-green-100 text-green-800'
//                                                             : 'bg-orange-100 text-orange-800'
//                                                         }`}>
//                                                         {work.isWorkCompleted ? 'Done' : 'Pending'}
//                                                     </span>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 )}

//                                 {/* Actions */}
//                                 <div className="flex space-x-2">
//                                     <button
//                                         onClick={() => {
//                                             setSelectedClient(client._id);
//                                             setShowWorkModal(true);
//                                         }}
//                                         className="flex-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
//                                     >
//                                         Add Work
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Add Client Modal */}
//                 <Modal
//                     isOpen={showModal}
//                     onClose={() => setShowModal(false)}
//                     title="Add New Client"
//                 >
//                     <div className="space-y-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//                             <input
//                                 type="text"
//                                 value={newClient.name}
//                                 onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                 placeholder="Enter client name"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                             <input
//                                 type="email"
//                                 value={newClient.email}
//                                 onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                 placeholder="Enter email address"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
//                             <input
//                                 type="text"
//                                 value={newClient.phone}
//                                 onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                 placeholder="Enter phone number"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
//                             <input
//                                 type="text"
//                                 value={newClient.company}
//                                 onChange={(e) => setNewClient({ ...newClient, company: e.target.value })}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                 placeholder="Enter company name"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
//                             <textarea
//                                 value={newClient.notes}
//                                 onChange={(e) => setNewClient({ ...newClient, notes: e.target.value })}
//                                 rows={3}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                 placeholder="Add any notes about the client"
//                             />
//                         </div>
//                         <div className="flex space-x-3 pt-4">
//                             <button
//                                 onClick={() => setShowModal(false)}
//                                 className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleAddClient}
//                                 className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                             >
//                                 Add Client
//                             </button>
//                         </div>
//                     </div>
//                 </Modal>

//                 {/* Add Work Modal */}
//                 <Modal
//                     isOpen={showWorkModal}
//                     onClose={() => {
//                         setShowWorkModal(false);
//                         setSelectedClient(null);
//                     }}
//                     title="Add New Work"
//                 >
//                     <div className="space-y-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Field of Work</label>
//                             <input
//                                 type="text"
//                                 value={workDetails.fieldOfWork}
//                                 onChange={(e) => setWorkDetails({ ...workDetails, fieldOfWork: e.target.value })}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                 placeholder="e.g., Web Development, Design"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                             <textarea
//                                 value={workDetails.workDescription}
//                                 onChange={(e) => setWorkDetails({ ...workDetails, workDescription: e.target.value })}
//                                 rows={3}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                 placeholder="Describe the work details"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Cost</label>
//                             <input
//                                 type="number"
//                                 value={workDetails.cost}
//                                 onChange={(e) => setWorkDetails({ ...workDetails, cost: e.target.value })}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                 placeholder="Enter cost amount"
//                             />
//                         </div>
//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
//                                 <input
//                                     type="date"
//                                     value={workDetails.startDate}
//                                     onChange={(e) => setWorkDetails({ ...workDetails, startDate: e.target.value })}
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
//                                 <input
//                                     type="date"
//                                     value={workDetails.endDate}
//                                     onChange={(e) => setWorkDetails({ ...workDetails, endDate: e.target.value })}
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                 />
//                             </div>
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Document</label>
//                             <input
//                                 type="file"
//                                 onChange={(e) => setWorkFile(e.target.files[0])}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                             />
//                         </div>
//                         <div className="flex space-x-3 pt-4">
//                             <button
//                                 onClick={() => {
//                                     setShowWorkModal(false);
//                                     setSelectedClient(null);
//                                 }}
//                                 className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={() => handleAddWork(selectedClient)}
//                                 className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                             >
//                                 Add Work
//                             </button>
//                         </div>
//                     </div>
//                 </Modal>
//             </div>

//             <style jsx>{`
//                 @keyframes fade-in {
//                     from { opacity: 0; transform: translateY(20px); }
//                     to { opacity: 1; transform: translateY(0); }
//                 }
//                 .animate-fade-in {
//                     animation: fade-in 0.6s ease-out;
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default Clients;



// src/pages/Clients.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

// const Clients = () => {
//     const [clients, setClients] = useState([]);
//     const [search, setSearch] = useState('');
//     const [filter, setFilter] = useState('');
//     const [showClientModal, setShowClientModal] = useState(false);
//     const [showWorkModal, setShowWorkModal] = useState(null);
//     const [selectedClientId, setSelectedClientId] = useState(null);

//     const [newClient, setNewClient] = useState({ name: '', email: '', phone: '', company: '', notes: '' });
//     const [workDetails, setWorkDetails] = useState({
//         fieldOfWork: '',
//         workDescription: '',
//         cost: '',
//         startDate: '',
//         endDate: '',
//         paymentStatus: 'Pending',
//         isWorkCompleted: false,
//     });

//     const [workFile, setWorkFile] = useState(null);
//     const token = localStorage.getItem('token');
//     const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

//     const fetchClients = async () => {
//         try {
//             const { data } = await axios.get(`${BASE_URL}/api/clients`, authHeaders);
//             setClients(data);
//         } catch {
//             toast.error('Failed to fetch clients');
//         }
//     };

//     const handleAddClient = async () => {
//         try {
//             const { data } = await axios.post(`${BASE_URL}/api/clients`, newClient, authHeaders);
//             setClients(data.clients);
//             setNewClient({ name: '', email: '', phone: '', company: '', notes: '' });
//             setShowClientModal(false);
//             toast.success('Client added');
//         } catch {
//             toast.error('Error adding client');
//         }
//     };

//     const handleAddWork = async () => {
//         const formData = new FormData();
//         for (let key in workDetails) formData.append(key, workDetails[key]);
//         if (workFile) formData.append('document', workFile);

//         try {
//             await axios.post(`${BASE_URL}/api/clients/${selectedClientId}/works`, formData, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             setShowWorkModal(null);
//             toast.success('Work added');
//             fetchClients();
//         } catch {
//             toast.error('Failed to add work');
//         }
//     };

//     const handleWorkChange = (clientId, workId, updates) => {
//         axios.put(`${BASE_URL}/api/clients/${clientId}/works/${workId}`, updates, authHeaders)
//             .then(() => {
//                 toast.success('Work updated');
//                 fetchClients();
//             })
//             .catch(() => toast.error('Update failed'));
//     };

//     const handleDeleteWork = (clientId, workId) => {
//         axios.delete(`${BASE_URL}/api/clients/${clientId}/works/${workId}`, authHeaders)
//             .then(() => {
//                 toast.success('Work deleted');
//                 fetchClients();
//             })
//             .catch(() => toast.error('Delete failed'));
//     };

//     useEffect(() => {
//         fetchClients();
//     }, []);

//     const filteredClients = clients.filter(c =>
//         c.name.toLowerCase().includes(search.toLowerCase()) &&
//         (!filter || c.company === filter)
//     );

//     return (
//         <div className="p-6 text-white">
//             <div className="flex items-center gap-4 mb-4">
//                 <input
//                     type="text"
//                     placeholder="Search by name..."
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     className="input"
//                 />
//                 <select onChange={(e) => setFilter(e.target.value)} className="input">
//                     <option value="">All Companies</option>
//                     {[...new Set(clients.map(c => c.company))].map(company => (
//                         <option key={company}>{company}</option>
//                     ))}
//                 </select>
//                 <button onClick={() => setShowClientModal(true)} className="btn">+ Add Client</button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {filteredClients.map(client => (
//                     <div key={client._id} className="bg-slate-800 p-4 rounded">
//                         <h3 className="text-xl font-bold">{client.name}</h3>
//                         <p>{client.email} | {client.phone}</p>
//                         <p className="italic text-sm">{client.company} - {client.notes}</p>
//                         <button onClick={() => { setShowWorkModal(true); setSelectedClientId(client._id); }} className="btn-sm mt-2">+ Add Work</button>
//                         <div className="mt-2 space-y-2">
//                             {client.works?.map(work => (
//                                 <div key={work._id} className="bg-slate-700 p-3 rounded">
//                                     <p className="font-semibold">🔹 {work.fieldOfWork}</p>
//                                     <p className="text-sm">{work.workDescription}</p>
//                                     <p className="text-sm">Cost: ₹{work.cost}</p>
//                                     <p className="text-sm">Status: {work.paymentStatus}</p>
//                                     <div className="flex gap-2 mt-1">
//                                         <select
//                                             value={work.paymentStatus}
//                                             onChange={(e) => handleWorkChange(client._id, work._id, { paymentStatus: e.target.value })}
//                                             className="input-sm"
//                                         >
//                                             <option>Pending</option>
//                                             <option>Paid</option>
//                                             <option>Overdue</option>
//                                         </select>
//                                         {work.paymentStatus === 'Pending' && (
//                                             <>
//                                                 <button className="btn-sm bg-green-600">Mail</button>
//                                                 <button className="btn-sm bg-blue-600">WhatsApp</button>
//                                             </>
//                                         )}
//                                         <button onClick={() => handleDeleteWork(client._id, work._id)} className="btn-sm bg-red-600">Delete</button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Client Modal */}
//             {showClientModal && (
//                 <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
//                     <div className="bg-slate-800 p-6 rounded w-full max-w-md">
//                         <h2 className="text-xl mb-4 font-semibold">Add Client</h2>
//                         {['name', 'email', 'phone', 'company', 'notes'].map(field => (
//                             <input
//                                 key={field}
//                                 placeholder={field}
//                                 value={newClient[field]}
//                                 onChange={e => setNewClient({ ...newClient, [field]: e.target.value })}
//                                 className="input mb-2"
//                             />
//                         ))}
//                         <div className="flex gap-4 mt-4">
//                             <button onClick={handleAddClient} className="btn">Add</button>
//                             <button onClick={() => setShowClientModal(false)} className="btn bg-red-500">Cancel</button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Work Modal */}
//             {showWorkModal && (
//                 <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
//                     <div className="bg-slate-800 p-6 rounded w-full max-w-md">
//                         <h2 className="text-xl mb-4 font-semibold">Add Work</h2>
//                         {['fieldOfWork', 'workDescription', 'cost', 'startDate', 'endDate'].map(field => (
//                             <input
//                                 key={field}
//                                 placeholder={field}
//                                 type={field.includes('Date') ? 'date' : 'text'}
//                                 value={workDetails[field]}
//                                 onChange={e => setWorkDetails({ ...workDetails, [field]: e.target.value })}
//                                 className="input mb-2"
//                             />
//                         ))}
//                         <select
//                             value={workDetails.paymentStatus}
//                             onChange={e => setWorkDetails({ ...workDetails, paymentStatus: e.target.value })}
//                             className="input mb-2"
//                         >
//                             <option>Pending</option>
//                             <option>Paid</option>
//                             <option>Overdue</option>
//                         </select>
//                         <input type="file" onChange={(e) => setWorkFile(e.target.files[0])} className="input mb-2" />
//                         <div className="flex gap-4 mt-4">
//                             <button onClick={handleAddWork} className="btn">Add</button>
//                             <button onClick={() => setShowWorkModal(null)} className="btn bg-red-500">Cancel</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Clients;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Check, Crown, X, Zap } from 'lucide-react';
import { isLimitReached } from '../helpers/CheckLimit';

const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
    const [showClientModal, setShowClientModal] = useState(false);
    const [showWorkModal, setShowWorkModal] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [editClient, setEditClient] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedClientId, setSelectedClientId] = useState(null);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const [user, setUser] = useState(null);


    const [newClient, setNewClient] = useState({ name: '', email: '', phone: '', company: '', notes: '' });
    const [workDetails, setWorkDetails] = useState({
        fieldOfWork: '',
        workDescription: '',
        cost: '',
        startDate: '',
        endDate: '',
        paymentStatus: 'Pending',
        isWorkCompleted: false,
    });

    const [workFile, setWorkFile] = useState(null);
    const [subscription, setSubscription] = useState(null);
    const token = localStorage.getItem('authToken');
    const authHeaders = { headers: { Authorization: `Bearer ${token}` } };


// need to see if it works tomorrow 
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            return;
        }

        axios
            .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/freelancer/me`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setUser(res.data))
            .catch(() => setUser(null))
    }, []);
    const isClientLimitReached = isLimitReached(user, "clients");

    
    const fetchClients = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/clients`, authHeaders);
            setClients(data);
            console.log('Fetching clients...');
        } catch {
            toast.error('Failed to fetch clients');
            console.error('Failed to fetch clients');
        }
    };

    const handleAddClient = async () => {
        try {
            const { data } = await axios.post(`${BASE_URL}/api/clients`, newClient, authHeaders);
            setClients(data.clients);
            setNewClient({ name: '', email: '', phone: '', company: '', notes: '' });
            setShowClientModal(false);
            toast.success('Client added');
            console.log('Client added');
        } catch {
            toast.error('Error adding client');
            console.error('Error adding client');
        }
    };
    const handleOpenUpdateModal = (client) => {
        setSelectedClient(client);
        setEditClient(client); // prefill fields
        setShowUpdateModal(true);
    };
    const handleUpdateClient = async (clientId) => {
        try {
            const { data } = await axios.put(
                `${BASE_URL}/api/clients/${clientId}`,
                editClient,
                authHeaders
            );

            setClients(prev =>
                prev.map(c => (c._id === clientId ? data.client : c))
            );

            setShowUpdateModal(false);
            toast.success("Client updated");
        } catch (err) {
            console.error("Error updating client:", err);
            toast.error("Error updating client");
        }
    };

    const handleOpenDeleteModal = (client) => {
        setSelectedClient(client);
        setShowDeleteModal(true);
    };

    const handleDeleteClient = async (clientId) => {
        try {
            await axios.delete(`${BASE_URL}/api/clients/${clientId}`, authHeaders);

            setClients(prev => prev.filter(c => c._id !== clientId));

            setShowDeleteModal(false);
            toast.success("Client deleted");
        } catch (err) {
            console.error("Error deleting client:", err);
            toast.error("Error deleting client");
        }
    };

    const handleAddWork = async () => {
        const formData = new FormData();
        for (let key in workDetails) formData.append(key, workDetails[key]);
        if (workFile) formData.append('document', workFile);

        try {
            await axios.post(`${BASE_URL}/api/clients/${selectedClientId}/works`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setShowWorkModal(null);
            toast.success('Work added');
            console.log('Work added');
            fetchClients();
        } catch {
            toast.error('Failed to add work');
            console.error('Failed to add work');
        }
    };

    const handleWorkChange = (clientId, workId, updates) => {
        axios.put(`${BASE_URL}/api/clients/${clientId}/works/${workId}`, updates, authHeaders)
            .then(() => {
                toast.success('Work updated');
                fetchClients();
            })
            .catch(() => toast.error('Update failed'));
        console.log('Work updated');
        fetchClients();
    };

    const handleDeleteWork = (clientId, workId) => {
        axios.delete(`${BASE_URL}/api/clients/${clientId}/works/${workId}`, authHeaders)
            .then(() => {
                toast.success('Work deleted');
                fetchClients();
            })
            .catch(() => toast.error('Delete failed'));
        console.log('Work deleted');
        fetchClients();
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const filteredClients = clients.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) &&
        (!filter || c.company === filter)
    );


    const handleSendReminderEmail = async (clientId, workId) => {
        try {
            await axios.post(`${BASE_URL}/api/clients/${clientId}/works/${workId}/remind`, {}, authHeaders);
            toast.success('Reminder email sent!');
        } catch (err) {
            console.error(err);
            toast.error('Failed to send email');
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 sm:p-6 lg:p-8 w-full">
            {/* Header */}
            <div className="text-center mb-8 animate-slide-down">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                    Manage <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Clients</span>
                </h1>
                <p className="text-gray-600 text-lg">Manage your clients and their work projects</p>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search clients by name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer"
                        />
                    </div>
                    <select
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-4  cursor-pointer py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                    >
                        <option value="">All Companies</option>
                        {[...new Set(clients.map(c => c.company))].map(company => (
                            <option key={company} value={company}>{company}</option>
                        ))}
                    </select>
                    <button
                        onClick={() =>
                            isClientLimitReached ? setShowUpgradeModal(true) : setShowClientModal(true)
                        }
                        disabled={false} // still clickable, just changes behavior
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg cursor-pointer transition-all duration-200 transform active:scale-95 shadow-lg ${isClientLimitReached
                                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                                : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 hover:shadow-xl"
                            }`}
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                        </svg>
                        {isClientLimitReached ? "Upgrade to Unlock" : "Add Client"}
                    </button>

                </div>
            </div>

            {/* Clients Grid */}
            {filteredClients.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center animate-fade-in">
                    <div className="w-24 h-24 mx-auto mb-4 text-gray-300">
                        <svg fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No clients yet</h3>
                    <p className="text-gray-600 mb-6">Add your first client to get started!</p>
                    <button
                        onClick={() => setShowClientModal(true)}
                        className="flex items-center gap-2 mx-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl cursor-pointer"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Client
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredClients.map((client, index) => (
                        <div
                            key={client._id}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-slide-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Client Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{client.name}</h3>
                                    <p className="text-gray-600 text-sm mb-1">{client.email}</p>
                                    <p className="text-gray-600 text-sm">{client.phone}</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                    </svg>
                                </div>
                                
                            </div>
                            <div className="flex gap-2 mt-4 mb-4">
                                <button
                                    onClick={() => handleOpenUpdateModal(client)}
                                    className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all duration-200 cursor-pointer text-sm"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleOpenDeleteModal(client)}
                                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 cursor-pointer text-sm"
                                >
                                    Delete
                                </button>
                            </div>

                            {/* Company and Notes */}
                            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm font-medium text-gray-700">{client.company}</p>
                                {client.notes && (
                                    <p className="text-sm text-gray-600 mt-1 italic">{client.notes}</p>
                                )}
                            </div>

                            {/* Add Work Button */}
                            <button
                                onClick={() => { setShowWorkModal(true); setSelectedClientId(client._id); }}
                                className="w-full mb-4 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add Work
                            </button>

                            {/* Works List */}
                            {client.works && client.works.length > 0 && (
                                <div className="space-y-3">
                                    <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                        Projects ({client.works.length})
                                    </h4>
                                    {client.works.map(work => (
                                        <div key={work._id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
                                            <div className="flex items-start justify-between mb-2">
                                                <h5 className="font-semibold text-gray-900 flex items-center gap-2">
                                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                                    {work.fieldOfWork}
                                                </h5>
                                                <span className={ `px-2 py-1 text-xs rounded-full font-medium ${work.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' :
                                                        work.paymentStatus === 'Overdue' ? 'bg-red-100 text-red-800' :
                                                            'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {work.paymentStatus}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-2">
                                                {new Date(work.startDate).toLocaleDateString('en-IN', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })} - {new Date(work.endDate).toLocaleDateString('en-IN', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })}
                                            </p>
                                            <p className="text-sm text-gray-600 mb-2">{work.workDescription}</p>
                                            <p className="text-sm font-medium text-gray-900 mb-3">Cost: ₹{work.cost}</p>
                                            {/* <p className="text-xs text-gray-500 mb-3">
                                                Document:{" "}
                                                {work.document?.url ? (
                                                    <a
                                                        href={work.document.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-block text-xs bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition"
                                                    >
                                                        View Document
                                                    </a>
                                                ) : (
                                                    'No document uploaded'
                                                )}
                                            </p> */}



                                            {/* Work Actions */}
                                            <div className="flex flex-wrap gap-2">
                                                <select
                                                    value={work.paymentStatus}
                                                    onChange={(e) => handleWorkChange(client._id, work._id, { paymentStatus: e.target.value })}
                                                    className="text-xs px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Paid">Paid</option>
                                                    <option value="Overdue">Overdue</option>
                                                </select>
                                                {['Pending', 'Overdue'].includes(work.paymentStatus) && (
                                                    <>
                                                        <button
                                                            className="text-xs px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
                                                            onClick={() => handleSendReminderEmail(client._id, work._id)}
                                                        >
                                                            Mail
                                                        </button>

                                                        <a
                                                            href={`https://wa.me/${client.phoneNumber}?text=${encodeURIComponent(`Hi ${client.name}, this is a reminder that your payment for the project "${work.fieldOfWork}" is still marked as ${work.paymentStatus}. Please make the payment at your earliest convenience.`)}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {/* <button className="text-xs px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-200 cursor-pointer">
                                                                WhatsApp
                                                            </button> */}
                                                        </a>

                                                    </>
                                                )}

                                                <button
                                                    onClick={() => handleDeleteWork(client._id, work._id)}
                                                    className="text-xs px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer transition-colors duration-200"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Client Modal */}
            {showClientModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 animate-fade-in">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform animate-scale-in">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900 cursor-pointer">Add New Client</h2>
                        </div>
                        <div className="p-6 space-y-4">
                            {[
                                { field: 'name', label: 'Full Name', type: 'text' },
                                { field: 'email', label: 'Email Address', type: 'email' },
                                { field: 'phone', label: 'Phone Number', type: 'number' },
                                { field: 'company', label: 'Company', type: 'text' },
                                { field: 'notes', label: 'Notes', type: 'text' }
                            ].map(({ field, label, type }) => (
                                <div key={field}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                                    <input
                                        type={type}
                                        placeholder={`Enter ${label.toLowerCase()}`}
                                        value={newClient[field]}
                                        onChange={e => setNewClient({ ...newClient, [field]: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="p-6 border-t border-gray-200 flex gap-3">
                            <button
                                onClick={handleAddClient}
                                className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer"
                            >
                                Add Client
                            </button>
                            <button
                                onClick={() => setShowClientModal(false)}
                                className="flex-1 px-4 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all duration-200 cursor-pointer"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Update Client Modal */}
            {showUpdateModal && selectedClient && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 animate-fade-in">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform animate-scale-in">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900">Update Client</h2>
                        </div>
                        <div className="p-6 space-y-4">
                            {[
                                { field: 'name', label: 'Full Name', type: 'text' },
                                { field: 'email', label: 'Email Address', type: 'email' },
                                { field: 'phone', label: 'Phone Number', type: 'number' },
                                { field: 'company', label: 'Company', type: 'text' },
                                { field: 'notes', label: 'Notes', type: 'text' }
                            ].map(({ field, label, type }) => (
                                <div key={field}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                                    <input
                                        type={type}
                                        placeholder={`Enter ${label.toLowerCase()}`}
                                        value={editClient[field] || ""}
                                        onChange={e => setEditClient({ ...editClient, [field]: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="p-6 border-t border-gray-200 flex gap-3">
                            <button
                                onClick={() => handleUpdateClient(selectedClient._id)}
                                className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer"
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={() => setShowUpdateModal(false)}
                                className="flex-1 px-4 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all duration-200 cursor-pointer"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteModal && selectedClient && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 animate-fade-in">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform animate-scale-in">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900">Delete Client</h2>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-700">
                                Are you sure you want to delete <span className="font-semibold">{selectedClient.name}</span>?
                                This action cannot be undone.
                            </p>
                        </div>
                        <div className="p-6 border-t border-gray-200 flex gap-3">
                            <button
                                onClick={() => handleDeleteClient(selectedClient._id)}
                                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 px-4 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all duration-200 cursor-pointer"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}




            {/* Work Modal */}
            {showWorkModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 animate-fade-in">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto transform animate-scale-in">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900">Add New Work</h2>
                        </div>
                        <div className="p-6 space-y-4">
                            {[
                                { field: 'fieldOfWork', label: 'Field of Work', type: 'text' },
                                { field: 'workDescription', label: 'Work Description', type: 'text' },
                                { field: 'cost', label: 'Cost (₹)', type: 'number' },
                                { field: 'startDate', label: 'Start Date', type: 'date' },
                                { field: 'endDate', label: 'End Date', type: 'date' }
                            ].map(({ field, label, type }) => (
                                <div key={field}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                                    <input
                                        type={type}
                                        placeholder={type === 'text' ? `Enter ${label.toLowerCase()}` : ''}
                                        value={workDetails[field]}
                                        onChange={e => setWorkDetails({ ...workDetails, [field]: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    />
                                </div>
                            ))}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                                <select
                                    value={workDetails.paymentStatus}
                                    onChange={e => setWorkDetails({ ...workDetails, paymentStatus: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Paid">Paid</option>
                                    <option value="Overdue">Overdue</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Document (Optional)</label>
                                <input
                                    type="file"
                                    onChange={(e) => setWorkFile(e.target.files[0])}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-200 flex gap-3">
                            <button
                                onClick={handleAddWork}
                                className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer"
                            >
                                Add Work
                            </button>
                            <button
                                onClick={() => setShowWorkModal(null)}
                                className="flex-1 px-4 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all duration-200 cursor-pointer"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

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


            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slide-up {
                    from { 
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes scale-in {
                    from { 
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    to { 
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
                
                .animate-slide-up {
                    animation: slide-up 0.5s ease-out;
                    animation-fill-mode: both;
                }
                
                .animate-scale-in {
                    animation: scale-in 0.2s ease-out;
                }
            `}</style>
        </div>
    );
};

export default Clients;