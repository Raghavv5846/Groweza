import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PendingMeetingRequestsModal = ({ isOpen, onClose }) => {
    const [pendingMeetings, setPendingMeetings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPlatform, setSelectedPlatform] = useState({}); // key: meetingId

    useEffect(() => {
        if (isOpen) fetchPendingMeetings();
    }, [isOpen]);

    const fetchPendingMeetings = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/meetings`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });
            const onlyPending = res.data.filter(m => m.status === 'Pending');
            setPendingMeetings(onlyPending);
        } catch (err) {
            console.error('Failed to fetch meetings', err);
        }
        setLoading(false);
    };

    const handleAccept = async (meetingId) => {
        const platform = selectedPlatform[meetingId] || 'Zoom';
        try {
            await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/meetings/accept/${meetingId}`, { platform }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });
            fetchPendingMeetings();
        } catch (err) {
            alert("Failed to accept meeting");
        }
    };

    const handleReject = async (meetingId) => {
        try {
            await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/meetings/reject/${meetingId}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });
            fetchPendingMeetings();
        } catch (err) {
            alert("Failed to reject meeting");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Pending Meeting Requests</h2>
                    <button onClick={onClose} className="text-gray-500 cursor-pointer hover:text-black">&times;</button>
                </div>

                {loading ? (
                    <p>Loading...</p>
                ) : pendingMeetings.length === 0 ? (
                    <p>No pending meetings.</p>
                ) : (
                    pendingMeetings.map(meeting => (
                        <div key={meeting._id} className="border rounded-lg p-4 mb-4 shadow-sm">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p><strong>Client:</strong> {meeting.clientName} ({meeting.clientEmail})</p>
                                    <p><strong>Date:</strong> {new Date(meeting.meetingDate).toDateString()}</p>
                                    <p><strong>Time:</strong> {meeting.startTime} - {meeting.endTime}</p>
                                    <p><strong>Notes:</strong> {meeting.notes || 'None'}</p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <select
                                        value={selectedPlatform[meeting._id] || 'Zoom'}
                                        onChange={e => setSelectedPlatform(prev => ({ ...prev, [meeting._id]: e.target.value }))}
                                        className="border px-2 py-1 rounded"
                                    >
                                        <option value="Zoom">Zoom</option>
                                        <option value="Google Meet">Google Meet</option>
                                    </select>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleAccept(meeting._id)}
                                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleReject(meeting._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PendingMeetingRequestsModal;
