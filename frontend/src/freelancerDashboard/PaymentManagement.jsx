// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const PaymentManagement = () => {
//   const [clients, setClients] = useState([]);
//   const [works, setWorks] = useState([]);
//   const [search, setSearch] = useState('');
//   const [filter, setFilter] = useState('month');
//   const [sortBy, setSortBy] = useState('date');
//   const [stats, setStats] = useState({ paid: 0, pending: 0, overdue: 0 });

//   const token = localStorage.getItem('authToken');

//   const fetchAllWorks = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/clients`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setClients(res.data);

//       // Flatten all works
//       const allWorks = res.data.flatMap(client =>
//         client.works.map(work => ({
//           ...work,
//           clientName: client.name,
//           clientId: client._id,
//         }))
//       );
//       setWorks(allWorks);
//       updateStats(allWorks);
//     } catch (err) {
//       console.error(err);
//       toast.error('Failed to fetch payments');
//     }
//   };

//   const updateStats = (data) => {
//     const filtered = applyFilter(data);
//     setStats({
//       paid: filtered.filter(w => w.paymentStatus === 'Paid').length,
//       pending: filtered.filter(w => w.paymentStatus === 'Pending').length,
//       overdue: filtered.filter(w => w.paymentStatus === 'Overdue').length,
//     });
//   };

//   const applyFilter = (data) => {
//     const now = new Date();
//     return data.filter(work => {
//       const date = new Date(work.startDate);
//       if (filter === 'month') return date.getMonth() === now.getMonth();
//       if (filter === 'week') {
//         const diff = (now - date) / (1000 * 60 * 60 * 24);
//         return diff <= 7;
//       }
//       if (filter === 'year') return date.getFullYear() === now.getFullYear();
//       return true;
//     });
//   };

//   const handleStatusChange = async (clientId, workId, newStatus) => {
//     try {
//       await axios.put(
//         `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/payments/${clientId}/${workId}/payment`,
//         { paymentStatus: newStatus },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success('Status updated');
//       fetchAllWorks();
//     } catch (err) {
//       toast.error('Update failed');
//     }
//   };

//   useEffect(() => {
//     fetchAllWorks();
//   }, []);

//   const filteredWorks = applyFilter(
//     works.filter(w =>
//       w.clientName.toLowerCase().includes(search.toLowerCase()) ||
//       w.fieldOfWork.toLowerCase().includes(search.toLowerCase())
//     )
//   ).sort((a, b) => {
//     if (sortBy === 'amount') return b.cost - a.cost;
//     if (sortBy === 'date') return new Date(b.startDate) - new Date(a.startDate);
//     return 0;
//   });

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-semibold mb-4">Payment Dashboard</h2>

//       {/* Filter Cards */}
//       <div className="grid grid-cols-3 gap-4 mb-6">
//         <div className="bg-green-100 p-4 rounded-xl">
//           <h3 className="text-xl">Paid</h3>
//           <p className="text-2xl font-bold">{stats.paid}</p>
//         </div>
//         <div className="bg-yellow-100 p-4 rounded-xl">
//           <h3 className="text-xl">Pending</h3>
//           <p className="text-2xl font-bold">{stats.pending}</p>
//         </div>
//         <div className="bg-red-100 p-4 rounded-xl">
//           <h3 className="text-xl">Overdue</h3>
//           <p className="text-2xl font-bold">{stats.overdue}</p>
//         </div>
//       </div>

//       {/* Search + Filters */}
//       <div className="flex items-center gap-4 mb-4">
//         <input
//           type="text"
//           placeholder="Search by client or work"
//           className="border px-4 py-2 rounded-lg w-1/3"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border px-3 py-2 rounded-lg">
//           <option value="month">This Month</option>
//           <option value="week">This Week</option>
//           <option value="year">This Year</option>
//           <option value="all">All</option>
//         </select>
//         <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border px-3 py-2 rounded-lg">
//           <option value="date">Date</option>
//           <option value="amount">Amount</option>
//         </select>
//       </div>

