// import { useState, useEffect } from "react";
// import axios from "axios";
// import { format } from "date-fns";
// import {
//   FaBriefcase,
//   FaUserPlus,
//   FaEdit,
//   FaTrash,
//   FaCalendarAlt,
//   FaCalendarCheck,
//   FaCalendarTimes,
//   FaCalendarDay,
//   FaPaypal,
//   FaClipboardList,
//   FaRegSmile,
//   FaCheckCircle,
// } from "react-icons/fa";

// const typeIcons = {
//   // Work & Client
//   "WORK_ADDED": <FaBriefcase className="text-blue-500" />,
//   "CLIENT_ADDED": <FaUserPlus className="text-green-500" />,
//   "PROJECT_UPDATED": <FaEdit className="text-yellow-500" />,
//   "PROJECT_DELETED": <FaTrash className="text-red-500" />,

//   // Testimonial
//   "TESTIMONIAL_UPDATED ": <FaEdit className="text-yellow-500" />,
//   "TESTIMONIAL_DELETED ": <FaTrash className="text-red-500" />,

//   // Meetings
//   "Rescheduled meeting": <FaCalendarAlt className="text-blue-500" />, // fallback for plain-text type
//   "Cancelled meeting": <FaCalendarTimes className="text-red-500" />,
//   "Viewed all meetings": <FaCalendarDay className="text-gray-500" />,
//   "Deleted a meeting": <FaTrash className="text-red-500" />,
//   "Accepted meeting request": <FaCalendarCheck className="text-green-500" />,
//   "Rejected meeting request": <FaCalendarTimes className="text-red-500" />,

//   // PayPal
//   "PAYPAL_PRODUCT_CREATED ": <FaPaypal className="text-blue-500" />,
//    "PAYPAL_ORDER_CREATED ": <FaPaypal className="text-green-500" />,
//    "PAYPAL_ORDER_CAPTURED ": <FaPaypal className="text-green-600" />,
//    "PAYPAL_SUBSCRIPTION_CANCELLED ": <FaPaypal className="text-red-500" />,
//    "PAYPAL_SUBSCRIPTION_CREATED ": <FaPaypal className="text-blue-600" />,
//    "PAYPAL_PLAN_CREATED ": <FaPaypal className="text-yellow-500" />,

//   // Misc / default
//   "default ": <FaClipboardList className="text-gray-400" />,
// };
// // export default function TimeLineManagemnt() {
// //   const [activities, setActivities] = useState([]);
// //   const [type, setType] = useState("");
// //   const [startDate, setStartDate] = useState("");
// //   const [endDate, setEndDate] = useState("");
// //   const [search, setSearch] = useState("");
// //   const [page, setPage] = useState(1);
// //   const perPage = 10;

// //   useEffect(() => {
// //     fetchActivities();
// //   }, [type, startDate, endDate]);

// //   const fetchActivities = async () => {
// //     try {
// //       const { data } = await axios.get(`${ import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/activity`, {
// //         params: { type, startDate, endDate },
// //         headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
// //       });
// //       setActivities(data);
// //       setPage(1);
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// //   const filtered = activities.filter((a) =>
// //     a.description?.toLowerCase().includes(search.toLowerCase())
// //   );

// //   const paginated = filtered.slice((page - 1) * perPage, page * perPage);
// //   const totalPages = Math.ceil(filtered.length / perPage);

// //   return (
// //     <div className="max-w-4xl mx-auto p-6">
// //       {/* Filters */}
// //       <div className="flex flex-wrap gap-3 mb-6">
// //         <input
// //           type="text"
// //           placeholder="Search..."
// //           className="border rounded px-3 py-2"
// //           value={search}
// //           onChange={(e) => setSearch(e.target.value)}
// //         />
// //         <select
// //           value={type}
// //           onChange={(e) => setType(e.target.value)}
// //           className="border rounded px-3 py-2"
// //         >
// //           <option value="">All Types</option>
// //           <option value="create">Create</option>
// //           <option value="update">Update</option>
// //           <option value="delete">Delete</option>
// //           <option value="success">Success</option>
// //           <option value="error">Error</option>
// //         </select>
// //         <input
// //           type="date"
// //           value={startDate}
// //           onChange={(e) => setStartDate(e.target.value)}
// //           className="border rounded px-3 py-2"
// //         />
// //         <input
// //           type="date"
// //           value={endDate}
// //           onChange={(e) => setEndDate(e.target.value)}
// //           className="border rounded px-3 py-2"
// //         />
// //         <button
// //           onClick={fetchActivities}
// //           className="bg-blue-600 text-white px-4 py-2 rounded"
// //         >
// //           Apply
// //         </button>
// //       </div>

