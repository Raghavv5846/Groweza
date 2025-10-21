// import React from 'react';

// const TemplateClassic = ({ freelancer, client, works, logo , notes , total , invoiceNumber }) => {


//     return (
//         <div className="max-w-4xl mx-auto p-8 border border-gray-300 rounded-lg text-sm">
//             {/* Header */}
//             <div className="flex justify-between items-center mb-6">
//                 <div>
//                     <h2 className="text-2xl font-bold">INVOICE</h2>
//                     <p>Invoice No: <strong>{invoiceNumber}</strong></p>

//                 </div>
//                 {logo && <img src={logo} alt="Freelancer Logo" className="h-16 w-auto" />}
//             </div>

//             {/* Freelancer & Client Info */}
//             <div className="flex justify-between mb-6">
//                 <div>
//                     <h4 className="font-semibold">From</h4>
//                     <p>{freelancer.name}</p>
//                     <p>{freelancer.email}</p>
//                     <p>{freelancer.phone}</p>
//                     <p>{freelancer.address}</p>
//                 </div>
//                 <div>
//                     <h4 className="font-semibold">To</h4>
//                     <p>{client.name}</p>
//                     <p>{client.email}</p>
//                     <p>{client.company}</p>
//                 </div>
//             </div>

//             {/* Dates */}
//             <div className="flex justify-between mb-4">
//                 <p><span className="font-semibold">Issue Date:</span> {new Date().toLocaleDateString()}</p>
//                 {/* <p><span className="font-semibold">Due Date:</span> {dueDate}</p> */}
//             </div>

//             {/* Work Items */}
//             <table className="w-full mb-4 border-t border-b border-gray-300">
//                 <thead>
//                     <tr className="text-left">
//                         <th className="py-2">Work</th>
//                         <th className="py-2">Description</th>
//                         <th className="py-2">Cost</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {works.map((work, index) => (
//                         <tr key={index} className="border-t">
//                             <td className="py-2">{work.fieldOfWork}</td>
//                             <td className="py-2">{work.workDescription}</td>
//                             <td className="py-2">₹{work.cost}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {/* Total */}
//             <div className="text-right mb-4">
//                 <p className="text-lg font-bold">Total: ₹{total}</p>
//                 {/* <p className={`font-medium ₹{status === 'Paid' ? 'text-green-600' : status === 'Overdue' ? 'text-red-600' : 'text-yellow-600'}`}>Status: {status}</p> */}
//             </div>

//             {/* Notes */}
//             {notes && (
//                 <div className="text-sm text-gray-600">
//                     <p className="font-semibold mb-1">Notes:</p>
//                     <p>{notes}</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default TemplateClassic;



// import React from 'react';

// const TemplateClassic = ({ freelancer, client, works, logo, notes, invoiceNumber }) => {
//     const subtotal = works.reduce((sum, w) => sum + w.cost, 0);
//     const taxRate = 0.10; // 10% tax
//     const taxAmount = subtotal * taxRate;
//     const total = subtotal + taxAmount;

//     return (
//         <div className="max-w-2xl mx-auto bg-white p-8 font-sans">
//             {/* Header */}
//             <div className="flex justify-between items-start mb-12">
//                 <div>
//                     <h1 className="text-4xl font-bold text-purple-800 mb-2">INVOICE</h1>
//                 </div>
//                 <div className="flex items-center gap-3">
//                     {/* Logo placeholder - star/flower design */}
//                     <div className="w-12 h-12 flex items-center justify-center">
//                         <svg viewBox="0 0 24 24" className="w-10 h-10 text-purple-800">
//                             <path fill="currentColor" d="M12 2L13.09 7.26L18 6L16.91 11.26L21 12L16.91 12.74L18 18L13.09 16.74L12 22L10.91 16.74L6 18L7.09 12.74L3 12L7.09 11.26L6 6L10.91 7.26L12 2Z" />
//                         </svg>
//                     </div>
//                     <div className="text-right">
//                         <h2 className="text-xl font-bold text-purple-800">{freelancer.name || 'THYNK'}</h2>
//                         <h3 className="text-lg font-semibold text-purple-800">{freelancer.tagline || 'UNLIMITED'}</h3>
//                     </div>
//                 </div>
//             </div>

