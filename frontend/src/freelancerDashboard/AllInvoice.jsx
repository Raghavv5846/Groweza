// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const PAGE_SIZE = 10;

// const InvoiceTable = () => {
//   const [user, setUser] = useState(null);
//   const [invoices, setInvoices] = useState([]);
//   const [filteredInvoices, setFilteredInvoices] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [sortOrder, setSortOrder] = useState('desc');
//   const [currentPage, setCurrentPage] = useState(1);

//   const token = localStorage.getItem('authToken');

//   const fetchProfile = async () => {
//     try {
//       const { data } = await axios.get(
//         `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/freelancer/me`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setUser(data);
//       fetchInvoices(data._id);
//     } catch {
//       toast.error('Failed to load profile');
//     }
//   };

//   const fetchInvoices = async (freelancerId) => {
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/invoices/${freelancerId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setInvoices(res.data.invoices);
//     } catch (err) {
//       console.error('Error fetching invoices:', err);
//       toast.error('Failed to load invoices');
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   useEffect(() => {
//     let data = [...invoices];

//     if (searchTerm) {
//       data = data.filter(
//         (inv) =>
//           inv.invoiceNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           inv.client?.name?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     if (statusFilter) {
//       data = data.filter((inv) => inv.status === statusFilter);
//     }

//     data.sort((a, b) => {
//       const dateA = new Date(a.generatedAt);
//       const dateB = new Date(b.generatedAt);
//       return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
//     });

//     setFilteredInvoices(data);
//     setCurrentPage(1);
//   }, [searchTerm, statusFilter, sortOrder, invoices]);

//   const paginatedInvoices = filteredInvoices.slice(
//     (currentPage - 1) * PAGE_SIZE,
//     currentPage * PAGE_SIZE
//   );

//   const totalPages = Math.ceil(filteredInvoices.length / PAGE_SIZE);

//   return (
//     <div className="p-4 space-y-4">
//       {/* Search, Filter, Sort Controls */}
//       <div className="flex flex-wrap gap-4 justify-between items-center">
//         <input
//           type="text"
//           placeholder="Search invoice # or client name"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="border px-3 py-2 rounded w-full md:w-1/3"
//         />

//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="border px-3 py-2 rounded"
//         >
//           <option value="">All Statuses</option>
//           <option value="Pending">Pending</option>
//           <option value="Paid">Paid</option>
//         </select>

//         <select
//           value={sortOrder}
//           onChange={(e) => setSortOrder(e.target.value)}
//           className="border px-3 py-2 rounded"
//         >
//           <option value="desc">Newest First</option>
//           <option value="asc">Oldest First</option>
//         </select>
//       </div>

//       {/* Invoice Table */}
//       <table className="w-full border mt-4">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-2 border">Invoice #</th>
//             <th className="p-2 border">Client</th>
//             <th className="p-2 border">Status</th>
//             <th className="p-2 border">Amount ($)</th>
//             <th className="p-2 border">Generated</th>
//             <th className="p-2 border">Link</th>
//           </tr>
//         </thead>
//         <tbody>
//           {paginatedInvoices.length > 0 ? (
//             paginatedInvoices.map((inv) => (
//               <tr key={inv.invoiceId} className="text-center">
//                 <td className="p-2 border">{inv.invoiceNumber}</td>
//                 <td className="p-2 border">{inv.client?.name || 'N/A'}</td>
//                 <td className="p-2 border">{inv.status}</td>
//                 <td className="p-2 border">{inv.amount}</td>
//                 <td className="p-2 border">
//                   {new Date(inv.generatedAt).toLocaleDateString()}
//                 </td>
//                 <td className="p-2 border">
//                   {inv.pdfUrl ? (
//                     <a
//                       href={inv.pdfUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-600 underline"
//                     >
//                       View
//                     </a>
//                   ) : (
//                     'N/A'
//                   )}
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6" className="text-center p-4">
//                 No invoices found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Pagination Controls */}
//       <div className="flex justify-center mt-4 gap-2">
//         {Array.from({ length: totalPages }).map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setCurrentPage(i + 1)}
//             className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-black text-white' : 'bg-gray-200'
//               }`}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default InvoiceTable;


import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

const PAGE_SIZE = 10;

const InvoiceTable = () => {
  const [user, setUser] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [animateContent, setAnimateContent] = useState(false);

  // const token = localStorage.getItem('authToken');

  // Mock data for demo
  const mockInvoices = [
    {
      invoiceId: '1',
      invoiceNumber: 'INV-2024-001',
      client: { name: 'Acme Corp' },
      status: 'Paid',
      amount: 2500,
      generatedAt: '2024-07-15T10:30:00Z',
      pdfUrl: 'https://example.com/invoice1.pdf'
    },
    {
      invoiceId: '2',
      invoiceNumber: 'INV-2024-002',
      client: { name: 'Tech Solutions Inc' },
      status: 'Pending',
      amount: 1800,
      generatedAt: '2024-07-20T14:15:00Z',
      pdfUrl: 'https://example.com/invoice2.pdf'
    },
    {
      invoiceId: '3',
      invoiceNumber: 'INV-2024-003',
      client: { name: 'Digital Agency' },
      status: 'Paid',
      amount: 3200,
      generatedAt: '2024-07-25T09:45:00Z',
      pdfUrl: 'https://example.com/invoice3.pdf'
    },
    {
      invoiceId: '4',
      invoiceNumber: 'INV-2024-004',
      client: { name: 'StartupXYZ' },
      status: 'Pending',
      amount: 1500,
      generatedAt: '2024-07-28T16:20:00Z',
      pdfUrl: 'https://example.com/invoice4.pdf'
    },
    {
      invoiceId: '5',
      invoiceNumber: 'INV-2024-005',
      client: { name: 'Enterprise Solutions' },
      status: 'Paid',
      amount: 4500,
      generatedAt: '2024-07-30T11:10:00Z',
      pdfUrl: 'https://example.com/invoice5.pdf'
    }
  ];

  const fetchProfile = async () => {
    try {
      // const { data } = await axios.get(
      //   `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/freelancer/me`,
      //   {
      //     headers: { Authorization: `Bearer ${token}` },
      //   }
      // );
      // setUser(data);
      // fetchInvoices(data._id);

      // Mock API call
      setTimeout(() => {
        setUser({ _id: 'user123', name: 'John Doe' });
        fetchInvoices('user123');
      }, 500);
    } catch {
      // toast.error('Failed to load profile');
      console.error('Failed to load profile');
    }
  };

  const fetchInvoices = async (freelancerId) => {
    try {
      // const res = await axios.get(
      //   `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/invoices/${freelancerId}`,
      //   {
      //     headers: { Authorization: `Bearer ${token}` },
      //   }
      // );
      // setInvoices(res.data.invoices);

      // Mock API call
      setTimeout(() => {
        setInvoices(mockInvoices);
        setLoading(false);
        setAnimateContent(true);
      }, 800);
    } catch (err) {
      console.error('Error fetching invoices:', err);
      // toast.error('Failed to load invoices');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    let data = [...invoices];

    if (searchTerm) {
      data = data.filter(
        (inv) =>
          inv.invoiceNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inv.client?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      data = data.filter((inv) => inv.status === statusFilter);
    }

    data.sort((a, b) => {
      const dateA = new Date(a.generatedAt);
      const dateB = new Date(b.generatedAt);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    setFilteredInvoices(data);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, sortOrder, invoices]);

  const paginatedInvoices = filteredInvoices.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const totalPages = Math.ceil(filteredInvoices.length / PAGE_SIZE);

  // Calculate stats
  const totalAmount = filteredInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidAmount = filteredInvoices.filter(inv => inv.status === 'Paid').reduce((sum, inv) => sum + inv.amount, 0);
  const pendingAmount = filteredInvoices.filter(inv => inv.status === 'Pending').reduce((sum, inv) => sum + inv.amount, 0);

  if (loading) {
    return (
      <div className="min-h-screen w-7xl  flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
          <p className="text-lg text-gray-600">Loading invoices...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-6">
      <div className="w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Invoice Management
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Track and manage all your invoices in one place
          </p>
        </div>

        {/* Stats Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 transform transition-all duration-700 ${animateContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Amount</p>
                <p className="text-2xl font-bold text-gray-800">${totalAmount.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Paid Amount</p>
                <p className="text-2xl font-bold text-gray-800">${paidAmount.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Pending Amount</p>
                <p className="text-2xl font-bold text-gray-800">${pendingAmount.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">⏳</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={`bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-700 delay-200 ${animateContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          {/* Search, Filter, Sort Controls */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search invoice # or client name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                </select>

                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="desc">Newest First</option>
                  <option value="asc">Oldest First</option>
                </select>
              </div>
            </div>
          </div>

          {/* Invoice Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Invoice #</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Client</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">Generated</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedInvoices.length > 0 ? (
                  paginatedInvoices.map((inv, index) => (
                    <tr
                      key={inv.invoiceId}
                      className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 transform hover:scale-[1.01] ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                        }`}
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: animateContent ? 'slideInUp 0.6s ease-out forwards' : 'none'
                      }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{inv.invoiceNumber}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-3">
                            <span className="text-white text-sm font-semibold">
                              {inv.client?.name?.charAt(0) || 'N'}
                            </span>
                          </div>
                          <div className="text-gray-900 font-medium">{inv.client?.name || 'N/A'}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${inv.status === 'Paid'
                            ? 'bg-green-100 text-green-800 border border-green-200'
                            : 'bg-orange-100 text-orange-800 border border-orange-200'
                          }`}>
                          {inv.status === 'Paid' ? '✅ ' : '⏳ '}{inv.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-lg font-bold text-gray-900">${inv.amount.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-600">
                        {new Date(inv.generatedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {inv.pdfUrl ? (
                          <a
                            href={inv.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <span className="text-3xl">📄</span>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices found</h3>
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
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-700">
                  Showing {((currentPage - 1) * PAGE_SIZE) + 1} to {Math.min(currentPage * PAGE_SIZE, filteredInvoices.length)} of {filteredInvoices.length} results
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Previous
                  </button>

                  <div className="flex gap-1">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${currentPage === i + 1
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md transform scale-105'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                          }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Additional Info Section */}
        <div className={`mt-8 bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-700 delay-400 ${animateContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Need Help Managing Invoices?</h3>
            <p className="text-gray-600 mb-6">Our platform makes it easy to create, send, and track your invoices</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Create New Invoice
              </button>
              <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-purple-500 hover:text-purple-600 transition-all duration-300">
                Export Data
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default InvoiceTable;