// //       {/* Timeline */}
// //       <div className="relative border-l border-gray-300">
// //         {paginated.length === 0 ? (
// //           <p className="text-gray-500">No activities found.</p>
// //         ) : (
// //           paginated.map((activity) => (
// //             <div key={activity._id} className="mb-8 ml-4">
// //               <div className="absolute -left-4 bg-white p-1 rounded-full">
// //                 {typeIcons[activity.type] || <FaCheckCircle className="text-gray-400" />}
// //               </div>
// //               <div className="p-4 bg-gray-50 rounded shadow">
// //                 <p className="font-semibold">{activity.type}</p>
// //                 <p className="text-gray-700">{activity.description}</p>
// //                 <p className="text-sm text-gray-500">
// //                   {format(new Date(activity.createdAt), "dd MMM yyyy, hh:mm a")}
// //                 </p>
// //               </div>
// //             </div>
// //           ))
// //         )}
// //       </div>

// //       {/* Pagination */}
// //       {totalPages > 1 && (
// //         <div className="flex justify-center gap-2 mt-6">
// //           <button
// //             onClick={() => setPage((p) => Math.max(p - 1, 1))}
// //             disabled={page === 1}
// //             className="px-3 py-1 border rounded disabled:opacity-50"
// //           >
// //             Prev
// //           </button>
// //           {[...Array(totalPages)].map((_, i) => (
// //             <button
// //               key={i}
// //               onClick={() => setPage(i + 1)}
// //               className={`px-3 py-1 border rounded ${page === i + 1 ? "bg-blue-500 text-white" : ""
// //                 }`}
// //             >
// //               {i + 1}
// //             </button>
// //           ))}
// //           <button
// //             onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
// //             disabled={page === totalPages}
// //             className="px-3 py-1 border rounded disabled:opacity-50"
// //           >
// //             Next
// //           </button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// export default function TimeLineManagemnt() {
//   const [activities, setActivities] = useState([]);
//   const [type, setType] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const perPage = 10;

//   useEffect(() => {
//     fetchActivities();
//   }, [type, startDate, endDate]);

//   const fetchActivities = async () => {
//     try {
//       const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/activity`, {
//         params: { type, startDate, endDate },
//         headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
//       });
//       setActivities(data);
//       setPage(1);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const filtered = activities.filter((a) =>
//     a.message?.toLowerCase().includes(search.toLowerCase())
//   );

//   const paginated = filtered.slice((page - 1) * perPage, page * perPage);
//   const totalPages = Math.ceil(filtered.length / perPage);

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       {/* Filters */}
//       <div className="flex flex-wrap gap-3 mb-6">
//         <input
//           type="text"
//           placeholder="Search..."
//           className="border rounded px-3 py-2"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <select
//           value={type}
//           onChange={(e) => setType(e.target.value)}
//           className="border rounded px-3 py-2"
//         >
//           <option value="">All Types</option>
//           <option value="WORK_ADDED">Work Added</option>
//           <option value="CLIENT_ADDED">Client Added</option>
//         </select>
//         <input
//           type="date"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//           className="border rounded px-3 py-2"
//         />
//         <input
//           type="date"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//           className="border rounded px-3 py-2"
//         />
//         <button
//           onClick={fetchActivities}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Apply
//         </button>
//       </div>

