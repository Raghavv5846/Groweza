// export const TemplateElegant = ({ freelancer, client, works, logo , invoiceNumber , notes }) => {
//     const total = works.reduce((sum, w) => sum + w.cost, 0);
//     return (
//         <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl font-light">
//             <div className="flex justify-between mb-6">
//                 <div>
//                     <h1 className="text-2xl font-semibold">Invoice</h1>
//                     <h4>Invoice No : <strong>{invoiceNumber}</strong></h4>
//                     <p className="text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
//                 </div>
//                 {logo && <img src={logo} alt="logo" className="h-12" />}
//             </div>
//             <div className="grid grid-cols-2 text-sm mb-4">
//                 <div>
//                     <p className="font-semibold">From</p>
//                     <p>{freelancer.name}</p>
//                     <p>{freelancer.email}</p>
//                 </div>
//                 <div className="text-right">
//                     <p className="font-semibold">To</p>
//                     <p>{client.name}</p>
//                     <p>{client.email}</p>
//                     <p>{client.company}</p>
//                 </div>
//             </div>
//             <div className="space-y-2 mb-4">
//                 {works.map((work, idx) => (
//                     <div key={idx} className="flex justify-between border-b py-2">
//                         <div>
//                             <p>{work.fieldOfWork}</p>
//                             <p className="text-xs text-gray-500">{work.workDescription}</p>
//                         </div>
//                         <div className="text-right">₹{work.cost.toLocaleString()}</div>
//                     </div>
//                 ))}
//             </div>
//             <div className="flex justify-between font-semibold text-lg">
//                 <p>Total</p>
//                 <p>₹{total.toLocaleString()}</p>
//             </div>
//             {notes && (
//                 <div className="text-sm text-gray-600">
//                     <p className="font-semibold mb-1">Notes:</p>
//                     <p>{notes}</p>
//                 </div>
//             )}
//         </div>
//     );
//   };


export const TemplateElegant = ({ freelancer, client, works, logo, invoiceNumber, notes }) => {
    const subtotal = works.reduce((sum, w) => sum + w.cost, 0);
    const taxRate = 0.10; // 10% tax
    const taxAmount = subtotal * taxRate;
    const grandTotal = subtotal + taxAmount;

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 font-sans">
            {/* Header with logo and company details */}
            <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-3">
                    <div className=" rounded-lg flex items-center justify-center text-white font-bold">
                        {logo && <img src={logo} alt="logo" className="h-20 w-20 rounded-2xl" />}

                    </div>
                    <div>
                        <h1 className="text-xl font-semibold text-gray-800">{freelancer.name || 'Studio Shoowe'}</h1>
                    </div>
                </div>
                <div className="text-right text-sm text-gray-600">
                    <p>{freelancer.address || '123 Anywhere St.,'}</p>
                    <p>{freelancer.city || 'Any City, ST 12345'}</p>
                </div>
            </div>

            {/* Invoice title and number */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">INVOICE</h2>
                </div>
                <div className="text-right text-sm text-gray-600">
                    <p>No: {invoiceNumber || '01234'}</p>
                    <p>Date: {new Date().toLocaleDateString()}</p>
                </div>
            </div>

            {/* Billing details */}
            <div className="grid grid-cols-2 gap-8 mb-8 text-sm">
                <div>
                    <h3 className="font-semibold text-gray-800 mb-2">PAYABLE TO</h3>
                    <p className="text-gray-600">{client.name || 'Mrs. Helena Paquet'}</p>
                    <p className="text-gray-600">{client.address || '123 Anywhere St., Any City'}</p>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-800 mb-2">BANK DETAILS</h3>
                    <p className="text-gray-600">{client.company || 'Salford & Co.'}</p>
                    <p className="text-gray-600">{client.bankDetails || '0123 4567 8901 2345'}</p>
                </div>
            </div>

            {/* Services table */}
            <div className="mb-8">
                {/* Table header */}
                <div className="bg-teal-500 text-white text-sm font-semibold">
                    <div className="grid grid-cols-4 gap-4 p-4">
                        <div>ITEM DESCRIPTION</div>
                        <div className="text-center">QTY</div>
                        <div className="text-center">PRICE</div>
                        <div className="text-right">TOTAL</div>
                    </div>
                </div>

                {/* Table rows */}
                <div className="bg-white">
                    {works.map((work, idx) => (
                        <div key={idx} className="grid grid-cols-4 gap-4 p-4 border-b border-gray-100 text-sm">
                            <div className="text-gray-700">{work.fieldOfWork}</div>
                            <div className="text-center text-gray-700">{work.quantity || '1'}</div>
                            <div className="text-center text-gray-700">${work.cost.toFixed(2)}</div>
                            <div className="text-right text-gray-700">${(work.cost * (work.quantity || 1)).toFixed(2)}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Totals section */}
            <div className="flex justify-end mb-8">
                <div className="w-64 text-sm">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="font-semibold text-gray-700">SUB TOTAL</span>
                        <span className="text-gray-700">${subtotal.toLocaleString()}.00</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="font-semibold text-gray-700">TAX (10%)</span>
                        <span className="text-gray-700">${taxAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-3 font-bold text-gray-800">
                        <span>GRAND TOTAL</span>
                        <span>${grandTotal.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Notes section */}
            <div className="mb-8 border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-gray-800 mb-2">NOTES:</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                    {notes || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
                </p>
            </div>

            {/* Footer contact information */}
            <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-teal-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">🌐</span>
                        </div>
                        <span>{freelancer.website || 'reallygreatsite.com'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-teal-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">📞</span>
                        </div>
                        <span>{freelancer.phone || '123-456-7890'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-teal-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">📧</span>
                        </div>
                        <span>{freelancer.email || 'hello@reallygreatsite.com'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};