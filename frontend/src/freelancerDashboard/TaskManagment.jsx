// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const TaskManagement = () => {
//   const [clients, setClients] = useState([]);
//   const [tasks, setTasks] = useState([]);
//   const [filteredTasks, setFilteredTasks] = useState([]);
//   const [search, setSearch] = useState('');
//   const [statusTab, setStatusTab] = useState('All');
//   const [sortBy, setSortBy] = useState('');
//   const [startDateFilter, setStartDateFilter] = useState('');
//   const [endDateFilter, setEndDateFilter] = useState('');
//   const token = localStorage.getItem('authToken');

//   const fetchAllClients = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/clients`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setClients(res.data);

//       const allTasks = res.data.flatMap(client =>
//         client.works.map(work => ({
//           ...work,
//           clientName: client.name,
//           clientId: client._id,
//           isOverdue: !work.isWorkCompleted && new Date(work.endDate) < new Date(),
//         }))
//       );
//       setTasks(allTasks);
//     } catch (err) {
//       console.error(err);
//       toast.error('Failed to fetch tasks');
//     }
//   };

//   const handleStatusChange = async (clientId, workId, isCompleted) => {
//     try {
//       await axios.put(
//         `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/tasks/${clientId}/${workId}`,
//         { isWorkCompleted: isCompleted },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success('Task status updated');
//       fetchAllClients();
//     } catch (err) {
//       toast.error('Failed to update task');
//     }
//   };

//   useEffect(() => {
//     fetchAllClients();
//   }, []);

//   useEffect(() => {
//     let filtered = [...tasks];

//     if (statusTab === 'Pending') {
//       filtered = filtered.filter(t => !t.isWorkCompleted);
//     } else if (statusTab === 'Completed') {
//       filtered = filtered.filter(t => t.isWorkCompleted);
//     } else if (statusTab === 'Overdue') {
//       filtered = filtered.filter(t => t.isOverdue);
//     }

//     if (search.trim()) {
//       filtered = filtered.filter(task =>
//         task.clientName.toLowerCase().includes(search.toLowerCase()) ||
//         task.fieldOfWork.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     if (startDateFilter) {
//       filtered = filtered.filter(task => new Date(task.startDate) >= new Date(startDateFilter));
//     }

//     if (endDateFilter) {
//       filtered = filtered.filter(task => new Date(task.endDate) <= new Date(endDateFilter));
//     }

//     if (sortBy === 'start') {
//       filtered.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
//     } else if (sortBy === 'end') {
//       filtered.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
//     }

//     setFilteredTasks(filtered);
//   }, [tasks, search, statusTab, sortBy, startDateFilter, endDateFilter]);

//   return (
//     <div className="p-4 w-full">
//       <h2 className="text-2xl font-semibold mb-4">Tasks Dashboard</h2>

//       <div className="flex flex-wrap gap-4 mb-4 items-center">
//         <input
//           type="text"
//           placeholder="Search by client or work"
//           className="border px-4 py-2 rounded-lg w-1/3"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <input
//           type="date"
//           className="border px-3 py-2 rounded-lg cursor-pointer"
//           value={startDateFilter}
//           onChange={(e) => setStartDateFilter(e.target.value)}
//         />

//         <input
//           type="date"
//           className="border px-3 py-2 rounded-lg cursor-pointer"
//           value={endDateFilter}
//           onChange={(e) => setEndDateFilter(e.target.value)}
//         />

//         <select
//           className="border px-3 py-2 rounded-lg cursor-pointer"
//           value={sortBy}
//           onChange={(e) => setSortBy(e.target.value)}
//         >
//           <option value="">Sort By</option>
//           <option value="start">Start Date</option>
//           <option value="end">End Date</option>
//         </select>

//         <div className="flex gap-2">
//           {['All', 'Pending', 'Completed', 'Overdue'].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setStatusTab(tab)}
//               className={` cursor-pointer px-3 py-2 rounded-lg border ${statusTab === tab ? 'bg-blue-600 text-white' : 'bg-white'}`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>
//       </div>

