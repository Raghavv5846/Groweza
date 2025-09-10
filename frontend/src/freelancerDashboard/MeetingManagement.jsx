// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const MeetingManagement = () => {
//   const token = localStorage.getItem('authToken');
//   const [meetings, setMeetings] = useState([]);
//   const [availability, setAvailability] = useState(null);
//   const [showMeetingModal, setShowMeetingModal] = useState(false);
//   const [showRescheduleModal, setShowRescheduleModal] = useState(false);
//   const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
//   const [selectedMeeting, setSelectedMeeting] = useState(null);

//   const [form, setForm] = useState({
//     clientName: '',
//     clientEmail: '',
//     meetingDate: '',
//     startTime: '',
//     endTime: '',
//     platform: 'Zoom',
//     notes: ''
//   });

//   const [rescheduleForm, setRescheduleForm] = useState({
//     newDate: '',
//     newStartTime: '',
//     newEndTime: ''
//   });

//   const [availabilityForm, setAvailabilityForm] = useState({
//     day: 'Monday',
//     timeSlots: [{ start: '', end: '' }]
//   });

//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   };

//   // Fetch meetings
//   const fetchMeetings = async () => {
//     try {
//       const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/meetings`, config);
//       setMeetings(data);
//     } catch {
//       toast.error('Failed to fetch meetings');
//     }
//   };

//   // Fetch availability
//   const fetchAvailability = async () => {
//     try {
//       const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/availability`, config);
//       setAvailability(data);
//     } catch {
//       setAvailability(null);
//     }
//   };

//   useEffect(() => {
//     fetchMeetings();
//     fetchAvailability();
//   }, []);

//   // Create meeting
//   const handleCreateMeeting = async () => {
//     try {
//       await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/meetings`, form, config);
//       toast.success('Meeting created');
//       fetchMeetings();
//       setShowMeetingModal(false);
//     } catch {
//       toast.error('Creation failed');
//     }
//   };

//   // Reschedule
//   const handleReschedule = async () => {
//     try {
//       await axios.put(
//         `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/meetings/reschedule/${selectedMeeting._id}`,
//         rescheduleForm,
//         config
//       );
//       toast.success('Meeting rescheduled');
//       fetchMeetings();
//       setShowRescheduleModal(false);
//     } catch {
//       toast.error('Reschedule failed');
//     }
//   };

//   // Delete
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/meetings/${id}`, config);
//       toast.success('Deleted');
//       fetchMeetings();
//     } catch {
//       toast.error('Delete failed');
//     }
//   };

//   // Set availability
//   const handleSetAvailability = async () => {
//     try {
//       await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/availability`, availabilityForm, config);
//       toast.success('Availability updated');
//       fetchAvailability();
//       setShowAvailabilityModal(false);
//     } catch {
//       toast.error('Failed to set availability');
//     }
//   };

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold">Meetings</h2>
//         <div className="space-x-2">
//           <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setShowMeetingModal(true)}>+ New Meeting</button>
//           <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => setShowAvailabilityModal(true)}>Set Availability</button>
//         </div>
//       </div>

//       {meetings.map((m) => (
//         <div key={m._id} className="p-4 border rounded shadow flex justify-between items-center">
//           <div>
//             <p><strong>{m.clientName}</strong> — {m.clientEmail}</p>
//             <p>{new Date(m.meetingDate).toLocaleDateString()} | {m.startTime} - {m.endTime}</p>
//             <p className="text-sm text-gray-600">{m.platform} Link: <a href={m.meetingLink} target="_blank" className="text-blue-500">{m.meetingLink}</a></p>
//             <p>Status: <span className="font-semibold">{m.status}</span></p>
//           </div>
//           <div className="space-x-2">
//             <button onClick={() => { setSelectedMeeting(m); setShowRescheduleModal(true); }} className="text-yellow-600">Reschedule</button>
//             <button onClick={() => handleDelete(m._id)} className="text-red-600">Delete</button>
//           </div>
//         </div>
//       ))}

