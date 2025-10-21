// import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { toast } from 'react-toastify';

// const PAGE_SIZE = 10;

// const ProposalTable = () => {
//   const [proposals, setProposals] = useState([]);
//   const [filteredProposals, setFilteredProposals] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [sortOrder, setSortOrder] = useState('desc');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [animateContent, setAnimateContent] = useState(false);

//   // const token = localStorage.getItem('authToken');

//   // Mock data for demo
//   const mockProposals = [
//     {
//       _id: '1',
//       clientName: 'Sarah Johnson',
//       clientEmail: 'sarah@techcorp.com',
//       projectTitle: 'E-commerce Website Development',
//       status: 'Accepted',
//       createdAt: '2024-07-20T10:30:00Z',
//       document: { url: 'https://example.com/proposal1.pdf' }
//     },
//     {
//       _id: '2',
//       clientName: 'Michael Chen',
//       clientEmail: 'michael@startup.io',
//       projectTitle: 'Mobile App UI/UX Design',
//       status: 'Pending',
//       createdAt: '2024-07-25T14:15:00Z',
//       document: { url: 'https://example.com/proposal2.pdf' }
//     },
//     {
//       _id: '3',
//       clientName: 'Emily Davis',
//       clientEmail: 'emily@marketing.co',
//       projectTitle: 'Brand Identity Package',
//       status: 'Rejected',
//       createdAt: '2024-07-28T09:45:00Z',
//       document: { url: 'https://example.com/proposal3.pdf' }
//     },
//     {
//       _id: '4',
//       clientName: 'David Wilson',
//       clientEmail: 'david@enterprise.com',
//       projectTitle: 'Web Application Development',
//       status: 'Pending',
//       createdAt: '2024-07-30T16:20:00Z',
//       document: { url: 'https://example.com/proposal4.pdf' }
//     },
//     {
//       _id: '5',
//       clientName: 'Lisa Anderson',
//       clientEmail: 'lisa@agency.net',
//       projectTitle: 'Digital Marketing Campaign',
//       status: 'Accepted',
//       createdAt: '2024-08-01T11:10:00Z',
//       document: { url: 'https://example.com/proposal5.pdf' }
//     },
//     {
//       _id: '6',
//       clientName: 'Robert Brown',
//       clientEmail: 'robert@consulting.biz',
//       projectTitle: 'Business Automation System',
//       status: 'Pending',
//       createdAt: '2024-08-03T13:25:00Z',
//       document: { url: 'https://example.com/proposal6.pdf' }
//     }
//   ];

//   const fetchProposals = async () => {
//     try {
//       // const res = await axios.get(
//       //   `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/proposal/my-proposals`,
//       //   {
//       //     headers: {
//       //       Authorization: `Bearer ${token}`,
//       //     },
//       //   }
//       // );
//       // setProposals(res.data.proposals);

//       // Mock API call
//       setTimeout(() => {
//         setProposals(mockProposals);
//         setLoading(false);
//         setAnimateContent(true);
//       }, 1000);
//     } catch (err) {
//       console.error('Failed to fetch proposals:', err);
//       // toast.error('Failed to load proposals');
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProposals();
//   }, []);

//   useEffect(() => {
//     let data = [...proposals];

//     if (searchTerm) {
//       data = data.filter(
//         (p) =>
//           p.projectTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           p.clientEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           p.clientName?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     if (statusFilter) {
//       data = data.filter((p) => p.status === statusFilter);
//     }

//     data.sort((a, b) => {
//       const dateA = new Date(a.createdAt);
//       const dateB = new Date(b.createdAt);
//       return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
//     });

//     setFilteredProposals(data);
//     setCurrentPage(1);
//   }, [searchTerm, statusFilter, sortOrder, proposals]);

//   const paginated = filteredProposals.slice(
//     (currentPage - 1) * PAGE_SIZE,
//     currentPage * PAGE_SIZE
//   );

//   const totalPages = Math.ceil(filteredProposals.length / PAGE_SIZE);