//             {/* Invoice details */}
//             <div className="grid grid-cols-2 gap-8 mb-8 text-sm">
//                 <div>
//                     <div className="mb-4">
//                         <span className="font-semibold text-gray-700">Date Issued:</span>
//                         <span className="ml-4">{new Date().toLocaleDateString()}</span>
//                     </div>
//                     <div>
//                         <span className="font-semibold text-gray-700">Billed to:</span>
//                         <span className="ml-4">{client.name || 'Mr. Aaron Loeb'}</span>
//                     </div>
//                     <div className="mt-2 ml-20 text-gray-600">
//                         <p>{client.address || '123 Anywhere St., Any City, ST 12345'}</p>
//                     </div>
//                 </div>
//                 <div className="text-right">
//                     <div>
//                         <span className="font-semibold text-gray-700">No:</span>
//                         <span className="ml-4">{invoiceNumber || '01234'}</span>
//                     </div>
//                 </div>
//             </div>

//             {/* Services table */}
//             <div className="mb-8">
//                 {/* Table header */}
//                 <div className="bg-purple-800 text-white">
//                     <div className="grid grid-cols-4 gap-4 p-4 text-sm font-semibold">
//                         <div>DESCRIPTION</div>
//                         <div className="text-center">RATE</div>
//                         <div className="text-center">HOURS</div>
//                         <div className="text-right">AMOUNT</div>
//                     </div>
//                 </div>

//                 {/* Table rows */}
//                 <div className="bg-white">
//                     {works.map((work, idx) => (
//                         <div key={idx} className="grid grid-cols-4 gap-4 p-4 border-b border-gray-100 text-sm">
//                             <div className="text-gray-700">{work.fieldOfWork}</div>
//                             <div className="text-center text-gray-700">₹{work.rate || '50'}/hr</div>
//                             <div className="text-center text-gray-700">{work.hours || Math.ceil(work.cost / 50)}</div>
//                             <div className="text-right text-gray-700">₹{work.cost.toFixed(2)}</div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* Totals section */}
//             <div className="mb-8">
//                 <div className="flex justify-end">
//                     <div className="w-64 text-sm">
//                         <div className="flex justify-between py-2">
//                             <span className="text-gray-700">Sub-Total</span>
//                             <span className="text-gray-700">₹{subtotal.toFixed(2)}</span>
//                         </div>
//                         <div className="flex justify-between py-2 border-b border-gray-200">
//                             <span className="text-gray-700">Tax (10%)</span>
//                             <span className="text-gray-700">₹{taxAmount.toFixed(2)}</span>
//                         </div>
//                         <div className="flex justify-between py-3 font-bold text-lg">
//                             <span>TOTAL</span>
//                             <span>₹{total.toFixed(2)}</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Payment and notes section */}
//             <div className="grid grid-cols-2 gap-8 mb-8 text-sm">
//                 <div>
//                     <h4 className="font-semibold text-gray-800 mb-2">PAYABLE TO:</h4>
//                     <p className="font-semibold text-gray-700">{freelancer.name || 'Studio Shoowe'}</p>
//                     <p className="text-gray-600">Bank: {freelancer.bank || 'Really Great Bank'}</p>
//                     <p className="text-gray-600">Account No: {freelancer.accountNo || '0123 4567 8901'}</p>
//                 </div>
//                 <div>
//                     <h4 className="font-semibold text-gray-800 mb-2">NOTES:</h4>
//                     <p className="text-gray-600 text-xs leading-relaxed">
//                         {notes || 'Thank you for your business. Payment is due within 30 days of the invoice date.'}
//                     </p>
//                 </div>
//             </div>

//             {/* Footer */}
//             <div className="bg-purple-800 text-white p-4 -mx-8 -mb-8 mt-8">
//                 <div className="flex justify-between items-center text-sm">
//                     <div className="flex items-center gap-2">
//                         <span>📞</span>
//                         <span>{freelancer.phone || '123-456-7890'}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                         <span>🌐</span>
//                         <span>{freelancer.website || 'reallygreatsite.com'}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                         <span>📧</span>
//                         <span>{freelancer.email || 'hello@reallygreatsite.com'}</span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TemplateClassic;


import React from 'react';