//       {/* Modal: Create Meeting */}
//       {showMeetingModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded shadow w-full max-w-lg space-y-2">
//             <h3 className="text-xl font-bold">New Meeting</h3>
//             <input className="w-full border p-2" placeholder="Client Name" onChange={(e) => setForm({ ...form, clientName: e.target.value })} />
//             <input className="w-full border p-2" placeholder="Client Email" onChange={(e) => setForm({ ...form, clientEmail: e.target.value })} />
//             <input className="w-full border p-2" type="date" onChange={(e) => setForm({ ...form, meetingDate: e.target.value })} />
//             <input className="w-full border p-2" placeholder="Start Time" onChange={(e) => setForm({ ...form, startTime: e.target.value })} />
//             <input className="w-full border p-2" placeholder="End Time" onChange={(e) => setForm({ ...form, endTime: e.target.value })} />
//             <select className="w-full border p-2" onChange={(e) => setForm({ ...form, platform: e.target.value })}>
//               <option>Zoom</option>
//               <option>Google Meet</option>
//             </select>
//             <textarea className="w-full border p-2" placeholder="Notes" onChange={(e) => setForm({ ...form, notes: e.target.value })} />
//             <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleCreateMeeting}>Create</button>
//             <button className="ml-2 text-gray-600" onClick={() => setShowMeetingModal(false)}>Cancel</button>
//           </div>
//         </div>
//       )}

//       {/* Modal: Reschedule Meeting */}
//       {showRescheduleModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded shadow w-full max-w-md space-y-2">
//             <h3 className="text-xl font-bold">Reschedule Meeting</h3>
//             <input className="w-full border p-2" type="date" onChange={(e) => setRescheduleForm({ ...rescheduleForm, newDate: e.target.value })} />
//             <input className="w-full border p-2" placeholder="New Start Time" onChange={(e) => setRescheduleForm({ ...rescheduleForm, newStartTime: e.target.value })} />
//             <input className="w-full border p-2" placeholder="New End Time" onChange={(e) => setRescheduleForm({ ...rescheduleForm, newEndTime: e.target.value })} />
//             <button className="bg-yellow-600 text-white px-4 py-2 rounded" onClick={handleReschedule}>Update</button>
//             <button className="ml-2 text-gray-600" onClick={() => setShowRescheduleModal(false)}>Cancel</button>
//           </div>
//         </div>
//       )}

//       {/* Modal: Set Availability */}
//       {showAvailabilityModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded shadow w-full max-w-md space-y-2">
//             <h3 className="text-xl font-bold">Set Availability</h3>
//             <select className="w-full border p-2" onChange={(e) => setAvailabilityForm({ ...availabilityForm, day: e.target.value })}>
//               {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
//                 <option key={day}>{day}</option>
//               ))}
//             </select>
//             {availabilityForm.timeSlots.map((slot, idx) => (
//               <div key={idx} className="flex gap-2">
//                 <input className="border p-2 w-full" placeholder="Start" onChange={(e) => {
//                   const newSlots = [...availabilityForm.timeSlots];
//                   newSlots[idx].start = e.target.value;
//                   setAvailabilityForm({ ...availabilityForm, timeSlots: newSlots });
//                 }} />
//                 <input className="border p-2 w-full" placeholder="End" onChange={(e) => {
//                   const newSlots = [...availabilityForm.timeSlots];
//                   newSlots[idx].end = e.target.value;
//                   setAvailabilityForm({ ...availabilityForm, timeSlots: newSlots });
//                 }} />
//               </div>
//             ))}
//             <button className="text-sm text-blue-500" onClick={() => setAvailabilityForm({ ...availabilityForm, timeSlots: [...availabilityForm.timeSlots, { start: '', end: '' }] })}>+ Add Slot</button>
//             <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleSetAvailability}>Save</button>
//             <button className="ml-2 text-gray-600" onClick={() => setShowAvailabilityModal(false)}>Cancel</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MeetingManagement;