//   // Calculate stats
//   const totalProposals = filteredProposals.length;
//   const acceptedCount = filteredProposals.filter(p => p.status === 'Accepted').length;
//   const pendingCount = filteredProposals.filter(p => p.status === 'Pending').length;
//   const rejectedCount = filteredProposals.filter(p => p.status === 'Rejected').length;

//   if (loading) {
//     return (
//       <div className="min-h-screen w-7xl flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
//           <p className="text-lg text-gray-600">Loading proposals...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-6">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-8 animate-fade-in">
//           <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
//             Proposal Management
//           </h1>
//           <p className="text-gray-600 text-lg max-w-2xl mx-auto">
//             Track and manage all your business proposals in one place
//           </p>
//         </div>

//         {/* Stats Cards */}
//         <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 transform transition-all duration-700 ${animateContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
//           <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 text-xs sm:text-sm font-medium">Total</p>
//                 <p className="text-xl sm:text-2xl font-bold text-gray-800">{totalProposals}</p>
//               </div>
//               <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
//                 <span className="text-lg sm:text-2xl">📄</span>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow duration-300">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 text-xs sm:text-sm font-medium">Accepted</p>
//                 <p className="text-xl sm:text-2xl font-bold text-gray-800">{acceptedCount}</p>
//               </div>
//               <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center">
//                 <span className="text-lg sm:text-2xl">✅</span>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border-l-4 border-orange-500 hover:shadow-xl transition-shadow duration-300">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 text-xs sm:text-sm font-medium">Pending</p>
//                 <p className="text-xl sm:text-2xl font-bold text-gray-800">{pendingCount}</p>
//               </div>
//               <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-xl flex items-center justify-center">
//                 <span className="text-lg sm:text-2xl">⏳</span>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border-l-4 border-red-500 hover:shadow-xl transition-shadow duration-300">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 text-xs sm:text-sm font-medium">Rejected</p>
//                 <p className="text-xl sm:text-2xl font-bold text-gray-800">{rejectedCount}</p>
//               </div>
//               <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-xl flex items-center justify-center">
//                 <span className="text-lg sm:text-2xl">❌</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className={`bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-700 delay-200 ${animateContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
//           {/* Search, Filter, Sort Controls */}
//           <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
//             <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
//               <div className="relative flex-1 max-w-md">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                   </svg>
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Search by project, client, or email"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                 />
//               </div>

//               <div className="flex flex-col sm:flex-row gap-3">
//                 <select
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                   className="px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
//                 >
//                   <option value="">All Statuses</option>
//                   <option value="Pending">Pending</option>
//                   <option value="Accepted">Accepted</option>
//                   <option value="Rejected">Rejected</option>
//                 </select>