//       <table className="w-full text-left border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-2">Client</th>
//             <th className="p-2">Work</th>
//             <th className="p-2">Start Date</th>
//             <th className="p-2">End Date</th>
//             <th className="p-2">Overdue</th>
//             <th className="p-2">Completed</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredTasks.map((task) => (
//             <tr key={task._id} className="border-t">
//               <td className="p-2 font-semibold text-blue-700">{task.clientName}</td>
//               <td className="p-2">{task.fieldOfWork}</td>
//               <td className="p-2">{new Date(task.startDate).toLocaleDateString()}</td>
//               <td className="p-2">{new Date(task.endDate).toLocaleDateString()}</td>
//               <td className="p-2">
//                 {task.isOverdue ? (
//                   <span className="text-red-500 font-semibold">Yes</span>
//                 ) : (
//                   <span className="text-green-600">No</span>
//                 )}
//               </td>
//               <td className="p-2">
//                 <input
//                   type="checkbox"
//                   checked={task.isWorkCompleted}
//                   onChange={(e) =>
//                     handleStatusChange(task.clientId, task._id, e.target.checked)
//                   }
//                   className='cursor-pointer'
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TaskManagement;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const TaskManagement = () => {
  const [clients, setClients] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [statusTab, setStatusTab] = useState('All');
  const [sortBy, setSortBy] = useState('');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const token = localStorage.getItem('authToken');

  // Mock data for demonstration
  // const mockTasks = [
  //   {
  //     _id: '1',
  //     clientName: 'Tech Solutions',
  //     fieldOfWork: 'React Development',
  //     startDate: '2024-06-01',
  //     endDate: '2024-06-30',
  //     isWorkCompleted: false,
  //     clientId: 'client1',
  //     isOverdue: false
  //   },
  //   {
  //     _id: '2',
  //     clientName: 'Creative Agency',
  //     fieldOfWork: 'Brand Design',
  //     startDate: '2024-05-15',
  //     endDate: '2024-06-15',
  //     isWorkCompleted: true,
  //     clientId: 'client2',
  //     isOverdue: false
  //   },
  //   {
  //     _id: '3',
  //     clientName: 'E-commerce Store',
  //     fieldOfWork: 'Mobile App Development',
  //     startDate: '2024-05-01',
  //     endDate: '2024-06-01',
  //     isWorkCompleted: false,
  //     clientId: 'client3',
  //     isOverdue: true
  //   },
  //   {
  //     _id: '4',
  //     clientName: 'Marketing Hub',
  //     fieldOfWork: 'SEO Optimization',
  //     startDate: '2024-06-10',
  //     endDate: '2024-07-10',
  //     isWorkCompleted: false,
  //     clientId: 'client4',
  //     isOverdue: false
  //   },
  //   {
  //     _id: '5',
  //     clientName: 'Startup Inc',
  //     fieldOfWork: 'Web Development',
  //     startDate: '2024-06-05',
  //     endDate: '2024-07-05',
  //     isWorkCompleted: true,
  //     clientId: 'client5',
  //     isOverdue: false
  //   },
  //   {
  //     _id: '6',
  //     clientName: 'Finance Corp',
  //     fieldOfWork: 'Dashboard Development',
  //     startDate: '2024-04-20',
  //     endDate: '2024-05-20',
  //     isWorkCompleted: false,
  //     clientId: 'client6',
  //     isOverdue: true
  //   }
  // ];

  const fetchAllClients = async () => {
    setIsLoading(true);
    try {
      // Commented out axios call - using mock data instead
      
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/clients`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClients(res.data);

      const allTasks = res.data.flatMap(client =>
        client.works.map(work => ({
          ...work,
          clientName: client.name,
          clientId: client._id,
          isOverdue: !work.isWorkCompleted && new Date(work.endDate) < new Date(),
        }))
      );
      

      // Using mock data with overdue calculation
      // const allTasks = mockTasks.map(task => ({
      //   ...task,
      //   isOverdue: !task.isWorkCompleted && new Date(task.endDate) < new Date(),
      // }));

      setTasks(allTasks);
      setTimeout(() => setIsLoading(false), 1000); // Simulate loading
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch tasks');
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (clientId, workId, isCompleted) => {
    try {
      // Commented out axios call
      
      await axios.put(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/tasks/${clientId}/${workId}`,
        { isWorkCompleted: isCompleted },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      

      // Update local state for demo
      // setTasks(prev => prev.map(task =>
      //   task._id === workId ? { ...task, isWorkCompleted: isCompleted } : task
      // ));

      toast.success('Task status updated');
      fetchAllClients();
    } catch (err) {
      toast.error('Failed to update task');
    }
  };

  useEffect(() => {
    fetchAllClients();
  }, []);

  useEffect(() => {
    let filtered = [...tasks];

    if (statusTab === 'Pending') {
      filtered = filtered.filter(t => !t.isWorkCompleted);
    } else if (statusTab === 'Completed') {
      filtered = filtered.filter(t => t.isWorkCompleted);
    } else if (statusTab === 'Overdue') {
      filtered = filtered.filter(t => t.isOverdue);
    }

    if (search.trim()) {
      filtered = filtered.filter(task =>
        task.clientName.toLowerCase().includes(search.toLowerCase()) ||
        task.fieldOfWork.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (startDateFilter) {
      filtered = filtered.filter(task => new Date(task.startDate) >= new Date(startDateFilter));
    }

    if (endDateFilter) {
      filtered = filtered.filter(task => new Date(task.endDate) <= new Date(endDateFilter));
    }

    if (sortBy === 'start') {
      filtered.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    } else if (sortBy === 'end') {
      filtered.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
    }

    setFilteredTasks(filtered);
  }, [tasks, search, statusTab, sortBy, startDateFilter, endDateFilter]);

  // Calculate task statistics
  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.isWorkCompleted).length,
    pending: tasks.filter(t => !t.isWorkCompleted && !t.isOverdue).length,
    overdue: tasks.filter(t => t.isOverdue).length
  };

  const StatCard = ({ title, count, bgColor, textColor, icon }) => (
    <div className={`${bgColor} p-4 md:p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm md:text-lg font-medium text-gray-700">{title}</h3>
          <p className={`text-xl md:text-3xl font-bold ${textColor} mt-1`}>{count}</p>
        </div>
        <div className="text-2xl md:text-3xl ">
          {icon}
        </div>
      </div>
    </div>
  );

  const TabButton = ({ tab, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 cursor-pointer rounded-lg font-medium transition-all duration-200 ${isActive
          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
          : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
        }`}
    >
      {tab}
    </button>
  );

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-32">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (isLoading) {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 w-[90%]">
      <div className=" mx-auto">
        <div className="animate-fade-in">
          <div className="text-center mb-8 mt-8 animate-slide-down">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
               <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Task Management</span>
            </h1>
            <p className="text-gray-600 text-lg">See if any work pending</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 animate-slide-up">
            <StatCard
              title="Total"
              count={taskStats.total}
              bgColor="bg-gradient-to-r from-blue-100 to-blue-200"
              textColor="text-blue-700"
              icon="📋"
            />
            <StatCard
              title="Completed"
              count={taskStats.completed}
              bgColor="bg-gradient-to-r from-green-100 to-green-200"
              textColor="text-green-700"
              icon="✅"
            />
            <StatCard
              title="Pending"
              count={taskStats.pending}
              bgColor="bg-gradient-to-r from-yellow-100 to-yellow-200"
              textColor="text-yellow-700"
              icon="⏳"
            />
            <StatCard
              title="Overdue"
              count={taskStats.overdue}
              bgColor="bg-gradient-to-r from-red-100 to-red-200"
              textColor="text-red-700"
              icon="⚠️"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start ">
            {['All', 'Pending', 'Completed', 'Overdue'].map((tab) => (
              <TabButton
                className="cursor-pointer"
                key={tab}
                tab={tab}
                isActive={statusTab === tab}
                onClick={() => setStatusTab(tab)}
                

              />
            ))}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by client or work..."
                  className="w-full border border-gray-300 px-4 py-2 pl-10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  🔍
                </div>
              </div>

              <div className="relative">
                <input
                  type="date"
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
                  value={startDateFilter}
                  onChange={(e) => setStartDateFilter(e.target.value)}
                  placeholder="Start Date"
                />
                <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-500">
                  Start Date
                </label>
              </div>

              <div className="relative">
                <input
                  type="date"
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
                  value={endDateFilter}
                  onChange={(e) => setEndDateFilter(e.target.value)}
                  placeholder="End Date"
                />
                <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-500">
                  End Date
                </label>
              </div>

              <select
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Sort By</option>
                <option value="start">Start Date</option>
                <option value="end">End Date</option>
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
                    <th className="px-6 py-4 text-left font-semibold">Start Date</th>
                    <th className="px-6 py-4 text-left font-semibold">End Date</th>
                    <th className="px-6 py-4 text-left font-semibold">Status</th>
                    <th className="px-6 py-4 text-left font-semibold">Completed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredTasks.map((task, index) => (
                    <tr
                      key={task._id}
                      className="hover:bg-gray-50 transition-colors duration-200 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <td className="px-6 py-4 font-medium text-blue-700">{task.clientName}</td>
                      <td className="px-6 py-4 text-gray-900">{task.fieldOfWork}</td>
                      <td className="px-6 py-4 text-gray-600">{new Date(task.startDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-gray-600">{new Date(task.endDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        {task.isOverdue ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            🚨 Overdue
                          </span>
                        ) : task.isWorkCompleted ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            ✅ Completed
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            ⏳ Pending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={task.isWorkCompleted}
                            onChange={(e) => handleStatusChange(task.clientId, task._id, e.target.checked)}
                            className="sr-only"
                          />
                          <div className={`relative w-6 h-6 rounded-md border-2 transition-all duration-200 ${task.isWorkCompleted
                              ? 'bg-green-500 border-green-500'
                              : 'border-gray-300 hover:border-blue-500'
                            }`}>
                            {task.isWorkCompleted && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-white text-sm">✓</span>
                              </div>
                            )}
                          </div>
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {filteredTasks.map((task, index) => (
              <div
                key={task._id}
                className="bg-white rounded-xl shadow-lg p-4 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-700">{task.clientName}</h3>
                    <p className="text-sm text-gray-600">{task.fieldOfWork}</p>
                  </div>
                  <div className="ml-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={task.isWorkCompleted}
                        onChange={(e) => handleStatusChange(task.clientId, task._id, e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`relative w-6 h-6 rounded-md border-2 transition-all duration-200 ${task.isWorkCompleted
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-300 hover:border-blue-500'
                        }`}>
                        {task.isWorkCompleted && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white text-sm">✓</span>
                          </div>
                        )}
                      </div>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                  <div>
                    <p className="text-gray-500">Start Date</p>
                    <p className="font-medium">{new Date(task.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">End Date</p>
                    <p className="font-medium">{new Date(task.endDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    {task.isOverdue ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        🚨 Overdue
                      </span>
                    ) : task.isWorkCompleted ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        ✅ Completed
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        ⏳ Pending
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTasks.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl shadow-lg">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No tasks found</h3>
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

export default TaskManagement;