import React, { useEffect, useState } from 'react';
import { Calendar, Clock, Users, Video, Mail, Plus, Edit3, Trash2, CheckCircle, XCircle, ReceiptRussianRubleIcon, Check, Zap, Crown, X } from 'lucide-react';
import axios from "axios";
import {toast} from "react-toastify";
import PendingMeetingRequestsModal from './components/PendingMeetingRequestModal';
import { isLimitReached } from '../helpers/CheckLimit';
const MeetingManagement = () => {
  const token = localStorage.getItem('authToken');
  const [meetings, setMeetings] = useState([]);
  const [availability, setAvailability] = useState(null);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const[cancelMeeting  , setCancelMeeting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    clientName: '',
    clientEmail: '',
    meetingDate: '',
    startTime: '',
    endTime: '',
    platform: 'Zoom',
    notes: ''
  });

  const [rescheduleForm, setRescheduleForm] = useState({
    newDate: '',
    newStartTime: '',
    newEndTime: ''
  });

  const [availabilityForm, setAvailabilityForm] = useState({
    day: 'Monday',
    timeSlots: [{ start: '', end: '' }]
  });

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };



  // Fetch Subscription =>
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

  const isMeetingLimitReached = isLimitReached(user, "meetings");


  // useEffect(() => {
  //   axios
  //     .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/subscription/me`)
  //     .then((res) => setSubscription(res.data))
  //     .catch((err) => console.error("Error fetching subscription:", err));
  // }, []);

  // const isMeetingLimitReached =
  //   subscription?.limits?.meetings?.used >= subscription?.limits?.meetings?.max;


  // Fetch meetings
  const fetchMeetings = async () => {
    setLoading(true);
    try {

      const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/meetings`, config);
      setMeetings(data);
      toast.success("Fetch meeting info ")
    } catch {
      toast.error('Failed to fetch meetings');
    } finally {
      setLoading(false);
    }
  };

  // Fetch availability
  const fetchAvailability = async () => {
    try {
      // Simulated API call - replace with actual axios call
      const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/availability`, config);
      setAvailability(data);
    } catch {
      setAvailability(null);
    }
  };

  useEffect(() => {
    fetchMeetings();
    fetchAvailability();
  }, []);

  // Create meeting
  const handleCreateMeeting = async () => {
    setLoading(true);
    try {
      // Simulated API call - replace with actual axios call
      await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/meetings`, form, config);
      


      toast.success('Meeting created successfully');
      fetchMeetings();
      setShowMeetingModal(false);
      setForm({
        clientName: '',
        clientEmail: '',
        meetingDate: '',
        startTime: '',
        endTime: '',
        platform: 'Zoom',
        notes: ''
      });
    } catch {
      toast.error('Creation failed');
    } finally {
      setLoading(false);
    }
  };

  // Reschedule
  const handleReschedule = async () => {
    setLoading(true);
      try {
            await axios.put(
              `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/meetings/reschedule/${selectedMeeting._id}`,
              rescheduleForm,
              config
            );
            toast.success('Meeting rescheduled');
            fetchMeetings();
            setShowRescheduleModal(false);
      setRescheduleForm({ newDate: '', newStartTime: '', newEndTime: '' });
    } catch {
      toast.error('Reschedule failed');
    } finally {
      setLoading(false);
    }
  };


  const handleCancel = async (meetingToCancel) => {
    setLoading(true);
    try {
      await axios.put(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/meetings/cancel/${meetingToCancel._id}`,{},
        config // ← You passed config as the body, but that should be the headers if used
      );
      toast.success('Meeting cancelled');
      fetchMeetings();
    } catch {
      toast.error('Reschedule failed');
    } finally {
      setLoading(false);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      // Simulated API call - replace with actual axios call
      await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/meetings/${id}`, config);

      setMeetings(meetings.filter(m => m._id !== id));
      toast.success('Meeting deleted successfully');
      fetchMeetings();
    } catch {
      toast.error('Delete failed');
    } finally {
      setLoading(false);
    }
  };

  // Set availability
  const handleSetAvailability = async () => {
    setLoading(true);
    try {
      // Simulated API call - replace with actual axios call
      await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/availability`, availabilityForm, config);

      setAvailability(availabilityForm);
      toast.success('Availability updated successfully');
      fetchAvailability();
      setShowAvailabilityModal(false);
    } catch {
      toast.error('Failed to set availability');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Scheduled': return <Clock className="w-4 h-4" />;
      case 'Completed': return <CheckCircle className="w-4 h-4" />;
      case 'Cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-slate-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                  Create <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Professional Meetings</span>
                </h1>
                <p className="text-gray-600 text-lg">Generate beautiful invoices in minutes</p>
              </div>
              </div>
            <div className="flex flex-col sm:flex-row gap-3">
              {/* <button
                onClick={() => setShowMeetingModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
              >
                <Plus className="w-5 h-5" />
                New Meeting
              </button> */}

              <button
                onClick={() =>
                  isMeetingLimitReached ? setShowUpgradeModal(true) : setShowMeetingModal(true)
                }
                disabled={false} // still clickable, just changes behavior
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all duration-200 transform active:scale-95 shadow-lg ${isMeetingLimitReached
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
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
                {isMeetingLimitReached ? "Upgrade to Unlock" : "Add Meeting"}
              </button>

              {/* <button onClick={() => setRequestModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded
              shadow-lg hover:shadow-xl cursor-pointer">
                View Meeting Requests
              </button> */}
              <button
                onClick={() => setShowAvailabilityModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 rounded-xl font-medium hover:from-green-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
              >
                <Clock className="w-5 h-5" />
                Set Availability
              </button>
            </div>
          </div>
        </div>

        {/* Meetings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {loading ? (
            // Loading skeleton
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))
          ) : meetings.length === 0 ? (
            <div className="col-span-full bg-white rounded-2xl shadow-lg p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No meetings scheduled</h3>
              <p className="text-gray-600 mb-6">Create your first meeting to get started</p>
              <button
                onClick={() => setShowMeetingModal(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 cursor-pointer"
              >
                <Plus className="w-5 h-5 inline mr-2" />
                Create Meeting
              </button>
            </div>
          ) : (
            meetings.map((meeting) => (
              <div key={meeting._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-200">
                <div className="p-6">
                  <div className="flex items-start justify-around mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{meeting.clientName}</h3>
                        <p className="text-gray-600 flex items-center gap-1 mt-1">
                          <Mail className="w-4 h-4" />
                          {meeting.clientEmail}
                        </p>
                      </div>
                    </div>
                    <div className={`px-3 py-1  rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(meeting.status)}`}>
                      {getStatusIcon(meeting.status)}
                      {meeting.status}
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">{new Date(meeting.meetingDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock className="w-4 h-4 text-green-500" />
                      <span>{meeting.startTime} - {meeting.endTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Video className="w-4 h-4 text-purple-500" />
                      <span>{meeting.platform}</span>
                      <a
                        href={meeting.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700 underline ml-2"
                      >
                        Join
                      </a>
                    </div>
                  </div>

                  {meeting.notes && (
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <p className="text-sm text-gray-700">{meeting.notes}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => { setSelectedMeeting(meeting); setShowRescheduleModal(true); }}
                      className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-600 transition-colors duration-200 cursor-pointer"
                    >
                      <Edit3 className="w-4 h-4" />
                      Reschedule
                    </button>

                    <button
                      onClick={() => handleCancel(meeting)}
                      className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-600 transition-colors duration-200 cursor-pointer"
                    >
                      <ReceiptRussianRubleIcon className="w-4 h-4" />
                      Cancel
                    </button>

                    <button
                      onClick={() => handleDelete(meeting._id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors duration-200 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modals */}
        {/* Create Meeting Modal */}
        {showMeetingModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                    <Plus className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Create New Meeting</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                    <input
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter client name"
                      value={form.clientName}
                      onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Client Email</label>
                    <input
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter client email"
                      type="email"
                      value={form.clientEmail}
                      onChange={(e) => setForm({ ...form, clientEmail: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Date</label>
                    <input
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      type="date"
                      value={form.meetingDate}
                      onChange={(e) => setForm({ ...form, meetingDate: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                      <input
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        type="time"
                        value={form.startTime}
                        onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                      <input
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        type="time"
                        value={form.endTime}
                        onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      value={form.platform}
                      onChange={(e) => setForm({ ...form, platform: e.target.value })}
                    >
                      {/* <option value="Zoom">Zoom</option> */}
                      <option value="Google Meet">Google Meet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                    <textarea
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Add meeting notes..."
                      rows="3"
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleCreateMeeting}
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? 'Creating...' : 'Create Meeting'}
                  </button>
                  <button
                    onClick={() => setShowMeetingModal(false)}
                    className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <PendingMeetingRequestsModal isOpen={requestModalOpen} onClose={() => setRequestModalOpen(false)} />

        {/* Reschedule Modal */}
        {showRescheduleModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg">
                    <Edit3 className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Reschedule Meeting</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Date</label>
                    <input
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                      type="date"
                      value={rescheduleForm.newDate}
                      onChange={(e) => setRescheduleForm({ ...rescheduleForm, newDate: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                      <input
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                        type="time"
                        value={rescheduleForm.newStartTime}
                        onChange={(e) => setRescheduleForm({ ...rescheduleForm, newStartTime: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                      <input
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                        type="time"
                        value={rescheduleForm.newEndTime}
                        onChange={(e) => setRescheduleForm({ ...rescheduleForm, newEndTime: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleReschedule}
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:from-yellow-600 hover:to-orange-700 transition-all duration-200 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? 'Updating...' : 'Update Meeting'}
                  </button>
                  <button
                    onClick={() => setShowRescheduleModal(false)}
                    className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Availability Modal */}
        {showAvailabilityModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Set Availability</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Day</label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      value={availabilityForm.day}
                      onChange={(e) => setAvailabilityForm({ ...availabilityForm, day: e.target.value })}
                    >
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time Slots</label>
                    <div className="space-y-3">
                      {availabilityForm.timeSlots.map((slot, idx) => (
                        <div key={idx} className="flex gap-3 items-center">
                          <input
                            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                            type="time"
                            placeholder="Start time"
                            value={slot.start}
                            onChange={(e) => {
                              const newSlots = [...availabilityForm.timeSlots];
                              newSlots[idx].start = e.target.value;
                              setAvailabilityForm({ ...availabilityForm, timeSlots: newSlots });
                            }}
                          />
                          <input
                            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                            type="time"
                            placeholder="End time"
                            value={slot.end}
                            onChange={(e) => {
                              const newSlots = [...availabilityForm.timeSlots];
                              newSlots[idx].end = e.target.value;
                              setAvailabilityForm({ ...availabilityForm, timeSlots: newSlots });
                            }}
                          />
                          {availabilityForm.timeSlots.length > 1 && (
                            <button
                              onClick={() => {
                                const newSlots = availabilityForm.timeSlots.filter((_, i) => i !== idx);
                                setAvailabilityForm({ ...availabilityForm, timeSlots: newSlots });
                              }}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setAvailabilityForm({ ...availabilityForm, timeSlots: [...availabilityForm.timeSlots, { start: '', end: '' }] })}
                      className="mt-3 text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1 cursor-pointer
                      "
                    >
                      <Plus className="w-4 h-4" />
                      Add Time Slot
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleSetAvailability}
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:from-green-600 hover:to-teal-700 transition-all duration-200 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? 'Saving...' : 'Save Availability'}
                  </button>
                  <button
                    onClick={() => setShowAvailabilityModal(false)}
                    className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
                {availability && (
                  <div className="bg-white p-4 border mt-4 rounded shadow">
                    <h3 className="text-lg font-semibold mb-2">Your Weekly Availability</h3>
                    <p className="text-gray-700 font-medium mb-1">Day: {availability.day}</p>
                    {availability?.map((dayItem, index) => (
                      <div key={index}>
                        <h3 className="font-semibold text-gray-700">{dayItem.day}</h3>
                        <ul className="space-y-1 ml-4">
                          {dayItem.timeSlots.map((slot, idx) => (
                            <li key={idx} className="text-gray-600">
                              ⏰ {slot.start} - {slot.end}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}

                  </div>
                )}
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
      </div>
    </div>
  );
};

export default MeetingManagement;