// export const TemplateMinimal = ({ freelancer, client, works, logo, notes, invoiceNumber }) => {
//     const subtotal = works.reduce((sum, w) => sum + w.cost, 0);
//     const salesTax = subtotal * 0.10; // 10% sales tax
//     const total = subtotal + salesTax;

//     return (
//         <div className="max-w-2xl mx-auto bg-white p-8 font-mono text-sm">
//             {/* Header */}
//             <div className="flex justify-between items-start mb-12">
//                 <div>
//                     <h1 className="text-3xl font-bold text-black mb-4">INVOICE</h1>
//                     <div className="text-xs text-gray-600 space-y-1">
//                         <p>Invoice Number: {invoiceNumber || 'INV-01234'}</p>
//                         <p>Date: {new Date().toLocaleDateString('en-US', {
//                             year: 'numeric',
//                             month: 'long',
//                             day: 'numeric'
//                         })}</p>
//                     </div>
//                 </div>
//                 <div className="text-right">
//                     <h2 className="text-xl font-bold text-black mb-2">
//                         {freelancer.company || 'SALFORD & CO.'}
//                     </h2>
//                     <div className="text-xs text-gray-600">
//                         <p>{freelancer.phone || '+123-456-7890'}</p>
//                         <p>{freelancer.address || '123 Anywhere St., Any City'}</p>
//                     </div>
//                 </div>
//             </div>

//             {/* Bill To Section */}
//             <div className="mb-8">
//                 <h3 className="text-lg font-bold text-black mb-3">BILL TO:</h3>
//                 <div className="text-xs text-gray-600">
//                     <p className="font-medium">{client.name || 'Kimberly Nguyen'}</p>
//                     <p>{client.address || '123 Anywhere St.,'}</p>
//                     <p>{client.city || 'Any City, ST 12345'}</p>
//                 </div>
//             </div>

//             {/* Services Table */}
//             <div className="mb-8">
//                 {/* Table Header */}
//                 <div className="bg-black text-white text-xs font-bold">
//                     <div className="grid grid-cols-4 gap-4 p-3">
//                         <div>ITEM</div>
//                         <div>DESCRIPTION</div>
//                         <div className="text-right">PRICE</div>
//                         <div className="text-right">AMOUNT</div>
//                     </div>
//                 </div>

//                 {/* Table Rows */}
//                 <div className="bg-white">
//                     {works.map((work, idx) => (
//                         <div key={idx} className="grid grid-cols-4 gap-4 p-3 border-b border-gray-200 text-xs">
//                             <div className="text-gray-800">{idx + 1}.</div>
//                             <div className="text-gray-800">{work.fieldOfWork}</div>
//                             <div className="text-right text-gray-800">₹{work.cost.toFixed(0)}</div>
//                             <div className="text-right text-gray-800">₹{work.cost.toFixed(0)}</div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* Totals Section */}
//             <div className="mb-8">
//                 <div className="flex justify-end">
//                     <div className="w-64 text-xs">
//                         <div className="flex justify-between py-2 text-gray-600">
//                             <span>Sub Total:</span>
//                             <span>₹{subtotal.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
//                         </div>
//                         <div className="flex justify-between py-2 text-gray-600 border-b border-gray-200">
//                             <span>Sales Tax:</span>
//                             <span>₹{salesTax.toFixed(0)}</span>
//                         </div>
//                         <div className="flex justify-between py-3 font-bold text-lg text-black">
//                             <span>TOTAL: </span>
//                             <span>₹{total.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Payment Information */}
//             <div className="mb-6">
//                 <h4 className="font-bold text-black text-sm mb-2">PAYMENT INFORMATION:</h4>
//                 <div className="text-xs text-gray-600 space-y-1">
//                     <p><span className="font-medium">Bank:</span> {freelancer.bank || 'Borcelle Bank'}</p>
//                     <p><span className="font-medium">Name:</span> {freelancer.accountName || 'Margarita Perez'}</p>
//                     <p><span className="font-medium">Account:</span> {freelancer.accountNumber || '0123 4567 8901'}</p>
//                 </div>
//             </div>

//             {/* Terms and Conditions */}
//             <div className="mb-6">
//                 <h4 className="font-bold text-black text-sm mb-2">TERM AND CONDITIONS:</h4>
//                 <p className="text-xs text-gray-600">
//                     {notes || 'Payment is due 30 days from the invoice date.'}
//                 </p>
//             </div>
//         </div>
//     );
// };


