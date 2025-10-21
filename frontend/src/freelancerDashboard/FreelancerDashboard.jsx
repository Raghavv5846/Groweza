// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   FaUsers, FaFileInvoiceDollar, FaHandshake,
//   FaCalendarAlt, FaStar
// } from 'react-icons/fa';
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
// } from 'recharts';




// const FreelancerDashboard = () => {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [revenueData, setRevenueData] = useState([]);


//   useEffect(() => {
//     axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/dashboard/summary`, {
//       headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
//     })
//       .then(res => setRevenueData(res.data))
//       .catch(err => console.error(err));
//   }, []);



//   useEffect(() => {
//     axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/dashboard/stats`, {
//       headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
//     })
//       .then(res => setStats(res.data))
//       .catch(err => console.error(err))
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) return <div className="p-10 text-center">Loading...</div>;

//   return (
//     <div className="p-6 space-y-6">
//       {/* Welcome */}
//       <div className="text-2xl font-semibold">
//         👋 Welcome back, {stats.freelancer.name}
//       </div>

//       {/* Dashboard Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         <Card>
//           <CardContent className="flex items-center gap-4 py-4">
//             <FaUsers className="text-blue-500" size={28} />
//             <div>
//               <div className="text-lg font-medium">{stats.stats.totalClients}</div>
//               <div className="text-sm text-gray-500">Clients</div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="flex items-center gap-4 py-4">
//             <FaFileInvoiceDollar className="text-red-500" size={28} />
//             <div>
//               <div className="text-lg font-medium">{stats.stats.unpaidInvoices}</div>
//               <div className="text-sm text-gray-500">Unpaid Invoices</div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="flex items-center gap-4 py-4">
//             <FaHandshake className="text-purple-500" size={28} />
//             <div>
//               <div className="text-lg font-medium">{stats.stats.pendingProposals}</div>
//               <div className="text-sm text-gray-500">Pending Proposals</div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="flex items-center gap-4 py-4">
//             <FaCalendarAlt className="text-green-500" size={28} />
//             <div>
//               <div className="text-lg font-medium">{stats.stats.upcomingMeetings}</div>
//               <div className="text-sm text-gray-500">Upcoming Meetings</div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="flex items-center gap-4 py-4">
//             <FaStar className="text-yellow-500" size={28} />
//             <div>
//               <div className="text-lg font-medium">
//                 {stats.freelancer.proposalCreditsUsed} / {stats.freelancer.proposalCreditsTotal}
//               </div>
//               <div className="text-sm text-gray-500">Proposal Credits</div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//       {/* Revenue Chart */}
//       <div className="mt-10">
//         <div className="text-lg font-medium mb-2">📈 Monthly Revenue</div>
//         {revenueData.length === 0 ? (
//           <p className="text-sm text-gray-500">No paid invoices yet.</p>
//         ) : (
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={revenueData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Line type="monotone" dataKey="revenue" stroke="#4F46E5" strokeWidth={2} />
//             </LineChart>
//           </ResponsiveContainer>
//         )}
//       </div>


//       {/* Quick Action Buttons */}
//       <div className="mt-6 flex gap-4">
//         <Button variant="default">➕ Create Invoice</Button>
//         <Button variant="outline">📤 Send Proposal</Button>
//         <Button variant="secondary">📅 Schedule Meeting</Button>
//       </div>
//     </div>
//   );
// };

// export default FreelancerDashboard;


// import React, { useEffect, useState } from 'react';
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
//   BarChart, Bar, PieChart, Pie, Cell
// } from 'recharts';
// import { useNavigate } from 'react-router-dom';

// const FreelancerDashboard = () => {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [revenueData, setRevenueData] = useState([]);
//   const [activeCard, setActiveCard] = useState(null);
//   const navigate = useNavigate();

//   // Mock data for demonstration
//   const mockStats = {
//     freelancer: {
//       name: "John Doe",
//       proposalCreditsUsed: 8,
//       proposalCreditsTotal: 20
//     },
//     stats: {
//       totalClients: 12,
//       unpaidInvoices: 3,
//       pendingProposals: 5,
//       upcomingMeetings: 2,
//       totalRevenue: 45230,
//       completedProjects: 28
//     }
//   };

//   const mockRevenueData = [
//     { month: 'Jan', revenue: 4200 },
//     { month: 'Feb', revenue: 3800 },
//     { month: 'Mar', revenue: 5200 },
//     { month: 'Apr', revenue: 6100 },
//     { month: 'May', revenue: 5900 },
//     { month: 'Jun', revenue: 7200 }
//   ];

//   const mockProjectData = [
//     { name: 'Completed', value: 28, color: '#10B981' },
//     { name: 'In Progress', value: 6, color: '#F59E0B' },
//     { name: 'Pending', value: 3, color: '#EF4444' }
//   ];

//   useEffect(() => {
//     // Simulate API call for dashboard stats
//     const fetchStats = async () => {
//       try {

//         const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/dashboard/stats`, {
//           headers: { 
//             Authorization: `Bearer ${localStorage.getItem('authToken')}` 
//           }
//         });
//         const data = await response.json();
//         setStats(data);
        
//         setTimeout(() => {
         
//           setLoading(false);
//         }, 1000);
//       } catch (err) {
//         console.error(err);
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   useEffect(() => {
//     // Simulate API call for revenue data
//     const fetchRevenueData = async () => {
//       try {

//         const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/dashboard/summary`, {
//           headers: { 
//             Authorization: `Bearer ${localStorage.getItem('authToken')}` 
//           }
//         });
//         const data = await response.json();
//         setRevenueData(data);
        


//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchRevenueData();
//   }, []);

//   const StatCard = ({ icon, title, value, subtitle, color, index, trend }) => (
//     <Card
//       className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${activeCard === index ? 'ring-2 ring-purple-500 shadow-lg' : ''
//         }`}
//       onClick={() => setActiveCard(activeCard === index ? null : index)}
//       style={{ animationDelay: `${index * 100}ms` }}
//     >
//       <CardContent className="p-6">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <div className={`p-3 rounded-full ${color} transition-transform duration-300 group-hover:scale-110`}>
//               {icon}
//             </div>
//             <div>
//               <div className="text-2xl font-bold text-gray-900 transition-colors duration-300">
//                 {value}
//               </div>
//               <div className="text-sm font-medium text-gray-600">{title}</div>
//               {subtitle && (
//                 <div className="text-xs text-gray-500 mt-1">{subtitle}</div>
//               )}
//             </div>
//           </div>
//           {trend && (
//             <div className={`text-xs font-semibold px-2 py-1 rounded-full ${trend.positive ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
//               }`}>
//               {trend.positive ? '+' : ''}{trend.value}%
//             </div>
//           )}
//         </div>

//         {activeCard === index && (
//           <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in">
//             <div className="text-sm text-gray-600">
//               {index === 0 && "Active clients this month"}
//               {index === 1 && "Requires immediate attention"}
//               {index === 2 && "Awaiting client response"}
//               {index === 3 && "Scheduled for this week"}
//               {index === 4 && "Credits remaining: " + (stats.freelancer.proposalCreditsTotal - stats.freelancer.proposalCreditsUsed)}
//               {index === 5 && "Projects completed this quarter"}
//             </div>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 w-full">
//         <div className="max-w-7xl mx-auto">
//           <div className="animate-pulse">
//             <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//               {[1, 2, 3].map(i => (
//                 <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
//               ))}
//             </div>
//             <div className="h-64 bg-gray-200 rounded-xl"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
//       <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
//         {/* Welcome Section */}
//         <div className="animate-fade-in">
//           <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-purple-100">
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
//               <div>
//                 <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
//                   👋 Welcome , <span className="text-purple-600">{stats?.freelancer?.name}</span>
//                 </h1>
//                 <p className="text-gray-600 text-base sm:text-lg">Here's what's happening with your freelance business</p>
//               </div>
//               <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full">
//                 <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//                 <span className="font-medium">Online</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6">
//           <StatCard
//             icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
//             </svg>}
//             title="Total Clients"
//             value={stats?.stats?.totalClients || 0}
//             color="bg-gradient-to-br from-blue-500 to-blue-600"
//             index={0}
//             // trend={{ positive: true, value: 12 }}
//           />

//           <StatCard
//             icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//             </svg>}
//             title="Unpaid Invoices"
//             value={stats?.stats?.unpaidInvoices || 0}
//             color="bg-gradient-to-br from-red-500 to-red-600"
//             index={1}
//             // trend={{ positive: false, value: 8 }}
//           />

//           <StatCard
//             icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
//             </svg>}
//             title="Pending Proposals"
//             value={stats?.stats?.pendingProposals || 0}
//             color="bg-gradient-to-br from-purple-500 to-purple-600"
//             index={2}
//             // trend={{ positive: true, value: 25 }}
//           />

//           <StatCard
//             icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a4 4 0 118 0v4m-8 0h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2z" />
//             </svg>}
//             title="Upcoming Meetings"
//             value={stats?.stats?.upcomingMeetings || 0}
//             color="bg-gradient-to-br from-green-500 to-green-600"
//             index={3}
//             // trend={{ positive: true, value: 5 }}
//           />

//           <StatCard
//             icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//             </svg>}
//             title="Proposal Credits"
//             value={`${stats?.freelancer?.proposalCreditsUsed || 0}/${stats?.freelancer?.proposalCreditsTotal || 0}`}
//             color="bg-gradient-to-br from-yellow-500 to-yellow-600"
//             index={4}
//           />

//           <StatCard
//             icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>}
//             title="Completed Projects"
//             value={stats?.stats?.completedProjects || 0}
//             color="bg-gradient-to-br from-indigo-500 to-indigo-600"
//             index={5}
//             // trend={{ positive: true, value: 18 }}
//           />
//         </div>

//         {/* Charts Section */}
//         <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
//           {/* Revenue Chart */}
//           <div className="xl:col-span-2">
//             <Card className="h-full animate-fade-in-up">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <div>
//                     <h3 className="text-xl font-bold text-gray-900 mb-1">📈 Monthly Revenue</h3>
//                     <p className="text-gray-600">Track your income over time</p>
//                   </div>
//                   <div className="text-right">
//                     <div className="text-2xl font-bold text-purple-600">
//                       ${stats?.stats?.totalRevenue?.toLocaleString() || '0'}
//                     </div>
//                     <div className="text-sm text-gray-500">Total Revenue</div>
//                   </div>
//                 </div>

//                 {revenueData.length === 0 ? (
//                   <div className="h-64 flex items-center justify-center text-gray-500">
//                     <div className="text-center">
//                       <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//                       </svg>
//                       <p>No paid invoices yet.</p>
//                       <p className="text-xs">Start creating invoices to see your revenue!</p>
//                     </div>
//                   </div>
//                 ) : (
//                   <ResponsiveContainer width="100%" height={300}>
//                     <LineChart data={revenueData}>
//                       <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                       <XAxis
//                         dataKey="month"
//                         stroke="#666"
//                         fontSize={12}
//                       />
//                       <YAxis
//                         stroke="#666"
//                         fontSize={12}
//                         tickFormatter={(value) => `$${value}`}
//                       />
//                       <Tooltip
//                         contentStyle={{
//                           backgroundColor: '#fff',
//                           border: '1px solid #e5e7eb',
//                           borderRadius: '8px',
//                           boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
//                         }}
//                         formatter={(value) => [`$${value}`, 'Revenue']}
//                       />
//                       <Line
//                         type="monotone"
//                         dataKey="revenue"
//                         stroke="url(#gradientPurple)"
//                         strokeWidth={3}
//                         dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
//                         activeDot={{ r: 6, stroke: '#8B5CF6', strokeWidth: 2 }}
//                       />
//                       <defs>
//                         <linearGradient id="gradientPurple" x1="0%" y1="0%" x2="100%" y2="0%">
//                           <stop offset="0%" stopColor="#8B5CF6" />
//                           <stop offset="100%" stopColor="#6366F1" />
//                         </linearGradient>
//                       </defs>
//                     </LineChart>
//                   </ResponsiveContainer>
//                 )}
//               </CardContent>
//             </Card>
//           </div>

//           {/* Project Status Pie Chart */}
//           <div className="xl:col-span-1">
//             <Card className="h-full animate-fade-in-up">
//               <CardContent className="p-6">
//                 <h3 className="text-xl font-bold text-gray-900 mb-1">📊 Project Status</h3>
//                 <p className="text-gray-600 mb-6">Current project breakdown</p>

//                 <ResponsiveContainer width="100%" height={250}>
//                   <PieChart>
//                     <Pie
//                       data={mockProjectData}
//                       cx="50%"
//                       cy="50%"
//                       innerRadius={60}
//                       outerRadius={100}
//                       paddingAngle={5}
//                       dataKey="value"
//                     >
//                       {mockProjectData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.color} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>

//                 <div className="mt-4 space-y-2">
//                   {mockProjectData.map((item, index) => (
//                     <div key={index} className="flex items-center justify-between">
//                       <div className="flex items-center">
//                         <div
//                           className="w-3 h-3 rounded-full mr-2"
//                           style={{ backgroundColor: item.color }}
//                         ></div>
//                         <span className="text-sm text-gray-700">{item.name}</span>
//                       </div>
//                       <span className="font-medium text-gray-900">{item.value}</span>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <Card className="animate-fade-in-up">
//           <CardContent className="p-6">
//             <h3 className="text-xl font-bold text-gray-900 mb-4">⚡ Quick Actions</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//               <Button
//                 className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
//                 onClick={()=>
//                   navigate("/dashboard/invoices")
//                 }>
//                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
//                 </svg>
//                 Create Invoice
//               </Button>

//               <Button
//                 variant="outline"
//                 className="border-2 border-purple-200 text-purple-600 hover:bg-purple-50 font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
//                 onClick={() =>
//                   navigate("/dashboard/proposals")
//                 }>
//                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
//                 </svg>
//                 Send Proposal
//               </Button>

//               <Button
//                 variant="secondary"
//                 className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
//                 onClick={() =>
//                   navigate("/dashboard/meetings")
//                 }
//               >
//                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a4 4 0 118 0v4m-8 0h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2z" />
//                 </svg>
//                 Schedule Meeting
//               </Button>

//               <Button
//                 variant="outline"
//                 className="border-2 border-green-200 text-green-600 hover:bg-green-50 font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5"
//               >
//                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//                 </svg>
//                 View Reports
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <style jsx>{`
//         @keyframes fade-in {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
        
//         @keyframes fade-in-up {
//           from { opacity: 0; transform: translateY(30px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
        
//         .animate-fade-in {
//           animation: fade-in 0.6s ease-out;
//         }
        
//         .animate-fade-in-up {
//           animation: fade-in-up 0.8s ease-out;
//         }
        
//         .grid > * {
//           animation: fade-in-up 0.6s ease-out;
//           animation-fill-mode: both;
//         }
        
//         .grid > *:nth-child(1) { animation-delay: 0.1s; }
//         .grid > *:nth-child(2) { animation-delay: 0.2s; }
//         .grid > *:nth-child(3) { animation-delay: 0.3s; }
//         .grid > *:nth-child(4) { animation-delay: 0.4s; }
//         .grid > *:nth-child(5) { animation-delay: 0.5s; }
//         .grid > *:nth-child(6) { animation-delay: 0.6s; }
//       `}</style>
//     </div>
//   );
// };

// export default FreelancerDashboard;



// import React, { useEffect, useMemo, useState } from 'react';
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
//   PieChart, Pie, Cell
// } from 'recharts';
// import { useNavigate } from 'react-router-dom';

// const TIME_RANGES = ["total", "year", "month", "week"]; // order: All Time, This Year, This Month, This Week

// const rangeLabel = (range) => {
//   if (range === 'total') return 'All Time';
//   if (range === 'year') return 'This Year';
//   if (range === 'month') return 'This Month';
//   if (range === 'week') return 'This Week';
//   return range;
// };



// const FreelancerDashboard = () => {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeCard, setActiveCard] = useState(null);
//   const [timeRange, setTimeRange] = useState('total');
//   const [revenueCache, setRevenueCache] = useState({}); // { total: [...], year: [...], month: [...], week: [...] }
//   const navigate = useNavigate();

//   useEffect(() => {
//     // SINGLE API CALL → /stats (remove other API)
//     const fetchStats = async () => {
//       try {
//         const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/dashboard/stats`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('authToken')}`,
//           },
//         });
//         const data = await response.json();
//         setStats(data);
//         setTimeout(() => setLoading(false), 600); // keep the subtle shimmer feel
//       } catch (err) {
//         console.error(err);
//         setLoading(false);
//       }
//     };
//     fetchStats();
//   }, []);

//   // Build (or reuse) randomized revenue series for the selected range
//   useEffect(() => {
//     if (!stats) return;
//     const totalForRange = stats?.revenue?.[timeRange] ?? 0;
//     setRevenueCache((prev) => {
//       // cache per range to keep consistency when toggling
//       if (prev[timeRange]) return prev;
//       return { ...prev, [timeRange]: generateRandomRevenueData(totalForRange) };
//     });
//   }, [stats, timeRange]);

//   // Helpers to safely read numbers for each range
//   const clientsCount = useMemo(() => {
//     if (!stats?.stats?.clients) return 0;
//     if (timeRange === 'total') return stats.stats.clients.total ?? 0;
//     const obj = stats.stats.clients[timeRange];
//     // API may return null for week/month/year → treat as 0
//     return obj?.total ?? (obj === null ? 0 : 0);
//   }, [stats, timeRange]);

//   const invoicesUnpaid = stats?.stats?.invoices?.[timeRange]?.unpaid ?? 0;
//   const proposalsPending = stats?.stats?.proposals?.[timeRange]?.pending ?? 0;
//   const meetingsUpcoming = stats?.stats?.meetings?.[timeRange]?.upcoming ?? 0;
//   const completedProjects = stats?.stats?.works?.[timeRange]?.completed ?? 0;
//   const worksData = stats?.stats?.works?.[timeRange] ?? {
//     completed: 0,
//     pending: 0,
//   };
//   const projectData = [
//     { name: "Completed", value: worksData.completed, color: "#4CAF50" },
//     { name: "Pending", value: worksData.pending, color: "#FF9800" },
//   ];

//   const worksObj = stats?.stats?.works?.[timeRange] || { total: 0, completed: 0, pending: 0 };
//   const inProgress = Math.max(
//     0,
//     (worksObj.total || 0) - (worksObj.completed || 0) - (worksObj.pending || 0)
//   );

//   const totalRevenueSelected = stats?.revenue?.[timeRange] ?? 0;
//   const revenueData = useMemo(() => {
//     if (!stats?.revenue) return [];

//     return [
//       { label: "Week", revenue: stats.revenue.week || 0 },
//       { label: "Month", revenue: stats.revenue.month || 0 },
//       { label: "Year", revenue: stats.revenue.year || 0 },
//       { label: "All Time", revenue: stats.revenue.total || 0 },
//     ];
//   }, [stats]);


import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell
  } from 'recharts';
import { useNavigate } from 'react-router-dom';

const TIME_RANGES = ["total", "year", "month", "week"];

const rangeLabel = (range) => {
  switch (range) {
    case "total": return "All Time";
    case "year": return "This Year";
    case "month": return "This Month";
    case "week": return "This Week";
    default: return range;
  }
};

const FreelancerDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCard, setActiveCard] = useState(null);
  const [timeRange, setTimeRange] = useState('total');
  const navigate = useNavigate();

  // 🟢 Fetch single /stats API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/dashboard/stats`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        const data = await response.json();
        setStats(data);
        setTimeout(() => setLoading(false), 600); // subtle shimmer delay
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // 🟢 Extract all key stats safely
  const clientsCount = stats?.stats?.clients?.[timeRange]?.total ?? 0;
  const invoicesUnpaid = stats?.stats?.invoices?.[timeRange]?.unpaid ?? 0;
  const proposalsPending = stats?.stats?.proposals?.[timeRange]?.pending ?? 0;
  const meetingsUpcoming = stats?.stats?.meetings?.[timeRange]?.upcoming ?? 0;
  const worksData = stats?.stats?.works?.[timeRange] ?? { completed: 0, pending: 0, total: 0 };
  const totalRevenueSelected = stats?.revenue?.[timeRange] ?? 0;
    const projectData = [
      { name: "Completed", value: worksData.completed, color: "#4CAF50" },
      { name: "Pending", value: worksData.pending, color: "#FF9800" },
    ];

  // 🟢 Prepare real revenue data for chart
  // Backend gives only summary per range (no monthly breakdown), so:
  // - Show a single point if revenue exists.
  // - Else empty state message.
  const revenueData = useMemo(() => {
    if (!stats?.revenue) return [];
    const value = stats.revenue[timeRange] ?? 0;
    if (!value || value <= 0) return [];
    return [{ label: rangeLabel(timeRange), revenue: value }];
  }, [stats, timeRange]);


  const StatCard = ({ icon, title, value, subtitle, color, index, trend, detail }) => (
    <Card
      className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${activeCard === index ? 'ring-2 ring-purple-500 shadow-lg' : ''}`}
      onClick={() => setActiveCard(activeCard === index ? null : index)}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-full ${color} transition-transform duration-300 group-hover:scale-110`}>
              {icon}
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 transition-colors duration-300">
                {value}
              </div>
              <div className="text-sm font-medium text-gray-600">{title}</div>
              {subtitle && (
                <div className="text-xs text-gray-500 mt-1">{subtitle}</div>
              )}
            </div>
          </div>
          {trend && (
            <div className={`text-xs font-semibold px-2 py-1 rounded-full ${trend.positive ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'}`}>
              {trend.positive ? '+' : ''}{trend.value}%
            </div>
          )}
        </div>

        {activeCard === index && (
          <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in">
            <div className="text-sm text-gray-600">{detail}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (loading) {
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Welcome + Time Range */}
        <div className="animate-fade-in">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-purple-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                  👋 Welcome, <span className="text-purple-600">{stats?.freelancer?.name || 'Freelancer'}</span>
                </h1>
                <p className="text-gray-600 text-base sm:text-lg">Here's what's happening with your freelance business</p>
              </div>

              {/* Time Range Toggle */}
              <div className="flex items-center gap-2 flex-wrap">
                {TIME_RANGES.map((r) => (
                  <Button
                    key={r}
                    variant={timeRange === r ? 'default' : 'outline'}
                    className={timeRange === r ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' : ''}
                    onClick={() => setTimeRange(r)}
                  >
                    {rangeLabel(r)}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6">
          <StatCard
            icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" /></svg>}
            title="Total Clients"
            value={clientsCount}
            subtitle={rangeLabel(timeRange)}
            color="bg-gradient-to-br from-blue-500 to-blue-600"
            index={0}
            detail={`Clients ${rangeLabel(timeRange).toLowerCase()}`}
          />

          <StatCard
            icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
            title="Unpaid Invoices"
            value={invoicesUnpaid}
            subtitle={rangeLabel(timeRange)}
            color="bg-gradient-to-br from-red-500 to-red-600"
            index={1}
            detail={`Invoices requiring attention ${rangeLabel(timeRange).toLowerCase()}`}
          />

          <StatCard
            icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" /></svg>}
            title="Pending Proposals"
            value={proposalsPending}
            subtitle={rangeLabel(timeRange)}
            color="bg-gradient-to-br from-purple-500 to-purple-600"
            index={2}
            detail={`Awaiting client response ${rangeLabel(timeRange).toLowerCase()}`}
          />

          <StatCard
            icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a4 4 0 118 0v4m-8 0h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2z" /></svg>}
            title="Upcoming Meetings"
            value={meetingsUpcoming}
            subtitle={rangeLabel(timeRange)}
            color="bg-gradient-to-br from-green-500 to-green-600"
            index={3}
            detail={`Scheduled meetings ${rangeLabel(timeRange).toLowerCase()}`}
          />

          {/* <StatCard
            icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>}
            title="Proposal Credits"
            value={"N/A"}
            subtitle={"Not in API"}
            color="bg-gradient-to-br from-yellow-500 to-yellow-600"
            index={4}
            detail={`This API does not provide proposal credits.`}
          />

          <StatCard
            icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            title="Completed Projects"
            value={completedProjects}
            subtitle={rangeLabel(timeRange)}
            color="bg-gradient-to-br from-indigo-500 to-indigo-600"
            index={5}
            detail={`Projects completed ${rangeLabel(timeRange).toLowerCase()}`}
          /> */}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          {/* <div className="xl:col-span-2">
            <Card className="h-full animate-fade-in-up">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">📈 Monthly Revenue</h3>
                    <p className="text-gray-600">Track your income over time</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-600">
                      ₹{(totalRevenueSelected || 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">Revenue ({rangeLabel(timeRange)})</div>
                  </div>
                </div>

                {revenueData.length === 0 ? (
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <p>No paid invoices yet.</p>
                      <p className="text-xs">Start creating invoices to see your revenue!</p>
                    </div>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" stroke="#666" fontSize={12} />
                        <YAxis stroke="#666" fontSize={12} tickFormatter={(value) => `₹${value}`} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#fff',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                        formatter={(value) => [`$${value}`, 'Revenue']}
                      />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="url(#gradientPurple)"
                        strokeWidth={3}
                        dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: '#8B5CF6', strokeWidth: 2 }}
                      />
                      <defs>
                        <linearGradient id="gradientPurple" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#8B5CF6" />
                          <stop offset="100%" stopColor="#6366F1" />
                        </linearGradient>
                      </defs>
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </div> */}
          {/* Revenue Chart */}
          <div className="xl:col-span-2">
            <Card className="h-full animate-fade-in-up">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">📈 Revenue Overview</h3>
                    <p className="text-gray-600">Track your earnings over time</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-600">
                      ₹{(stats?.revenue?.[timeRange] || 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">Revenue ({rangeLabel(timeRange)})</div>
                  </div>
                </div>

                {revenueData.length === 0 ? (
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <p>No revenue data yet.</p>
                      <p className="text-xs">Complete paid works to see earnings.</p>
                    </div>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="label" stroke="#666" fontSize={12} />
                      <YAxis stroke="#666" fontSize={12} tickFormatter={(v) => `₹${v}`} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#fff',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                        formatter={(value) => [`₹${value}`, 'Revenue']}
                      />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="url(#gradientPurple)"
                        strokeWidth={3}
                        dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: '#8B5CF6', strokeWidth: 2 }}
                      />
                      <defs>
                        <linearGradient id="gradientPurple" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#8B5CF6" />
                          <stop offset="100%" stopColor="#6366F1" />
                        </linearGradient>
                      </defs>
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </div>


          {/* Project Status Pie Chart */}
          <div className="xl:col-span-1">
            <Card className="h-full animate-fade-in-up">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">📊 Work Status</h3>
                <p className="text-gray-600 mb-6">Current project breakdown — {rangeLabel(timeRange)}</p>

                <ResponsiveContainer width="100%" height={250}>
                  <PieChart width={300} height={300}>
                    <Pie
                      data={projectData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {projectData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>

                <div className="mt-4 space-y-2">
                  {projectData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm text-gray-700">{item.name}</span>
                      </div>
                      <span className="font-medium text-gray-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="animate-fade-in-up">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">⚡ Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
                onClick={() => navigate("/dashboard/invoices")}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Create Invoice
              </Button>

              <Button
                variant="outline"
                className="border-2 border-purple-200 text-purple-600 hover:bg-purple-50 font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                onClick={() => navigate("/dashboard/proposals")}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Send Proposal
              </Button>

              <Button
                variant="secondary"
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                onClick={() => navigate("/dashboard/meetings")}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a4 4 0 118 0v4m-8 0h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2z" />
                </svg>
                Schedule Meeting
              </Button>

              <Button
                variant="outline"
                className="border-2 border-green-200 text-green-600 hover:bg-green-50 font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                View Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .grid > * {
          animation: fade-in-up 0.6s ease-out;
          animation-fill-mode: both;
        }
        
        .grid > *:nth-child(1) { animation-delay: 0.1s; }
        .grid > *:nth-child(2) { animation-delay: 0.2s; }
        .grid > *:nth-child(3) { animation-delay: 0.3s; }
        .grid > *:nth-child(4) { animation-delay: 0.4s; }
        .grid > *:nth-child(5) { animation-delay: 0.5s; }
        .grid > *:nth-child(6) { animation-delay: 0.6s; }
      `}</style>
    </div>
  );
};

export default FreelancerDashboard;