const TemplateClassic = ({ freelancer, client, works, logo, notes, invoiceNumber }) => {
    const subtotal = works.reduce((sum, w) => sum + w.cost, 0);
    const taxRate = 0.10; // 10% tax
    const taxAmount = subtotal * taxRate;
    const total = subtotal + taxAmount;

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 font-sans shadow-lg rounded-lg">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-purple-800 mb-2">INVOICE</h1>
                </div>
                <div className="flex items-center gap-3">
                    {logo ? (
                        <img src={logo} alt="logo" className="h-12 w-12 rounded-xl object-cover" />
                    ) : (
                        <div className="w-12 h-12 flex items-center justify-center">
                            <svg viewBox="0 0 24 24" className="w-10 h-10 text-purple-800">
                                <path
                                    fill="currentColor"
                                    d="M12 2L13.09 7.26L18 6L16.91 11.26L21 12L16.91 12.74L18 18L13.09 16.74L12 22L10.91 16.74L6 18L7.09 12.74L3 12L7.09 11.26L6 6L10.91 7.26L12 2Z"
                                />
                            </svg>
                        </div>
                    )}
                    <div className="text-right">
                        <h2 className="text-xl font-bold text-purple-800">{freelancer.name || 'THYNK'}</h2>
                        <h3 className="text-base sm:text-lg font-semibold text-purple-800">{freelancer.role || 'UNLIMITED'}</h3>
                    </div>
                </div>
            </div>

            {/* Invoice details */}
            <div className="grid sm:grid-cols-2 gap-8 mb-8 text-sm">
                <div>
                    <div className="mb-3">
                        <span className="font-semibold text-gray-700">Date Issued:</span>
                        <span className="ml-2">{new Date().toLocaleDateString()}</span>
                    </div>
                    <div>
                        <span className="font-semibold text-gray-700">Billed to:</span>
                        <span className="ml-2">{client.name || 'Mr. Aaron Loeb'}</span>
                    </div>
                    <div className="mt-2 sm:ml-6 text-gray-600">
                        <p>{client.company || '123 Anywhere St., Any City, ST 12345'}</p>
                    </div>
                    <div className="mt-2 sm:ml-6 text-gray-600">
                        <p>{client.phone || '123 Anywhere St., Any City, ST 12345'}</p>
                        
                    </div>
                    <div className="mt-2 sm:ml-6 text-gray-600">
                        <p>{client.email || '123 Anywhere St., Any City, ST 12345'}</p>
                    </div>
                </div>
                <div className="text-left sm:text-right">
                    <span className="font-semibold text-gray-700">No:</span>
                    <span className="ml-2">{invoiceNumber || '01234'}</span>
                </div>
            </div>

            {/* Services table */}
            <div className="mb-8">
                {/* Table header */}
                <div className="bg-purple-800 text-white">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-3 sm:p-4 text-xs sm:text-sm font-semibold">
                        <div>DESCRIPTION</div>
                        <div className="text-center hidden sm:block">RATE</div>
                        <div className="text-center hidden sm:block">HOURS</div>
                        <div className="text-right">AMOUNT</div>
                    </div>
                </div>

                {/* Table rows */}
                <div className="bg-white">
                    {works.map((work, idx) => (
                        <div key={idx} className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-3 sm:p-4 border-b border-gray-100 text-xs sm:text-sm">
                            <div className="text-gray-700 col-span-2 sm:col-span-1">{work.fieldOfWork}</div>
                            <div className="text-center text-gray-700 hidden sm:block">₹{work.rate || '50'}/hr</div>
                            <div className="text-center text-gray-700 hidden sm:block">{work.hours || Math.ceil(work.cost / 50)}</div>
                            <div className="text-right text-gray-700">₹{work.cost.toFixed(2)}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Totals section */}
            <div className="mb-10">
                <div className="flex justify-end">
                    <div className="w-full sm:w-64 text-sm">
                        <div className="flex justify-between py-2">
                            <span className="text-gray-700">Sub-Total</span>
                            <span className="text-gray-700">₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-gray-700">Tax (10%)</span>
                            <span className="text-gray-700">₹{taxAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between py-3 font-bold text-base sm:text-lg">
                            <span>TOTAL</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment and notes section */}
            <div className="grid sm:grid-cols-2 gap-8 mb-8 text-sm">
                <div>
                    <h4 className="font-semibold text-gray-800 mb-2">PAYABLE TO:</h4>
                    <p className="font-semibold text-gray-700">{freelancer.name || 'Studio Shoowe'}</p>
                    <p className="text-gray-600">Bank: {freelancer.bank || 'Really Great Bank'}</p>
                    <p className="text-gray-600">Account No: {freelancer.accountNo || '0123 4567 8901'}</p>
                </div>
                {notes && (
                    <div className="mt-6 text-xs sm:text-sm text-gray-500 leading-relaxed">
                        <p className="font-semibold mb-1">Notes:</p>
                        <p>{notes}</p>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="bg-purple-800 text-white p-4 sm:p-5 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 rounded-b-lg">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                        <span>📞</span>
                        <span>{freelancer.phone || '123-456-7890'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>🌐</span>
                        <span>{freelancer.website || 'reallygreatsite.com'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>📧</span>
                        <span>{freelancer.email || 'hello@reallygreatsite.com'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplateClassic;