export const TemplateMinimal = ({ freelancer, client, works, logo, notes, invoiceNumber }) => {
    const subtotal = works.reduce((sum, w) => sum + w.cost, 0);
    const salesTax = subtotal * 0.10; // 10% sales tax
    const total = subtotal + salesTax;

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 font-mono text-sm text-gray-800">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-10 gap-6">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-black mb-3">INVOICE</h1>
                    <div className="text-xs sm:text-sm text-gray-600 space-y-1">
                        <p>Invoice Number: {invoiceNumber || 'INV-01234'}</p>
                        <p>
                            Date:{' '}
                            {new Date().toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </p>
                    </div>
                </div>

                <div className="text-right sm:text-right">
                    <h2 className="text-lg sm:text-xl font-bold text-black mb-2">
                        {freelancer.name || 'SALFORD & CO.'}
                    </h2>
                    <div className="text-xs sm:text-sm text-gray-600 space-y-1">
                        <p>{freelancer.phone || '+123-456-7890'}</p>
                        <p>{freelancer.location.city || '123 Anywhere St., Any City'}</p>
                        <p>{freelancer.location.country || '123 Anywhere St., Any City'}</p>
                    </div>
                </div>
            </div>

            {/* Bill To Section */}
            <div className="mb-8">
                <h3 className="text-base sm:text-lg font-bold text-black mb-3">BILL TO:</h3>
                <div className="text-xs sm:text-sm text-gray-600 space-y-1">
                    <p className="font-medium">{client.name || 'Kimberly Nguyen'}</p>
                    <p>{client.email || '123 Anywhere St.'}</p>
                    <p>{client.phone || 'Any City, ST 12345'}</p>
                    <p>{client.company || 'Any City, ST 12345'}</p>
                </div>
            </div>

            {/* Services Table */}
            <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden">
                {/* Table Header */}
                <div className="bg-black text-white text-xs sm:text-sm font-bold hidden sm:grid sm:grid-cols-4 gap-4 p-3">
                    <div>ITEM</div>
                    <div>DESCRIPTION</div>
                    <div className="text-right">PRICE</div>
                    <div className="text-right">AMOUNT</div>
                </div>

                {/* Table Rows */}
                <div className="bg-white divide-y divide-gray-200">
                    {works.map((work, idx) => (
                        <div
                            key={idx}
                            className="p-3 sm:grid sm:grid-cols-4 sm:gap-4 text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center"
                        >
                            <div className="text-gray-800 font-semibold sm:font-normal">
                                {idx + 1}.
                            </div>
                            <div className="text-gray-800">{work.fieldOfWork}</div>
                            <div className="text-gray-800 sm:text-right">
                                ₹{work.cost.toFixed(0)}
                            </div>
                            <div className="text-gray-800 sm:text-right">
                                ₹{work.cost.toFixed(0)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Totals Section */}
            <div className="mb-8 flex flex-col items-end">
                <div className="w-full sm:w-72 text-xs sm:text-sm">
                    <div className="flex justify-between py-2 text-gray-600">
                        <span>Sub Total:</span>
                        <span>
                            ₹{subtotal.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </span>
                    </div>
                    <div className="flex justify-between py-2 text-gray-600 border-b border-gray-200">
                        <span>Sales Tax (10%):</span>
                        <span>₹{salesTax.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between py-3 font-bold text-lg text-black">
                        <span>TOTAL:</span>
                        <span>
                            ₹{total.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </span>
                    </div>
                </div>
            </div>

            {/* Payment Information */}
            <div className="mb-6">
                <h4 className="font-bold text-black text-sm sm:text-base mb-2">
                    PAYMENT INFORMATION:
                </h4>
                <div className="text-xs sm:text-sm text-gray-600 space-y-1">
                    <p>
                        <span className="font-medium">Bank:</span>{' '}
                        {freelancer.bank || 'Borcelle Bank'}
                    </p>
                    <p>
                        <span className="font-medium">Name:</span>{' '}
                        {freelancer.accountName || 'Margarita Perez'}
                    </p>
                    <p>
                        <span className="font-medium">Account:</span>{' '}
                        {freelancer.accountNumber || '0123 4567 8901'}
                    </p>
                </div>
            </div>

            {/* Terms and Conditions */}
            <div>
                <h4 className="font-bold text-black text-sm sm:text-base mb-2">
                    TERMS AND CONDITIONS:
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {notes || 'Payment is due 30 days from the invoice date.'}
                </p>
            </div>
        </div>
    );
};
