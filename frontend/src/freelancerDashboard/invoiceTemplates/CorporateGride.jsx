// export const TemplateCorporate = ({ freelancer, client, works, logo , invoiceNumber , notes }) => {
//     const total = works.reduce((sum, w) => sum + w.cost, 0);
//     return (
//         <div className="p-8 max-w-4xl mx-auto text-gray-800 text-sm">
//             <div className="flex justify-between items-start border-b pb-4 mb-4">
//                 <div>
//                     {logo && <img src={logo} className="h-10 mb-2" alt="Logo" />}
//                     <h2 className="text-xl font-bold">{freelancer.name}</h2>
//                     <p>{freelancer.email}</p>
                    
//                 </div>
//                 <div className="text-right">
//                     <h1 className="text-3xl font-bold">INVOICE</h1>
//                     <h4>Invoice No: <strong>{invoiceNumber}</strong> </h4>
//                     <p>{new Date().toLocaleDateString()}</p>
//                 </div>
//             </div>

//             <div className="mb-6">
//                 <h3 className="font-semibold">Billed To:</h3>
//                 <p>{client.name}</p>
//                 <p>{client.email}</p>
//                 <p>{client.company}</p>
//             </div>

//             <div className="overflow-x-auto">
//                 <table className="min-w-full text-left">
//                     <thead>
//                         <tr className="bg-gray-100">
//                             <th className="p-2">#</th>
//                             <th className="p-2">Task</th>
//                             <th className="p-2">Start</th>
//                             <th className="p-2">End</th>
//                             <th className="p-2 text-right">Cost</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {works.map((work, idx) => (
//                             <tr key={idx} className="border-b">
//                                 <td className="p-2">{idx + 1}</td>
//                                 <td className="p-2">{work.fieldOfWork}</td>
//                                 <td className="p-2">{new Date(work.startDate).toLocaleDateString()}</td>
//                                 <td className="p-2">{new Date(work.endDate).toLocaleDateString()}</td>
//                                 <td className="p-2 text-right">₹{work.cost.toLocaleString()}</td>
//                             </tr>
//                         ))}
//                         <tr className="font-bold">
//                             <td className="p-2" colSpan={4}>Total</td>
//                             <td className="p-2 text-right">₹{total.toLocaleString()}</td>
//                         </tr>
//                     </tbody>
//                 </table>
//                 {notes && (
//                     <div className="text-sm text-gray-600">
//                         <p className="font-semibold mb-1">Notes:</p>
//                         <p>{notes}</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
//   };



export const TemplateCorporate = ({ freelancer, client, works, logo, invoiceNumber, notes }) => {
    const subtotal = works.reduce((sum, w) => sum + w.cost, 0);
    const taxRate = 0.10; // 10% tax
    const taxAmount = subtotal * taxRate;
    const grandTotal = subtotal + taxAmount;

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-lg">
            {/* Header with logo and company name */}
            <div className="bg-blue-800 text-white p-6 relative overflow-hidden">
                <div className="flex items-center gap-3 relative z-10">
                    <div className=" rounded-lg flex items-center justify-center text-white font-bold">
                        {logo && <img src={logo} alt="logo" className="h-20 w-20 rounded-2xl" />}

                    </div>
                    <div>
                        <h1 className="text-xl font-bold">{freelancer.name || 'BORCELLE'}</h1>
                        <p className="text-sm opacity-90">Moving Company</p>
                    </div>
                </div>
                {/* Orange accent triangle */}
                <div className="absolute top-0 right-0 w-32 h-full bg-orange-400 transform skew-x-12 translate-x-8"></div>
            </div>

            {/* Invoice title and details */}
            <div className="p-6 pb-4">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-800 mb-2">INVOICE</h2>
                        <div className="text-sm text-gray-600">
                            <p>Number: {invoiceNumber || '01234'}</p>
                            <p>Date: {new Date().toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className="text-right text-sm">
                        <div className="mb-4">
                            <h4 className="font-semibold text-gray-800 mb-1">PAYABLE TO</h4>
                            <p className="text-gray-600">{client.name || 'Mr. Howard Ong'}</p>
                            <p className="text-gray-600">{client.address || '123 Anywhere St., Any City'}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-1">BANK DETAILS</h4>
                            <p className="text-gray-600">{client.company || 'Salford & Co.'}</p>
                            <p className="text-gray-600">{client.phone || '0123 4567 8901 2345'}</p>
                        </div>
                    </div>
                </div>

                {/* Services table */}
                <div className="mb-6">
                    <div className="bg-blue-800 text-white text-sm font-semibold">
                        <div className="grid grid-cols-4 gap-4 p-3">
                            <div>ITEM DESCRIPTION</div>
                            <div className="text-center">QTY</div>
                            <div className="text-center">PRICE</div>
                            <div className="text-right">TOTAL</div>
                        </div>
                    </div>

                    <div className="text-sm">
                        {works.map((work, idx) => (
                            <div key={idx} className="grid grid-cols-4 gap-4 p-3 border-b border-gray-100">
                                <div className="text-gray-700">{work.fieldOfWork}</div>
                                <div className="text-center text-gray-700">1</div>
                                <div className="text-center text-gray-700">₹{work.cost.toFixed(2)}</div>
                                <div className="text-right text-gray-700">₹{work.cost.toFixed(2)}</div>
                            </div>
                        ))}
                    </div>

                    {/* Totals section */}
                    <div className="mt-6 text-right text-sm">
                        <div className="flex justify-between mb-2">
                            <span className="font-semibold">SUB TOTAL</span>
                            <span>₹ {subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="font-semibold">TAX (10%)</span>
                            <span>₹ {taxAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-base pt-2 border-t">
                            <span>GRAND TOTAL</span>
                            <span>₹ {grandTotal.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Notes section */}
                    {notes && (
                        <div className="mt-6 text-sm">
                            <span className="font-semibold">NOTES:</span>
                            <p className="text-gray-600 mt-1">{notes}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="bg-blue-800 text-white p-4 text-xs relative overflow-hidden">
                <div className="flex justify-between items-center relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <span>🌐</span>
                            <span>{freelancer.website || 'reallygreatsite.com'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span>📧</span>
                            <span>{freelancer.email || 'hello@reallygreatsite.com'}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <span>📞</span>
                            <span>123-456-7890</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span>📍</span>
                            <span>123 Anywhere St., Any City, ST 12345</span>
                        </div>
                    </div>
                </div>
                {/* Orange accent triangle */}
                <div className="absolute top-0 right-0 w-24 h-full bg-orange-400 transform skew-x-12 translate-x-6"></div>
            </div>
        </div>
    );
};