//       {/* Timeline */}
//       <div className="relative border-l border-gray-300">
//         {paginated.length === 0 ? (
//           <p className="text-gray-500">No activities found.</p>
//         ) : (
//           paginated.map((activity) => (
//             <div key={activity._id} className="mb-8 ml-4">
//               <div className="absolute -left-4 bg-white p-1 rounded-full">
//                 {typeIcons[activity.type] || <FaCheckCircle className="text-gray-400" />}
//               </div>
//               <div className="p-4 bg-gray-50 rounded shadow">
//                 <p className="font-semibold">{activity.type}</p>
//                 <p className="text-gray-700">{activity.message}</p>
//                 <p className="text-sm text-gray-500">
//                   {format(new Date(activity.createdAt), "dd MMM yyyy, hh:mm a")}
//                 </p>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center gap-2 mt-6">
//           <button
//             onClick={() => setPage((p) => Math.max(p - 1, 1))}
//             disabled={page === 1}
//             className="px-3 py-1 border rounded disabled:opacity-50"
//           >
//             Prev
//           </button>
//           {[...Array(totalPages)].map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setPage(i + 1)}
//               className={`px-3 py-1 border rounded ${page === i + 1 ? "bg-blue-500 text-white" : ""
//                 }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//           <button
//             onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
//             disabled={page === totalPages}
//             className="px-3 py-1 border rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import axios from "axios";

const typeIcons = {
  // Work & Client
  "WORK_ADDED": "💼",
  "CLIENT_ADDED": "👥",
  "PROJECT_UPDATED": "✏️",
  "PROJECT_DELETED": "🗑️",

  // Testimonial
  "TESTIMONIAL_UPDATED": "✏️",
  "TESTIMONIAL_DELETED": "🗑️",

  // Meetings
  "Rescheduled meeting": "📅",
  "Cancelled meeting": "❌",
  "Viewed all meetings": "👀",
  "Deleted a meeting": "🗑️",
  "Accepted meeting request": "✅",
  "Rejected meeting request": "❌",

  // PayPal
  "PAYPAL_PRODUCT_CREATED": "💳",
  "PAYPAL_ORDER_CREATED": "💰",
  "PAYPAL_ORDER_CAPTURED": "💵",
  "PAYPAL_SUBSCRIPTION_CANCELLED": "❌",
  "PAYPAL_SUBSCRIPTION_CREATED": "🔄",
  "PAYPAL_PLAN_CREATED": "📋",

  // Default
  "default": "📋",
};

// Mock data for demonstration
const mockActivities = [
  {
    _id: "1",
    type: "WORK_ADDED",
    message: "New freelance project added: Website Development for Tech Startup",
    createdAt: "2025-08-15T10:30:00Z"
  },
  {
    _id: "2",
    type: "CLIENT_ADDED",
    message: "New client onboarded: John Doe from ABC Corporation",
    createdAt: "2025-08-14T14:15:00Z"
  },
  {
    _id: "3",
    type: "PROJECT_UPDATED",
    message: "Updated project timeline for E-commerce Platform",
    createdAt: "2025-08-13T09:45:00Z"
  },
  {
    _id: "4",
    type: "PAYPAL_ORDER_CAPTURED",
    message: "Payment received for Invoice #INV-2024-001",
    createdAt: "2025-08-12T16:20:00Z"
  },
  {
    _id: "5",
    type: "Accepted meeting request",
    message: "Meeting scheduled with client for project requirements discussion",
    createdAt: "2025-08-11T11:00:00Z"
  },
  {
    _id: "6",
    type: "PROJECT_DELETED",
    message: "Removed outdated project from portfolio",
    createdAt: "2025-08-10T08:15:00Z"
  }
];

