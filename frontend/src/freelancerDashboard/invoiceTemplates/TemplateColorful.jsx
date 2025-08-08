export const TemplateColorful = ({ freelancer, client, works, logo, themeColor = '#000000', invoiceNumber, notes }) => {
    const subtotal = works.reduce((sum, w) => sum + w.cost, 0);
    const packageDiscount = subtotal * 0.30; // 30% package discount
    const total = subtotal - packageDiscount;

    return (
        <div className="max-w-xl mx-auto bg-white p-8 font-sans text-sm">
            {/* Header with logo and company info */}
            <div className="flex justify-between items-start mb-12">
                <div className="flex items-center">
                    {/* Modern geometric logo */}
                    <div className="w-16 h-16 mr-4">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                            <path
                                d="M20 20 L50 20 L50 50 L80 50 L80 80 L50 80 L50 50 L20 50 Z"
                                fill={themeColor}
                                stroke={themeColor}
                                strokeWidth="3"
                            />
                        </svg>
                    </div>
                </div>
                <div className="text-right">
                    <h1 className="text-2xl font-bold tracking-wide text-gray-800 mb-1">
                        {freelancer.name || 'SAMIRA HADID'}
                    </h1>
                    <p className="text-sm text-gray-500 tracking-widest uppercase">
                        {freelancer.profession || 'ARCHITECT'}
                    </p>
                </div>
            </div>

            {/* Invoice title and number */}
            <div className="text-right mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">INVOICE</h2>
                <p className="text-lg text-gray-600">#{invoiceNumber || '004'}</p>
            </div>

            {/* Client and date info */}
            <div className="mb-8 text-sm">
                <div className="grid grid-cols-1 gap-2">
                    <div>
                        <span className="font-semibold text-gray-800">BILLED TO:</span>
                        <span className="ml-8 text-gray-600">{client.name || 'Really Great Company'}</span>
                    </div>
                    <div>
                        <span className="font-semibold text-gray-800">DATE:</span>
                        <span className="ml-16 text-gray-600">{new Date().toLocaleDateString('en-GB')}</span>
                    </div>
                </div>
            </div>

            {/* Services table */}
            <div className="mb-8">
                {/* Table header */}
                <div className="border-b-2 border-gray-800 pb-2 mb-4">
                    <div className="grid grid-cols-4 gap-4 text-xs font-semibold text-gray-800 uppercase tracking-wide">
                        <div>DESCRIPTION</div>
                        <div className="text-center">RATE</div>
                        <div className="text-center">HOURS</div>
                        <div className="text-right">AMOUNT</div>
                    </div>
                </div>

                {/* Table rows */}
                <div className="space-y-3">
                    {works.map((work, idx) => (
                        <div key={idx} className="grid grid-cols-4 gap-4 text-sm text-gray-600 py-1 border-b border-gray-200">
                            <div>{work.fieldOfWork}</div>
                            <div className="text-center">${work.rate || '50'}/hr</div>
                            <div className="text-center">{work.hours || Math.ceil(work.cost / 50)}</div>
                            <div className="text-right">${work.cost.toFixed(2)}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Totals section */}
            <div className="mb-8 border-t-2 border-gray-800 pt-4">
                <div className="flex justify-end">
                    <div className="w-48 text-sm">
                        <div className="flex justify-between py-1 text-gray-600">
                            <span>Sub-Total</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between py-1 text-gray-600">
                            <span>Package Discount (30%)</span>
                            <span>$${packageDiscount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between py-3 font-bold text-lg text-gray-800 border-t border-gray-300 mt-2">
                            <span>TOTAL</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment information */}
            <div className="mb-8 text-sm">
                <h4 className="font-semibold text-gray-800 mb-3">PAY TO:</h4>
                <div className="text-gray-600 space-y-1">
                    <div>
                        <span className="font-medium">Bank</span>
                        <span className="ml-16">{freelancer.bank || 'Borcelle Bank'}</span>
                    </div>
                    <div>
                        <span className="font-medium">Account Name</span>
                        <span className="ml-6">{freelancer.accountName || freelancer.name || 'Samira Hadid'}</span>
                    </div>
                    <div>
                        <span className="font-medium">Account Number</span>
                        <span className="ml-4">{freelancer.accountNumber || '0000 0000'}</span>
                    </div>
                </div>
            </div>

            {/* Footer contact info */}
            <div className="border-t border-gray-300 pt-4 text-xs text-gray-500 text-center">
                <p>
                    {freelancer.address || '123 Anywhere St., Any City'} - {freelancer.phone || '123-456-7890'} - {freelancer.email || 'hello@reallygreatsite.com'}
                </p>
            </div>

            {/* Notes section */}
            {notes && (
                <div className="mt-6 text-xs text-gray-500">
                    <p className="font-semibold mb-1">Notes:</p>
                    <p>{notes}</p>
                </div>
            )}
        </div>
    );
};