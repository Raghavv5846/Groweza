import React, { useState } from 'react';
import axios from 'axios';
import { Dialog } from '@headlessui/react';
import { toast } from 'react-toastify';

const InvoiceLogoUploader = ({fetchUserAndClients}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);
    const token = localStorage.getItem('authToken');

    const handleFileChange = (e) => {
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile);
        setPreview(URL.createObjectURL(uploadedFile));
    };

    const handleUpload = async () => {
        if (!file) return toast.error("Please select an image.");

        const formData = new FormData();
        formData.append('logo', file);

        try {
            await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/freelancer/upload-invoice-logo`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success("Invoice logo uploaded!");
            await fetchUserAndClients();
            setIsOpen(false);
            setFile(null);
            setPreview(null);
        } catch (err) {
            toast.error("Upload failed.");
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Upload Invoice Logo
            </button>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed z-50 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen">
                    <Dialog.Panel className="bg-white p-6 rounded shadow-lg w-96">
                        <Dialog.Title className="text-lg font-bold mb-4">Upload Invoice Logo</Dialog.Title>

                        <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />

                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-40 object-contain border rounded mb-4"
                            />
                        )}

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpload}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                Upload
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    );
};

export default InvoiceLogoUploader;
