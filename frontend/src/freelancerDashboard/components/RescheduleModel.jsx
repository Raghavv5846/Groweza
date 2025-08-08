import React, { useState, useEffect } from 'react';

const RescheduleModal = ({ isOpen, onClose, meeting, onSubmit }) => {
    const [newDate, setNewDate] = useState(meeting?.date || '');
    const [newTime, setNewTime] = useState(meeting?.time || '');

    useEffect(() => {
        if (meeting) {
            setNewDate(meeting.date);
            setNewTime(meeting.time);
        }
    }, [meeting]);

    const handleSubmit = () => {
        onSubmit({ meetingId: meeting._id, date: newDate, time: newTime });
        onClose();
    };

    if (!isOpen || !meeting) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded w-full max-w-md">
                <h2 className="text-lg font-bold mb-4">Reschedule Meeting</h2>
                <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} className="w-full mb-2 p-2 border rounded" />
                <input type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)} className="w-full mb-2 p-2 border rounded" />

                <button onClick={handleSubmit} className="bg-yellow-600 text-white px-4 py-2 rounded mr-2">Reschedule</button>
                <button onClick={onClose} className="text-gray-600">Cancel</button>
            </div>
        </div>
    );
};

export default RescheduleModal;