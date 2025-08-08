// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const PAYPAL_BASIC_PLAN_ID = import.meta.env.VITE_PAYPAL_BASIC_PLAN_ID;
// const PAYPAL_PREMIUM_PLAN_ID = import.meta.env.VITE_PAYPAL_PREMIUM_PLAN_ID;

// export default function BillingManagement() {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     const token = localStorage.getItem('authToken');
//     const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

//     // Fetch user
//     useEffect(() => {
//         if (!token) {
//             setLoading(false);
//             return;
//         }

//         axios.get(`${baseURL}/api/freelancer/me`, {
//             headers: { Authorization: `Bearer ${token}` },
//         })
//             .then(res => setUser(res.data))
//             .catch(() => setUser(null))
//             .finally(() => setLoading(false));
//     }, [token]);

//     // Render PayPal buttons
//     useEffect(() => {
//         if (!user || !window.paypal) return;

//         const plans = [
//             { id: PAYPAL_BASIC_PLAN_ID, container: 'paypal-basic-button' },
//             { id: PAYPAL_PREMIUM_PLAN_ID, container: 'paypal-premium-button' }
//         ];

//         plans.forEach(({ id, container }) => {
//             const containerEl = document.getElementById(container);
//             if (!containerEl || containerEl.children.length > 0) return;

//             window.paypal.Buttons({
//                 style: { layout: 'vertical', color: 'blue', shape: 'pill', label: 'subscribe' },
//                 createSubscription: (data, actions) => {
//                     return actions.subscription.create({ plan_id: id });
//                 },
//                 onApprove: (data) => {
//                     alert('Subscription created! ID: ' + data.subscriptionID);
//                     window.location.reload(); // or fetch updated user info
//                 }
//             }).render(`#${container}`);
//         });
//     }, [user]);

//     const cancelSubscription = async () => {
//         if (!window.confirm('Are you sure you want to cancel auto-renewal?')) return;
//         try {
//             await axios.post(`${baseURL}/api/paypal/cancel-auto-renewal/${user.subscription.id}`, {}, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             alert('Subscription cancelled.');
//             window.location.reload();
//         } catch (err) {
//             alert('Error cancelling: ' + err?.response?.data?.error || err.message);
//         }
//     };

//     const planFeatures = [
//         { label: 'Clients', basic: '15', premium: 'Unlimited' },
//         { label: 'Invoices', basic: '20', premium: 'Unlimited' },
//         { label: 'Business Proposals/month', basic: '16 + Warning', premium: '50' },
//         { label: 'Meetings/month', basic: '3', premium: 'Unlimited' },
//         { label: 'Client Reminders', basic: 'Manual', premium: 'Automated' },
//         { label: 'Self Reminders', basic: '❌', premium: '✅' },
//         { label: 'Profile URL', basic: 'Platform Domain', premium: 'Custom Domain' },
//         { label: 'Email/SMS Reminders', basic: 'Manual Only', premium: 'Auto Email + SMS' },
//     ];

//     if (loading) return <div className="p-6 text-center">Loading...</div>;

//     return (
//         <div className="max-w-6xl mx-auto py-10 px-4 space-y-10">
//             {/* Subscription Status */}
//             {user?.subscription?.status === 'ACTIVE' && (
//                 <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded shadow">
//                     <h2 className="text-xl font-bold">You are subscribed</h2>
//                     <p className="mt-1 text-sm">Plan: <strong>{user.subscription.plan}</strong></p>
//                     <p className="text-sm">Next Billing: {new Date(user.subscription.nextBillingDate).toLocaleDateString()}</p>
//                     <button
//                         onClick={cancelSubscription}
//                         className="mt-3 inline-block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
//                     >
//                         Cancel Auto-Renewal
//                     </button>
//                 </div>
//             )}

//             {/* Comparison Table */}
//             <div className="overflow-x-auto">
//                 <table className="min-w-full border border-gray-300 rounded-xl overflow-hidden">
//                     <thead className="bg-gray-100 text-gray-800">
//                         <tr>
//                             <th className="p-4 text-left">Feature</th>
//                             <th className="p-4 text-center">Basic ($11/mo)</th>
//                             <th className="p-4 text-center">Premium ($21/mo)</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {planFeatures.map((f, i) => (
//                             <tr key={i} className="border-t">
//                                 <td className="p-4 font-medium">{f.label}</td>
//                                 <td className="p-4 text-center">{f.basic}</td>
//                                 <td className="p-4 text-center">{f.premium}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Pricing Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <div className="border rounded-2xl shadow-lg p-6 text-center">
//                     <h3 className="text-2xl font-bold mb-1">Basic Plan</h3>
//                     <p className="text-gray-600 mb-4">For small teams or solo freelancers</p>
//                     <div className="text-blue-700 font-semibold text-xl mb-4">$11/month</div>
//                     <div id="paypal-basic-button" className="flex justify-center" />
//                 </div>