//       {/* Table */}
//       <table className="w-full text-left border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-2">Client</th>
//             <th className="p-2">Work</th>
//             <th className="p-2">Amount</th>
//             <th className="p-2">Start Date</th>
//             <th className="p-2">Status</th>
//             <th className="p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredWorks.map((w) => (
//             <tr key={w._id} className="border-t">
//               <td className="p-2">{w.clientName}</td>
//               <td className="p-2">{w.fieldOfWork}</td>
//               <td className="p-2">₹{w.cost}</td>
//               <td className="p-2">{new Date(w.startDate).toLocaleDateString()}</td>
//               <td className="p-2">
//                 <select
//                   value={w.paymentStatus}
//                   onChange={(e) => handleStatusChange(w.clientId, w._id, e.target.value)}
//                   className="border px-2 py-1 rounded"
//                 >
//                   <option value="Pending">Pending</option>
//                   <option value="Paid">Paid</option>
//                   <option value="Overdue">Overdue</option>
//                 </select>
//               </td>
//               <td className="p-2">
//                 {w.paymentStatus === 'Pending' && (
//                   <div className="flex gap-2">
//                     <button className="bg-blue-100 px-2 py-1 rounded">Mail</button>
//                     <button className="bg-green-100 px-2 py-1 rounded">WhatsApp</button>
//                   </div>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default PaymentManagement;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const PaymentsDashboard = () => {
//   const [clients, setClients] = useState([]);
//   const [works, setWorks] = useState([]);
//   const [search, setSearch] = useState('');
//   const [filter, setFilter] = useState('month');
//   const [sortBy, setSortBy] = useState('date');
//   const [stats, setStats] = useState({ paid: 0, pending: 0, overdue: 0 });

//   const token = localStorage.getItem('authToken');

//   const fetchAllWorks = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/clients`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setClients(res.data);

//       // Flatten all works
//       const allWorks = res.data.flatMap(client =>
//         client.works.map(work => ({
//           ...work,
//           clientName: client.name,
//           clientId: client._id,
//         }))
//       );
//       setWorks(allWorks);
//       updateStats(allWorks);
//     } catch (err) {
//       console.error(err);
//       toast.error('Failed to fetch payments');
//     }
//   };

//   const updateStats = (data) => {
//     const filtered = applyFilter(data);
//     setStats({
//       paid: filtered.filter(w => w.paymentStatus === 'Paid').reduce((sum, w) => sum + w.cost, 0),
//       pending: filtered.filter(w => w.paymentStatus === 'Pending').reduce((sum, w) => sum + w.cost, 0),
//       overdue: filtered.filter(w => w.paymentStatus === 'Overdue').reduce((sum, w) => sum + w.cost, 0),
//     });
//   };

//   const applyFilter = (data) => {
//     const now = new Date();
//     return data.filter(work => {
//       const date = new Date(work.startDate);
//       if (filter === 'month') return date.getMonth() === now.getMonth();
//       if (filter === 'week') {
//         const diff = (now - date) / (1000 * 60 * 60 * 24);
//         return diff <= 7;
//       }
//       if (filter === 'year') return date.getFullYear() === now.getFullYear();
//       return true;
//     });
//   };

//   const handleStatusChange = async (clientId, workId, newStatus) => {
//     try {
//       await axios.put(
//         `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/payments/${clientId}/${workId}/payment`,
//         { paymentStatus: newStatus },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success('Status updated');
//       fetchAllWorks();
//     } catch (err) {
//       toast.error('Update failed');
//     }
//   };

//   useEffect(() => {
//     fetchAllWorks();
//   }, []);

//   const filteredWorks = applyFilter(
//     works.filter(w =>
//       w.clientName.toLowerCase().includes(search.toLowerCase()) ||
//       w.fieldOfWork.toLowerCase().includes(search.toLowerCase())
//     )
//   ).sort((a, b) => {
//     if (sortBy === 'amount') return b.cost - a.cost;
//     if (sortBy === 'date') return new Date(b.startDate) - new Date(a.startDate);
//     return 0;
//   });

//   return (
//     <div className="p-4 w-full">
//       <h2 className="text-2xl font-semibold mb-4">Payment Dashboard</h2>

//       {/* Filter Cards */}
//       <div className="grid grid-cols-3 gap-4 mb-6">
//         <div className="bg-green-100 p-4 rounded-xl">
//           <h3 className="text-xl">Paid</h3>
//           <p className="text-2xl font-bold">₹{stats.paid}</p>
//         </div>
//         <div className="bg-yellow-100 p-4 rounded-xl">
//           <h3 className="text-xl">Pending</h3>
//           <p className="text-2xl font-bold">₹{stats.pending}</p>
//         </div>
//         <div className="bg-red-100 p-4 rounded-xl">
//           <h3 className="text-xl">Overdue</h3>
//           <p className="text-2xl font-bold">₹{stats.overdue}</p>
//         </div>
//       </div>

//       {/* Search + Filters */}
//       <div className="flex items-center gap-4 mb-4">
//         <input
//           type="text"
//           placeholder="Search by client or work"
//           className="border px-4 py-2 rounded-lg w-1/3"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border px-3 py-2 rounded-lg">
//           <option value="month">This Month</option>
//           <option value="week">This Week</option>
//           <option value="year">This Year</option>
//           <option value="all">All</option>
//         </select>
//         <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border px-3 py-2 rounded-lg">
//           <option value="date">Date</option>
//           <option value="amount">Amount</option>
//         </select>
//       </div>

//       {/* Table */}
//       <table className="w-full text-left border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-2">Client</th>
//             <th className="p-2">Work</th>
//             <th className="p-2">Amount</th>
//             <th className="p-2">Start Date</th>
//             <th className="p-2">Status</th>
//             <th className="p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredWorks.map((w) => (
//             <tr key={w._id} className="border-t">
//               <td className="p-2">{w.clientName}</td>
//               <td className="p-2">{w.fieldOfWork}</td>
//               <td className="p-2">₹{w.cost}</td>
//               <td className="p-2">{new Date(w.startDate).toLocaleDateString()}</td>
//               <td className="p-2">
//                 <select
//                   value={w.paymentStatus}
//                   onChange={(e) => handleStatusChange(w.clientId, w._id, e.target.value)}
//                   className="border px-2 py-1 rounded"
//                 >
//                   <option value="Pending">Pending</option>
//                   <option value="Paid">Paid</option>
//                   <option value="Overdue">Overdue</option>
//                 </select>
//               </td>
//               <td className="p-2">
//                 {w.paymentStatus === 'Pending' && (
//                   <div className="flex gap-2">
//                     <button className="bg-blue-100 px-2 py-1 rounded">Mail</button>
//                     <button className="bg-green-100 px-2 py-1 rounded">WhatsApp</button>
//                   </div>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default PaymentsDashboard;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const PaymentsDashboard = () => {
  const [clients, setClients] = useState([]);
  const [works, setWorks] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('month');
  const [sortBy, setSortBy] = useState('date');
  const [stats, setStats] = useState({ paid: 0, pending: 0, overdue: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const token = localStorage.getItem('authToken');


  const fetchAllWorks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/clients`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClients(res.data);

      // Flatten all works
      const allWorks = res.data.flatMap(client =>
        client.works.map(work => ({
          ...work,
          clientName: client.name,
          clientId: client._id,
        }))
      );
    

      setWorks(allWorks);
      updateStats(allWorks);

      setTimeout(() => setIsLoading(false), 1000); // Simulate loading
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch payments');
      setIsLoading(false);
    }
  };

  const updateStats = (data) => {
    const filtered = applyFilter(data);
    setStats({
      paid: filtered.filter(w => w.paymentStatus === 'Paid').reduce((sum, w) => sum + w.cost, 0),
      pending: filtered.filter(w => w.paymentStatus === 'Pending').reduce((sum, w) => sum + w.cost, 0),
      overdue: filtered.filter(w => w.paymentStatus === 'Overdue').reduce((sum, w) => sum + w.cost, 0),
    });
  };

  const applyFilter = (data) => {
    const now = new Date();
    return data.filter(work => {
      const date = new Date(work.startDate);
      if (filter === 'month') return date.getMonth() === now.getMonth();
      if (filter === 'week') {
        const diff = (now - date) / (1000 * 60 * 60 * 24);
        return diff <= 7;
      }
      if (filter === 'year') return date.getFullYear() === now.getFullYear();
      return true;
    });
  };

  const handleStatusChange = async (clientId, workId, newStatus) => {
    try {

      await axios.put(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/payments/${clientId}/${workId}/payment`,
        { paymentStatus: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      


      toast.success('Status updated');
      fetchAllWorks();
    } catch (err) {
      toast.error('Update failed');
    }
  };

  useEffect(() => {
    fetchAllWorks();
  }, []);

  useEffect(() => {
    updateStats(works);
  }, [works, filter]);

  const filteredWorks = applyFilter(
    works.filter(w =>
      w.clientName.toLowerCase().includes(search.toLowerCase()) ||
      w.fieldOfWork.toLowerCase().includes(search.toLowerCase())
    )
  ).sort((a, b) => {
    if (sortBy === 'amount') return b.cost - a.cost;
    if (sortBy === 'date') return new Date(b.startDate) - new Date(a.startDate);
    return 0;
  });


  const handleSendEmailReminder = async (clientId, workId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/payments/${clientId}/${workId}/remind`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // use your auth token logic here
        }
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || 'Email reminder sent!');
      } else {
        toast.error(data.message || 'Failed to send email');
      }
    } catch (err) {
      console.error('Email reminder error:', err);
      toast.error('Something went wrong!');
    }
  };




  const StatCard = ({ title, amount, bgColor, textColor, icon }) => (
    <div className={`${bgColor} p-4 md:p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm md:text-lg font-medium text-gray-700">{title}</h3>
          <p className={`text-xl md:text-3xl font-bold ${textColor} mt-1`}>₹{amount.toLocaleString()}</p>
        </div>
        <div className="text-2xl md:text-3xl ">
          {icon}
        </div>
      </div>
    </div>
  );

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-32">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[1, 2, 3].map(i => (
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 w-full">
      <div className=" mx-auto">
        <div className="animate-fade-in">
          <div className="text-center mb-8 mt-8 animate-slide-down">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Manage Your
               <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Cash Flow</span>
            </h1>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 animate-slide-up">
            <StatCard
              title="Paid"
              amount={stats.paid}
              bgColor="bg-gradient-to-r from-green-100 to-green-200"
              textColor="text-green-700"
              icon="💰"
            />
            <StatCard
              title="Pending"
              amount={stats.pending}
              bgColor="bg-gradient-to-r from-yellow-100 to-yellow-200"
              textColor="text-yellow-700"
              icon="⏳"
            />
            <StatCard
              title="Overdue"
              amount={stats.overdue}
              bgColor="bg-gradient-to-r from-red-100 to-red-200"
              textColor="text-red-700"
              icon="⚠️"
            />
          </div>

          {/* Mobile Filter Toggle */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 flex items-center justify-between shadow-sm"
            >
              <span>Filters & Search</span>
              <span className={`transform transition-transform ${showMobileFilters ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
          </div>

          {/* Search + Filters */}
          <div className={`bg-white rounded-xl shadow-lg p-4 mb-6 transition-all duration-300 ${showMobileFilters ? 'block' : 'hidden'
            } md:block`}>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search by client or work..."
                  className="w-full border border-gray-300 px-4 py-2 pl-10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  🔍
                </div>
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
              >
                <option value="month">This Month</option>
                <option value="week">This Week</option>
                <option value="year">This Year</option>
                <option value="all">All</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
              >
                <option value="date">Sort by Date</option>
                <option value="amount">Sort by Amount</option>
              </select>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Client</th>
                    <th className="px-6 py-4 text-left font-semibold">Work</th>
                    <th className="px-6 py-4 text-left font-semibold">Amount</th>
                    <th className="px-6 py-4 text-left font-semibold">Start Date</th>
                    <th className="px-6 py-4 text-left font-semibold">Status</th>
                    <th className="px-6 py-4 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredWorks.map((work, index) => (
                    <tr
                      key={work._id}
                      className="hover:bg-gray-50 transition-colors duration-200 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">{work.clientName}</td>
                      <td className="px-6 py-4 text-gray-600">{work.fieldOfWork}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900">₹{work.cost.toLocaleString()}</td>
                      <td className="px-6 py-4 text-gray-600">{new Date(work.startDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <select
                          value={work.paymentStatus}
                          onChange={(e) => handleStatusChange(work.clientId, work._id, e.target.value)}
                          className={`cursor-pointer px-3 py-1 rounded-full text-sm font-medium border-0 focus:ring-2 focus:ring-blue-500 ${work.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' :
                              work.paymentStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                            }`}
                        >
                          <option className='cursor-pointer' value="Pending">Pending</option>
                          <option className='cursor-pointer' value="Paid">Paid</option>
                          <option className='cursor-pointer' value="Overdue">Overdue</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        {['Pending', 'Overdue'].includes(work.paymentStatus) && (
                          <div className="flex gap-2">
                            <button className= " cursor-pointer bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                              onClick={() => handleSendEmailReminder(work.clientId, work._id)}>
                              📧 Mail
                            </button>
                            {/* <button className= "cursor-pointer bg-green-100 hover:bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium transition-colors">
                              📱 WhatsApp
                            </button> */}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {filteredWorks.map((work, index) => (
              <div
                key={work._id}
                className="bg-white rounded-xl shadow-lg p-4 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{work.clientName}</h3>
                    <p className="text-sm text-gray-600">{work.fieldOfWork}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-gray-900">₹{work.cost.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{new Date(work.startDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <select
                    value={work.paymentStatus}
                    onChange={(e) => handleStatusChange(work.clientId, work._id, e.target.value)}
                    className={`cursor-pointer px-3 py-1 rounded-full text-sm font-medium border-0 focus:ring-2 focus:ring-blue-500 ${work.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800 ' :
                        work.paymentStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                      }`}
                  >
                    <option className='cursor-pointer'  value="Pending">Pending</option>
                    <option className='cursor-pointer'  value="Paid">Paid</option>
                    <option className='cursor-pointer' value="Overdue">Overdue</option>
                  </select>

                  {['Pending', 'Overdue'].includes(work.paymentStatus) && (
                    <div className="flex gap-2">
                      <button className= "bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                        onClick={() => handleSendEmailReminder(work.clientId, work._id)}>
                        📧
                      </button>
                      <button className="bg-green-100 hover:bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium transition-colors">
                        📱
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredWorks.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl shadow-lg">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No payments found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

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
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PaymentsDashboard;