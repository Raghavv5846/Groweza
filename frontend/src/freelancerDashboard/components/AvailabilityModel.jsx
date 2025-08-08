// File: /modals/AvailabilityModal.jsx
import React, { useState } from 'react';

const AvailabilityModal = ({ isOpen, onClose, onSubmit }) => {
    const [day, setDay] = useState('Monday');
    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('17:00');

    const handleSubmit = () => {
        onSubmit({ day, startTime, endTime });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded w-full max-w-md">
                <h2 className="text-lg font-bold mb-4">Set Availability</h2>
                <select value={day} onChange={(e) => setDay(e.target.value)} className="w-full mb-2 p-2 border rounded">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(d => (
                        <option key={d} value={d}>{d}</option>
                    ))}
                </select>
                <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full mb-2 p-2 border rounded" />
                <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full mb-2 p-2 border rounded" />

                <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded mr-2">Save</button>
                <button onClick={onClose} className="text-gray-500">Cancel</button>
            </div>
        </div>
    );
};

export default AvailabilityModal;