export default function TimeLineManagement() {
  const [activities, setActivities] = useState(mockActivities);
  const [type, setType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const perPage = 5;

  useEffect(() => {
    fetchActivities();
  }, [type, startDate, endDate]);

  const fetchActivities = async () => {
    setLoading(true);
    try {
      // Commented out axios call as requested
      const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/activity`, {
        params: { type, startDate, endDate },
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
      setActivities(data);

      // Simulate API delay
      // await new Promise(resolve => setTimeout(resolve, 800));
      // setActivities(mockActivities);
      setPage(1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
  };

  const filtered = activities.filter((a) =>
    a.message?.toLowerCase().includes(search.toLowerCase()) &&
    (type === "" || a.type === type)
  );

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  const getTypeColor = (activityType) => {
    const colors = {
      "WORK_ADDED": "from-blue-500 to-blue-600",
      "CLIENT_ADDED": "from-green-500 to-green-600",
      "PROJECT_UPDATED": "from-yellow-500 to-yellow-600",
      "PROJECT_DELETED": "from-red-500 to-red-600",
      "PAYPAL_ORDER_CAPTURED": "from-emerald-500 to-emerald-600",
      "Accepted meeting request": "from-purple-500 to-purple-600",
      "TESTIMONIAL_UPDATED": "from-indigo-500 to-indigo-600",
    };
    return colors[activityType] || " from-purple-600 to-blue-600";
  };

  const getBadgeColor = (activityType) => {
    const colors = {
      "WORK_ADDED": "bg-blue-500",
      "CLIENT_ADDED": "bg-green-500",
      "PROJECT_UPDATED": "bg-yellow-500",
      "PROJECT_DELETED": "bg-red-500",
      "PAYPAL_ORDER_CAPTURED": "bg-emerald-500",
      "Accepted meeting request": "bg-purple-500",
    };
    return colors[activityType] || "bg-purple-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 mb-4">

            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Activity Timeline
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Track all your business activities, milestones, and achievements in one beautiful timeline
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 mb-8 border border-white/20">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
                🔍
              </div>
              <input
                type="text"
                placeholder="Search activities..."
                className="w-full pl-12 pr-6 py-4 border-2 border-gray-200/50 rounded-2xl focus:border-purple-500 focus:outline-none transition-all duration-300 hover:border-gray-300 bg-white/50 backdrop-blur-sm text-lg"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold text-lg cursor-pointer"
            >
              <span className="text-xl">🎛️</span>
              <span className="hidden sm:inline">Advanced Filters</span>
            </button>
          </div>

          {/* Expandable Filters */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${isFilterOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 mt-6 border-t border-gray-200/50">
              <div className="relative">
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-4 py-4 border-2 border-gray-200/50 rounded-2xl focus:border-purple-500 focus:outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm text-lg appearance-none cursor-pointer"
                >
                  <option value="">All Activity Types</option>
                  <option value="WORK_ADDED">Work Added</option>
                  <option value="CLIENT_ADDED">Client Added</option>
                  <option value="PROJECT_UPDATED">Project Updated</option>
                  <option value="PAYPAL_ORDER_CAPTURED">Payment Received</option>
                  <option value="PROJECT_DELETED">Project Deleted</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                  ▼
                </div>
              </div>

              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-4 py-4 border-2 border-gray-200/50 rounded-2xl focus:border-purple-500 focus:outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm text-lg"
              />

              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-4 py-4 border-2 border-gray-200/50 rounded-2xl focus:border-purple-500 focus:outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm text-lg"
              />

              <button
                onClick={fetchActivities}
                disabled={loading}
                className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg cursor-pointer"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                    Applying...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>✨</span>
                    Apply Filters
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Timeline Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 border border-white/20">
          {/* Stats Bar */}
          <div className="flex flex-wrap gap-4 mb-8 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{filtered.length}</div>
              <div className="text-sm text-gray-600">Total Activities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalPages}</div>
              <div className="text-sm text-gray-600">Pages</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{mockActivities.filter(a => a.type.includes('ADDED')).length}</div>
              <div className="text-sm text-gray-600">New Items</div>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 via-blue-400 to-indigo-400 rounded-full shadow-sm"></div>

            {loading ? (
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
            ) : paginated.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6 shadow-inner">
                  <span className="text-gray-400 text-6xl">📋</span>
                </div>
                <h3 className="text-gray-600 text-2xl font-bold mb-2">No activities found</h3>
                <p className="text-gray-400 text-lg">Try adjusting your search or filters to find more activities</p>
              </div>
            ) : (
              <div className="space-y-10">
                {paginated.map((activity, index) => (
                  <div
                    key={activity._id}
                    className={`relative flex items-start gap-4 md:gap-8 group opacity-0 animate-fade-in-up`}
                    style={{
                      animationDelay: `${index * 200}ms`,
                      animationFillMode: 'forwards'
                    }}
                  >
                    {/* Timeline Icon */}
                    <div className={`relative z-10 flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${getTypeColor(activity.type)} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3`}>
                      <span className="text-white text-2xl md:text-3xl filter drop-shadow-sm">
                        {typeIcons[activity.type] || typeIcons["default"]}
                      </span>
                      {/* Pulse Effect */}
                      <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    </div>

                    {/* Activity Card */}
                    <div className="flex-1 bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group-hover:from-purple-50/90 group-hover:to-blue-50/90 border border-white/50">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <div className="flex items-center gap-3 mb-3 sm:mb-0">
                          <span className={`inline-block px-4 py-2 rounded-2xl text-sm font-bold text-white shadow-md ${getBadgeColor(activity.type)}`}>
                            {activity.type.replace(/_/g, ' ')}
                          </span>
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        </div>

                        <div className="flex items-center gap-2 text-gray-500">
                          <span className="text-lg">🕐</span>
                          <span className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-xl">
                            {formatDate(activity.createdAt)}
                          </span>
                        </div>
                      </div>

                      {/* Activity Message */}
                      <div className="relative">
                        <p className="text-gray-700 leading-relaxed text-lg font-medium">
                          {activity.message}
                        </p>
                        {/* Decorative corner */}
                        <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                      </div>

                      {/* Hover Effect Lines */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-t-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between mt-12 pt-8 border-t border-gray-200/50">
              <div className="text-sm text-gray-600 mb-4 sm:mb-0 bg-gray-100 px-4 py-2 rounded-xl font-medium">
                Showing <span className="font-bold text-purple-600">{((page - 1) * perPage) + 1}</span> to <span className="font-bold text-purple-600">{Math.min(page * perPage, filtered.length)}</span> of <span className="font-bold text-purple-600">{filtered.length}</span> activities
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:border-purple-500 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300 font-semibold cursor-pointer"
                >
                  <span>←</span>
                  <span className="hidden sm:inline">Previous</span>
                </button>

                {/* Page Numbers - Responsive */}
                <div className="flex gap-1">
                  {totalPages <= 5 ? (
                    [...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`w-12 h-12 rounded-xl font-bold transition-all duration-300 cursor-pointer ${page === i + 1
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg transform scale-110"
                            : "border-2 border-gray-300 hover:border-purple-500 hover:text-purple-600 hover:bg-purple-50"
                          }`}
                      >
                        {i + 1}
                      </button>
                    ))
                  ) : (
                    <>
                      {/* Show first page */}
                      <button
                        onClick={() => setPage(1)}
                        className={`w-12 h-12 rounded-xl font-bold transition-all duration-300 ${page === 1
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg transform scale-110"
                            : "border-2 border-gray-300 hover:border-purple-500 hover:text-purple-600 cursor-pointer"
                          }`}
                      >
                        1
                      </button>

                      {page > 3 && <span className="px-2 py-3 text-gray-400">...</span>}

                      {/* Show current page and neighbors */}
                      {Array.from({ length: Math.min(3, totalPages - 2) }, (_, i) => {
                        const pageNum = Math.max(2, Math.min(totalPages - 1, page - 1 + i));
                        if (pageNum === 1 || pageNum === totalPages) return null;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setPage(pageNum)}
                            className={`w-12 h-12 rounded-xl font-bold transition-all duration-300 ${page === pageNum
                                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg transform scale-110"
                                : "border-2 border-gray-300 hover:border-purple-500 hover:text-purple-600 cursor-pointer"
                              }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}

                      {page < totalPages - 2 && <span className="px-2 py-3 text-gray-400">...</span>}

                      {/* Show last page */}
                      <button
                        onClick={() => setPage(totalPages)}
                        className={`w-12 h-12 rounded-xl font-bold transition-all duration-300 cursor-pointer ${page === totalPages
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg transform scale-110"
                            : "border-2 border-gray-300 hover:border-purple-500 hover:text-purple-600"
                          }`}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>

                <button
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                  className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:border-purple-500 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300 font-semibold cursor-pointer"
                >
                  <span className="hidden sm:inline">Next</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Stats */}
        {/* <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Activities", value: mockActivities.length, color: "purple", icon: "📊" },
            { label: "This Week", value: "12", color: "blue", icon: "📅" },
            { label: "Completed", value: "8", color: "green", icon: "✅" },
            { label: "Pending", value: "4", color: "yellow", icon: "⏳" },
          ].map((stat, index) => (
            <div
              key={index}
              className={`bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/50`}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className={`text-2xl font-bold text-${stat.color}-600 mb-1`}>{stat.value}</div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div> */}
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out both;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 3px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(243, 244, 246, 0.3);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #3b82f6);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7c3aed, #2563eb);
        }
      `}</style>
    </div>
  );
}