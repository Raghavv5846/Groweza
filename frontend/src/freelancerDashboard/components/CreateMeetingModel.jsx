import React, { useState } from 'react';

const CreateMeetingModal = ({ isOpen, onClose, onSubmit }) => {
    const [clientName, setClientName] = useState('');
    const [clientEmail, setClientEmail] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleSubmit = () => {
        onSubmit({ clientName, clientEmail, date, time });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded w-full max-w-md">
                <h2 className="text-lg font-bold mb-4">Create Meeting</h2>
                <input type="text" placeholder="Client Name" value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full mb-2 p-2 border rounded" />
                <input type="email" placeholder="Client Email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} className="w-full mb-2 p-2 border rounded" />
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full mb-2 p-2 border rounded" />
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full mb-2 p-2 border rounded" />

                <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded mr-2">Schedule</button>
                <button onClick={onClose} className="text-gray-600">Cancel</button>
            </div>
        </div>
    );
};

export default CreateMeetingModal;