//                 <select
//                   value={sortOrder}
//                   onChange={(e) => setSortOrder(e.target.value)}
//                   className="px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
//                 >
//                   <option value="desc">Newest First</option>
//                   <option value="asc">Oldest First</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Proposals Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
//                 <tr>
//                   <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Client</th>
//                   <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Project</th>
//                   <th className="px-4 sm:px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">Status</th>
//                   <th className="px-4 sm:px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">Date</th>
//                   <th className="px-4 sm:px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">Document</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {paginated.length > 0 ? (
//                   paginated.map((p, index) => (
//                     <tr
//                       key={p._id}
//                       className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 transform hover:scale-[1.01] ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
//                         }`}
//                       style={{
//                         animationDelay: `${index * 100}ms`,
//                         animation: animateContent ? 'slideInUp 0.6s ease-out forwards' : 'none'
//                       }}
//                     >
//                       <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
//                             <span className="text-white text-sm font-semibold">
//                               {p.clientName?.charAt(0) || 'N'}
//                             </span>
//                           </div>
//                           <div className="min-w-0 flex-1">
//                             <div className="text-sm sm:text-base font-medium text-gray-900 truncate">{p.clientName || 'N/A'}</div>
//                             <div className="text-xs sm:text-sm text-gray-500 truncate">{p.clientEmail}</div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-4 sm:px-6 py-4">
//                         <div className="text-sm sm:text-base font-medium text-gray-900 leading-5">
//                           {p.projectTitle}
//                         </div>
//                       </td>
//                       <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center">
//                         <span className={`inline-flex px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${p.status === 'Accepted'
//                             ? 'bg-green-100 text-green-800 border border-green-200'
//                             : p.status === 'Pending'
//                               ? 'bg-orange-100 text-orange-800 border border-orange-200'
//                               : 'bg-red-100 text-red-800 border border-red-200'
//                           }`}>
//                           {p.status === 'Accepted' ? '✅ ' : p.status === 'Pending' ? '⏳ ' : '❌ '}{p.status}
//                         </span>
//                       </td>
//                       <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">
//                         {new Date(p.createdAt).toLocaleDateString()}
//                       </td>
//                       <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center">
//                         {p.document?.url ? (
//                           <a
//                             href={p.document.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="inline-flex items-center px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
//                           >
//                             <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                             </svg>
//                             View
//                           </a>
//                         ) : (
//                           <span className="text-gray-400 text-sm">N/A</span>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="5" className="px-6 py-12 text-center">
//                       <div className="flex flex-col items-center justify-center">
//                         <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//                           <span className="text-3xl">📋</span>
//                         </div>
//                         <h3 className="text-lg font-medium text-gray-900 mb-2">No proposals found</h3>
//                         <p className="text-gray-500">Try adjusting your search or filter criteria</p>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination Controls */}
//           {totalPages > 1 && (
//             <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
//               <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//                 <div className="text-sm text-gray-700">
//                   Showing {((currentPage - 1) * PAGE_SIZE) + 1} to {Math.min(currentPage * PAGE_SIZE, filteredProposals.length)} of {filteredProposals.length} results
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                     disabled={currentPage === 1}
//                     className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
//                   >
//                     Previous
//                   </button>

//                   <div className="flex gap-1">
//                     {Array.from({ length: totalPages }).map((_, i) => (
//                       <button
//                         key={i}
//                         onClick={() => setCurrentPage(i + 1)}
//                         className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${currentPage === i + 1
//                             ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md transform scale-105'
//                             : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
//                           }`}
//                       >
//                         {i + 1}
//                       </button>
//                     ))}
//                   </div>

