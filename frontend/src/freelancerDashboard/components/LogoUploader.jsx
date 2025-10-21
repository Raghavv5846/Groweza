// import React, { useState } from 'react';
// import axios from 'axios';
// import { Dialog } from '@headlessui/react';
// import { toast } from 'react-toastify';

// const InvoiceLogoUploader = ({fetchUserAndClients}) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [preview, setPreview] = useState(null);
//     const [file, setFile] = useState(null);
//     const token = localStorage.getItem('authToken');

//     const handleFileChange = (e) => {
//         const uploadedFile = e.target.files[0];
//         setFile(uploadedFile);
//         setPreview(URL.createObjectURL(uploadedFile));
//     };

//     const handleUpload = async () => {
//         if (!file) return toast.error("Please select an image.");

//         const formData = new FormData();
//         formData.append('logo', file);

//         try {
//             await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/freelancer/upload-invoice-logo`, formData, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });

//             toast.success("Invoice logo uploaded!");
//             await fetchUserAndClients();
//             setIsOpen(false);
//             setFile(null);
//             setPreview(null);
//         } catch (err) {
//             toast.error("Upload failed.");
//         }
//     };

//     return (
//         <>
//             <button
//                 onClick={() => setIsOpen(true)}
//                 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
//             >
//                 Upload Invoice Logo
//             </button>

//             <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed z-50 inset-0 overflow-y-auto">
//                 <div className="flex items-center justify-center min-h-screen">
//                     <Dialog.Panel className="bg-white p-6 rounded shadow-lg w-96">
//                         <Dialog.Title className="text-lg font-bold mb-4">Upload Invoice Logo</Dialog.Title>

//                         <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4 border" />

//                         {preview && (
//                             <img
//                                 src={preview}
//                                 alt="Preview"
//                                 className="w-full h-40 object-contain border rounded mb-4"
//                             />
//                         )}

//                         <div className="flex justify-end gap-2">
//                             <button
//                                 onClick={() => setIsOpen(false)}
//                                 className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleUpload}
//                                 className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
//                             >
//                                 Upload
//                             </button>
//                         </div>
//                     </Dialog.Panel>
//                 </div>
//             </Dialog>
//         </>
//     );
// };

// export default InvoiceLogoUploader;


import React, { useState } from 'react';
import axios from 'axios';
import { Dialog } from '@headlessui/react';
import { toast } from 'react-toastify';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

const InvoiceLogoUploader = ({ fetchUserAndClients }) => {
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
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm transition-all duration-200"
            >
                <Upload size={18} />
                Upload Invoice Logo
            </button>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed z-50 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen px-4">
                    <Dialog.Panel className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <Dialog.Title className="text-xl font-semibold text-gray-800">
                                Upload Invoice Logo
                            </Dialog.Title>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg mb-4 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-all duration-200">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-40 h-40 object-contain mb-3 rounded-md shadow-sm border border-gray-200 bg-white"
                                />
                            ) : (
                                <>
                                    <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
                                    <p className="text-gray-600 text-sm">Choose a logo image to upload</p>
                                </>
                            )}

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="mt-3 text-sm border border-gray-300 rounded-md p-2 cursor-pointer bg-white hover:border-gray-400 transition-all"
                            />
                        </div>

                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpload}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-sm transition-all"
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