//                 <div className="border rounded-2xl shadow-lg p-6 text-center">
//                     <h3 className="text-2xl font-bold mb-1">Premium Plan</h3>
//                     <p className="text-gray-600 mb-4">Full power for pro freelancers</p>
//                     <div className="text-blue-700 font-semibold text-xl mb-4">$21/month</div>
//                     <div id="paypal-premium-button" className="flex justify-center" />
//                 </div>
//             </div>
//         </div>
//     );
// }



import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PAYPAL_BASIC_PLAN_ID = import.meta.env.VITE_PAYPAL_BASIC_PLAN_ID;
const PAYPAL_PREMIUM_PLAN_ID = import.meta.env.VITE_PAYPAL_PREMIUM_PLAN_ID;

export default function BillingManagement() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [animateCards, setAnimateCards] = useState(false);

    // const token = localStorage.getItem('authToken');
    // const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

    // Mock user data for demo
    const mockUser = {
        subscription: {
            status: 'ACTIVE',
            plan: 'Premium',
            nextBillingDate: '2025-09-01T00:00:00.000Z',
            id: 'sub_123456'
        }
    };

    // Fetch user
    useEffect(() => {
        // if (!token) {
        //     setLoading(false);
        //     return;
        // }

        // axios.get(`${baseURL}/api/freelancer/me`, {
        //     headers: { Authorization: `Bearer ${token}` },
        // })
        //     .then(res => setUser(res.data))
        //     .catch(() => setUser(null))
        //     .finally(() => setLoading(false));

        // Mock API call with delay
        setTimeout(() => {
            setUser(mockUser);
            setLoading(false);
            setAnimateCards(true);
        }, 1000);
    }, []);

    // Render PayPal buttons
    useEffect(() => {
        if (!user || !window.paypal) return;

        const plans = [
            { id: PAYPAL_BASIC_PLAN_ID, container: 'paypal-basic-button' },
            { id: PAYPAL_PREMIUM_PLAN_ID, container: 'paypal-premium-button' }
        ];

        plans.forEach(({ id, container }) => {
            const containerEl = document.getElementById(container);
            if (!containerEl || containerEl.children.length > 0) return;

            window.paypal.Buttons({
                style: { layout: 'vertical', color: 'blue', shape: 'pill', label: 'subscribe' },
                createSubscription: (data, actions) => {
                    return actions.subscription.create({ plan_id: id });
                },
                onApprove: (data) => {
                    alert('Subscription created! ID: ' + data.subscriptionID);
                    window.location.reload(); // or fetch updated user info
                }
            }).render(`#${container}`);
        });
    }, [user]);

    const cancelSubscription = async () => {
        if (!window.confirm('Are you sure you want to cancel auto-renewal?')) return;
        try {
            // await axios.post(`${baseURL}/api/paypal/cancel-auto-renewal/${user.subscription.id}`, {}, {
            //     headers: { Authorization: `Bearer ${token}` }
            // });
            alert('Subscription cancelled.');
            // window.location.reload();
        } catch (err) {
            alert('Error cancelling: ' + err?.response?.data?.error || err.message);
        }
    };

    const planFeatures = [
        { label: 'Clients', basic: '15', premium: 'Unlimited' },
        { label: 'Invoices', basic: '20', premium: 'Unlimited' },
        { label: 'Business Proposals/month', basic: '16 + Warning', premium: '50' },
        { label: 'Meetings/month', basic: '3', premium: 'Unlimited' },
        { label: 'Client Reminders', basic: 'Manual', premium: 'Automated' },
        { label: 'Self Reminders', basic: '❌', premium: '✅' },
        { label: 'Profile URL', basic: 'Platform Domain', premium: 'Custom Domain' },
        { label: 'Email/SMS Reminders', basic: 'Manual Only', premium: 'Auto Email + SMS' },
    ];

    if (loading) {
        return (
            <div className="min-h-screen w-7xl flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                <div className="text-center">
                    <div className="inline-block animate-spin  rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
                    <p className="text-lg text-gray-600">Loading billing information...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-6 sm:py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8 sm:mb-12 animate-fade-in">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                        Billing Management
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Manage your subscription and explore our flexible pricing plans
                    </p>
                </div>

                <div className="space-y-8 sm:space-y-12">
                    {/* Subscription Status */}
                    {user?.subscription?.status === 'ACTIVE' && (
                        <div className={`transform transition-all duration-700 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                            <div className="bg-gradient-to-r from-green-400 to-green-500 p-1 rounded-2xl shadow-xl">
                                <div className="bg-white rounded-xl p-6 sm:p-8">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                        <div className="mb-4 sm:mb-0">
                                            <div className="flex items-center mb-2">
                                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-3"></div>
                                                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Active Subscription</h2>
                                            </div>
                                            <p className="text-gray-600 mb-1">
                                                Plan: <span className="font-semibold text-purple-600">{user.subscription.plan}</span>
                                            </p>
                                            <p className="text-gray-600 text-sm">
                                                Next Billing: <span className="font-medium">{new Date(user.subscription.nextBillingDate).toLocaleDateString()}</span>
                                            </p>
                                        </div>
                                        <button
                                            onClick={cancelSubscription}
                                            className=" cursor-pointer bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                                        >
                                            Cancel Auto-Renewal
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Comparison Table */}
                    <div className={`transform transition-all duration-700 delay-200 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-800">
                            Compare Plans
                        </h2>
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                                        <tr>
                                            <th className="p-4 sm:p-6 text-left font-semibold">Feature</th>
                                            <th className="p-4 sm:p-6 text-center font-semibold">
                                                <div className="flex flex-col items-center">
                                                    <span>Basic</span>
                                                    <span className="text-sm opacity-90">$11/mo</span>
                                                </div>
                                            </th>
                                            <th className="p-4 sm:p-6 text-center font-semibold">
                                                <div className="flex flex-col items-center">
                                                    <span>Premium</span>
                                                    <span className="text-sm opacity-90">$21/mo</span>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {planFeatures.map((f, i) => (
                                            <tr
                                                key={i}
                                                className={`border-t border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                                    }`}
                                            >
                                                <td className="p-4 sm:p-6 font-medium text-gray-800">{f.label}</td>
                                                <td className="p-4 sm:p-6 text-center text-gray-600">{f.basic}</td>
                                                <td className="p-4 sm:p-6 text-center">
                                                    <span className="font-semibold text-purple-600">{f.premium}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Pricing Cards */}
                    <div className={`transform transition-all duration-700 delay-400 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-800">
                            Choose Your Plan
                        </h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
                            {/* Basic Plan */}
                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-3xl opacity-0 group-hover:opacity-100 transform scale-105 transition-all duration-300"></div>
                                <div className="relative bg-white border-2 border-gray-200 rounded-3xl shadow-lg p-6 sm:p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                                    <div className="mb-6">
                                        <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                                            <span className="text-2xl">📊</span>
                                        </div>
                                        <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-800">Basic Plan</h3>
                                        <p className="text-gray-600 mb-4">Perfect for small teams or solo freelancers</p>
                                        <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2">$11</div>
                                        <p className="text-gray-500">per month</p>
                                    </div>

                                    <div className="space-y-3 mb-8">
                                        <div className="flex items-center justify-center text-gray-600">
                                            <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                                            <span>15 Clients</span>
                                        </div>
                                        <div className="flex items-center justify-center text-gray-600">
                                            <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                                            <span>20 Invoices</span>
                                        </div>
                                        <div className="flex items-center justify-center text-gray-600">
                                            <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                                            <span>3 Meetings/month</span>
                                        </div>
                                    </div>

                                    <div id="paypal-basic-button" className="flex justify-center">
                                        <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105">
                                            Subscribe to Basic
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Premium Plan */}
                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl opacity-100 transform scale-105"></div>
                                <div className="relative bg-white border-2 border-purple-500 rounded-3xl shadow-2xl p-6 sm:p-8 text-center transform transition-all duration-300 hover:scale-105">
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                                            MOST POPULAR
                                        </span>
                                    </div>

                                    <div className="mb-6 mt-4">
                                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                                            <span className="text-2xl">🚀</span>
                                        </div>
                                        <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-800">Premium Plan</h3>
                                        <p className="text-gray-600 mb-4">Full power for professional freelancers</p>
                                        <div className="text-4xl sm:text-5xl font-bold text-purple-600 mb-2">$21</div>
                                        <p className="text-gray-500">per month</p>
                                    </div>

                                    <div className="space-y-3 mb-8">
                                        <div className="flex items-center justify-center text-gray-600">
                                            <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                                            <span>Unlimited Clients</span>
                                        </div>
                                        <div className="flex items-center justify-center text-gray-600">
                                            <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                                            <span>Unlimited Invoices</span>
                                        </div>
                                        <div className="flex items-center justify-center text-gray-600">
                                            <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                                            <span>Unlimited Meetings</span>
                                        </div>
                                    </div>

                                    <div id="paypal-premium-button" className="flex justify-center">
                                        <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                                            Subscribe to Premium
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Features Section */}
                    {/* <div className={`transform transition-all duration-700 delay-600 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                            <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
                                Why Choose Our Platform?
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="text-center p-4 rounded-xl hover:bg-blue-50 transition-colors duration-300">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                                        <span className="text-2xl">💼</span>
                                    </div>
                                    <h4 className="font-semibold text-gray-800 mb-2">Professional Tools</h4>
                                    <p className="text-gray-600 text-sm">Everything you need to manage your freelance business</p>
                                </div>
                                <div className="text-center p-4 rounded-xl hover:bg-purple-50 transition-colors duration-300">
                                    <div className="w-12 h-12 bg-purple-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                                        <span className="text-2xl">📱</span>
                                    </div>
                                    <h4 className="font-semibold text-gray-800 mb-2">Mobile Ready</h4>
                                    <p className="text-gray-600 text-sm">Access your dashboard anywhere, anytime</p>
                                </div>
                                <div className="text-center p-4 rounded-xl hover:bg-pink-50 transition-colors duration-300">
                                    <div className="w-12 h-12 bg-pink-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                                        <span className="text-2xl">🔒</span>
                                    </div>
                                    <h4 className="font-semibold text-gray-800 mb-2">Secure & Safe</h4>
                                    <p className="text-gray-600 text-sm">Your data is protected with enterprise-grade security</p>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}