//                   <button
//                     onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//                     disabled={currentPage === totalPages}
//                     className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Success Rate & Quick Actions */}
//         <div className={`mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 transform transition-all duration-700 delay-400 ${animateContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
//           {/* Success Rate Card */}
//           <div className="bg-white rounded-2xl shadow-lg p-6">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">Success Rate</h3>
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <span className="text-gray-600">Acceptance Rate</span>
//                 <span className="font-semibold text-green-600">
//                   {totalProposals > 0 ? Math.round((acceptedCount / totalProposals) * 100) : 0}%
//                 </span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div
//                   className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-1000"
//                   style={{ width: `${totalProposals > 0 ? (acceptedCount / totalProposals) * 100 : 0}%` }}
//                 ></div>
//               </div>
//               <div className="grid grid-cols-3 gap-4 mt-6">
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-green-600">{acceptedCount}</div>
//                   <div className="text-xs text-gray-500">Accepted</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-orange-600">{pendingCount}</div>
//                   <div className="text-xs text-gray-500">Pending</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-red-600">{rejectedCount}</div>
//                   <div className="text-xs text-gray-500">Rejected</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Quick Actions */}
//           <div className="bg-white rounded-2xl shadow-lg p-6">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
//             <div className="space-y-3">
//               <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
//                 Create New Proposal
//               </button>
//               <button className="w-full px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-purple-500 hover:text-purple-600 transition-all duration-300">
//                 Export Proposals
//               </button>
//               <button className="w-full px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all duration-300">
//                 View Analytics
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes slideInUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes fade-in {
//           from {
//             opacity: 0;
//           }
//           to {
//             opacity: 1;
//           }
//         }
        
//         .animate-fade-in {
//           animation: fade-in 1s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProposalTable;


import React, { useEffect, useState } from 'react';

const PAGE_SIZE = 10;

const ProposalTable = () => {
  const [proposals, setProposals] = useState([]);
  const [filteredProposals, setFilteredProposals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [animateContent, setAnimateContent] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Mock data for demo
  const mockProposals = [
    {
      _id: '1',
      clientName: 'Sarah Johnson',
      clientEmail: 'sarah@techcorp.com',
      projectTitle: 'E-commerce Website Development',
      status: 'Accepted',
      createdAt: '2024-07-20T10:30:00Z',
      document: { url: 'https://example.com/proposal1.pdf' }
    },
    {
      _id: '2',
      clientName: 'Michael Chen',
      clientEmail: 'michael@startup.io',
      projectTitle: 'Mobile App UI/UX Design',
      status: 'Pending',
      createdAt: '2024-07-25T14:15:00Z',
      document: { url: 'https://example.com/proposal2.pdf' }
    },
    {
      _id: '3',
      clientName: 'Emily Davis',
      clientEmail: 'emily@marketing.co',
      projectTitle: 'Brand Identity Package',
      status: 'Rejected',
      createdAt: '2024-07-28T09:45:00Z',
      document: { url: 'https://example.com/proposal3.pdf' }
    },
    {
      _id: '4',
      clientName: 'David Wilson',
      clientEmail: 'david@enterprise.com',
      projectTitle: 'Web Application Development',
      status: 'Pending',
      createdAt: '2024-07-30T16:20:00Z',
      document: { url: 'https://example.com/proposal4.pdf' }
    },
    {
      _id: '5',
      clientName: 'Lisa Anderson',
      clientEmail: 'lisa@agency.net',
      projectTitle: 'Digital Marketing Campaign',
      status: 'Accepted',
      createdAt: '2024-08-01T11:10:00Z',
      document: { url: 'https://example.com/proposal5.pdf' }
    },
    {
      _id: '6',
      clientName: 'Robert Brown',
      clientEmail: 'robert@consulting.biz',
      projectTitle: 'Business Automation System',
      status: 'Pending',
      createdAt: '2024-08-03T13:25:00Z',
      document: { url: 'https://example.com/proposal6.pdf' }
    },
    {
      _id: '7',
      clientName: 'Jessica Smith',
      clientEmail: 'jessica@creative.studio',
      projectTitle: 'Logo Design & Branding',
      status: 'Accepted',
      createdAt: '2024-08-05T09:15:00Z',
      document: { url: 'https://example.com/proposal7.pdf' }
    },
    {
      _id: '8',
      clientName: 'Tom Wilson',
      clientEmail: 'tom@retailbiz.com',
      projectTitle: 'Inventory Management System',
      status: 'Pending',
      createdAt: '2024-08-07T14:30:00Z',
      document: { url: 'https://example.com/proposal8.pdf' }
    }
  ];

  const fetchProposals = async () => {
    try {
      setTimeout(() => {
        setProposals(mockProposals);
        setLoading(false);
        setTimeout(() => setAnimateContent(true), 100);
      }, 1500);
    } catch (err) {
      console.error('Failed to fetch proposals:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  useEffect(() => {
    let data = [...proposals];

    if (searchTerm) {
      data = data.filter(
        (p) =>
          p.projectTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.clientEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.clientName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      data = data.filter((p) => p.status === statusFilter);
    }

    data.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    setFilteredProposals(data);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, sortOrder, proposals]);

  const paginated = filteredProposals.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const totalPages = Math.ceil(filteredProposals.length / PAGE_SIZE);

  // Calculate stats
  const totalProposals = filteredProposals.length;
  const acceptedCount = filteredProposals.filter(p => p.status === 'Accepted').length;
  const pendingCount = filteredProposals.filter(p => p.status === 'Pending').length;
  const rejectedCount = filteredProposals.filter(p => p.status === 'Rejected').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 w-full">
        <div className=" mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
            <div className="h-64 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <div className={`transform transition-all duration-1000 ${animateContent ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 sm:mb-4 leading-tight">
              Proposal Management
            </h1>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
              Track and manage all your business proposals in one place
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          {[
            { label: 'Total', count: totalProposals, color: 'blue', icon: '📄', delay: 0 },
            { label: 'Accepted', count: acceptedCount, color: 'green', icon: '✅', delay: 100 },
            { label: 'Pending', count: pendingCount, color: 'orange', icon: '⏳', delay: 200 },
            { label: 'Rejected', count: rejectedCount, color: 'red', icon: '❌', delay: 300 }
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={`bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 lg:p-6 border-l-4 border-${stat.color}-500 hover:shadow-xl hover:scale-105 transition-all duration-300 transform ${animateContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              style={{ transitionDelay: `${stat.delay}ms` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-xs sm:text-sm font-medium">{stat.label}</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 animate-pulse">
                    {stat.count}
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gray-100 rounded-lg sm:rounded-xl flex items-center justify-center hover:rotate-12 transition-transform duration-300">
                  <span className="text-sm sm:text-lg lg:text-2xl">{stat.icon}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className={`bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden transform transition-all duration-1000 ${animateContent ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
          }`} style={{ transitionDelay: '400ms' }}>

          {/* Search, Filter, Sort Controls */}
          <div className="p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between lg:space-x-4">
              {/* Search Input */}
              <div className="relative flex-1 max-w-full lg:max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className={`h-4 w-4 sm:h-5 sm:w-5 transition-colors duration-200 ${isSearchFocused ? 'text-blue-500' : 'text-gray-400'
                    }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search by project, client, or email"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="block w-full pl-8 sm:pl-10 pr-3 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 hover:shadow-md"
                >
                  <option value="">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>

                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 hover:shadow-md"
                >
                  <option value="desc">Newest First</option>
                  <option value="asc">Oldest First</option>
                </select>
              </div>
            </div>
          </div>

          {/* Mobile Card View (visible on small screens) */}
          <div className="block lg:hidden">
            {paginated.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {paginated.map((p, index) => (
                  <div
                    key={p._id}
                    className={`p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 transform hover:scale-[1.02] ${animateContent ? 'animate-slideInUp' : 'opacity-0'
                      }`}
                    style={{ animationDelay: `${600 + index * 100}ms` }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-semibold">
                          {p.clientName?.charAt(0) || 'N'}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-semibold text-gray-900 truncate">{p.projectTitle}</h3>
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${p.status === 'Accepted'
                              ? 'bg-green-100 text-green-800 border border-green-200'
                              : p.status === 'Pending'
                                ? 'bg-orange-100 text-orange-800 border border-orange-200'
                                : 'bg-red-100 text-red-800 border border-red-200'
                            }`}>
                            {p.status === 'Accepted' ? '✅ ' : p.status === 'Pending' ? '⏳ ' : '❌ '}{p.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mb-1">{p.clientName}</div>
                        <div className="text-xs text-gray-500 mb-2">{p.clientEmail}</div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {new Date(p.createdAt).toLocaleDateString()}
                          </span>
                          {p.document?.url && (
                            <a
                              href={p.document.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                            >
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              View
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto animate-bounce">
                  <span className="text-3xl">📋</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No proposals found</h3>
                <p className="text-gray-500 text-sm">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>

          {/* Desktop Table View (hidden on small screens) */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <tr>
                  <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Client</th>
                  <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Project</th>
                  <th className="px-4 sm:px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">Status</th>
                  <th className="px-4 sm:px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">Date</th>
                  <th className="px-4 sm:px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">Document</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginated.length > 0 ? (
                  paginated.map((p, index) => (
                    <tr
                      key={p._id}
                      className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 transform hover:scale-[1.01] ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                        } ${animateContent ? 'animate-slideInUp' : 'opacity-0'}`}
                      style={{ animationDelay: `${600 + index * 100}ms` }}
                    >
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0 hover:rotate-12 transition-transform duration-300">
                            <span className="text-white text-sm font-semibold">
                              {p.clientName?.charAt(0) || 'N'}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm sm:text-base font-medium text-gray-900 truncate">{p.clientName || 'N/A'}</div>
                            <div className="text-xs sm:text-sm text-gray-500 truncate">{p.clientEmail}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="text-sm sm:text-base font-medium text-gray-900 leading-5">
                          {p.projectTitle}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex px-2 sm:px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 hover:scale-110 ${p.status === 'Accepted'
                            ? 'bg-green-100 text-green-800 border border-green-200 hover:bg-green-200'
                            : p.status === 'Pending'
                              ? 'bg-orange-100 text-orange-800 border border-orange-200 hover:bg-orange-200'
                              : 'bg-red-100 text-red-800 border border-red-200 hover:bg-red-200'
                          }`}>
                          {p.status === 'Accepted' ? '✅ ' : p.status === 'Pending' ? '⏳ ' : '❌ '}{p.status}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">
                        {new Date(p.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center">
                        {p.document?.url ? (
                          <a
                            href={p.document.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                          >
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View
                          </a>
                        ) : (
                          <span className="text-gray-400 text-sm">N/A</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
                          <span className="text-3xl">📋</span>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No proposals found</h3>
                        <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="px-4 sm:px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs sm:text-sm text-gray-700 order-2 sm:order-1">
                  Showing {((currentPage - 1) * PAGE_SIZE) + 1} to {Math.min(currentPage * PAGE_SIZE, filteredProposals.length)} of {filteredProposals.length} results
                </div>

                <div className="flex items-center gap-1 sm:gap-2 order-1 sm:order-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
                  >
                    Previous
                  </button>

                  <div className="flex gap-1">
                    {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm rounded-lg font-medium transition-all duration-200 hover:scale-105 ${currentPage === pageNum
                              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md transform scale-105'
                              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                            }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Success Rate & Quick Actions */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Success Rate Card */}
          <div className={`bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 transform transition-all duration-1000 ${animateContent ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
            }`} style={{ transitionDelay: '800ms' }}>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Success Rate</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-sm sm:text-base">Acceptance Rate</span>
                <span className="font-semibold text-green-600 text-lg sm:text-xl animate-pulse">
                  {totalProposals > 0 ? Math.round((acceptedCount / totalProposals) * 100) : 0}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full transition-all duration-2000 ease-out transform origin-left animate-slideInRight"
                  style={{
                    width: `${totalProposals > 0 ? (acceptedCount / totalProposals) * 100 : 0}%`,
                    animationDelay: '1000ms'
                  }}
                ></div>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6">
                <div className="text-center transform hover:scale-110 transition-transform duration-300">
                  <div className="text-xl sm:text-2xl font-bold text-green-600 animate-countUp">{acceptedCount}</div>
                  <div className="text-xs text-gray-500">Accepted</div>
                </div>
                <div className="text-center transform hover:scale-110 transition-transform duration-300">
                  <div className="text-xl sm:text-2xl font-bold text-orange-600 animate-countUp">{pendingCount}</div>
                  <div className="text-xs text-gray-500">Pending</div>
                </div>
                <div className="text-center transform hover:scale-110 transition-transform duration-300">
                  <div className="text-xl sm:text-2xl font-bold text-red-600 animate-countUp">{rejectedCount}</div>
                  <div className="text-xs text-gray-500">Rejected</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className={`bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 transform transition-all duration-1000 ${animateContent ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
            }`} style={{ transitionDelay: '900ms' }}>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl active:scale-95">
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create New Proposal
                </span>
              </button>
              <button className="w-full px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-purple-500 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 active:scale-95">
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Export Proposals
                </span>
              </button>
              <button className="w-full px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 active:scale-95">
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  View Analytics
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes countUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out forwards;
        }
        
        .animate-slideInRight {
          animation: slideInRight 1.5s ease-out forwards;
        }
        
        .animate-countUp {
          animation: countUp 0.8s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        
        /* Responsive improvements */
        @media (max-width: 640px) {
          .animate-slideInUp {
            animation-duration: 0.4s;
          }
        }
        
        /* Enhanced hover effects */
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        
        /* Loading animation improvements */
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        /* Custom scrollbar for webkit browsers */
        .overflow-x-auto::-webkit-scrollbar {
          height: 6px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-thumb {
          background: linear-gradient(to right, #3b82f6, #8b5cf6);
          border-radius: 10px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to right, #2563eb, #7c3aed);
        }
        
        /* Enhanced focus states */
        input:focus, select:focus, button:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        /* Smooth transitions for all interactive elements */
        * {
          scroll-behavior: smooth;
        }
        
        /* Enhanced mobile touch targets */
        @media (max-width: 768px) {
          button, a, input, select {
            min-height: 44px;
            min-width: 44px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProposalTable;