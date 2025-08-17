// import React, { useEffect, useState } from "react";

// export default function SubscriptionDashboard() {
//     const [subscription, setSubscription] = useState(null);

//     useEffect(() => {
//         fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/subscription/me`)
//             .then((res) => res.json())
//             .then(setSubscription);
//     }, []);

//     if (!subscription) return <p>Loading...</p>;

//     return (
//         <div className="p-6 space-y-4">
//             <h2 className="text-2xl font-bold">Subscription Plan: {subscription.plan}</h2>
//             <p className="text-sm text-gray-600">
//                 Expires on: {new Date(subscription.expiresAt).toLocaleDateString()}
//             </p>

//             {Object.entries(subscription.limits).map(([key, { used, max }]) => {
//                 const percent = (used / max) * 100;
//                 return (
//                     <div key={key} className="mb-4">
//                         <p className="capitalize font-medium">{key}: {used}/{max}</p>
//                         <div className="w-full bg-gray-200 rounded-full h-3">
//                             <div
//                                 className={`h-3 rounded-full ${percent >= 100 ? "bg-red-500" : "bg-green-500"}`}
//                                 style={{ width: `${percent}%` }}
//                             />
//                         </div>
//                     </div>
//                 );
//             })}
//         </div>
//     );
// }


// import React, { useEffect, useState } from "react";
// import { Crown, Calendar, TrendingUp, AlertTriangle, CheckCircle, Zap } from "lucide-react";
// // import axios from 'axios'; // Alternative HTTP client for API calls - not available in this environment

// export default function SubscriptionDashboard() {
//     const [subscription, setSubscription] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [animateProgress, setAnimateProgress] = useState(false);

//     useEffect(() => {
//         // Using fetch API (you can replace with axios if preferred)
//         fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/subscription/me`)
//             .then((res) => res.json())
//             .then((data) => {
//                 setSubscription(data);
//                 setLoading(false);
//                 // Trigger progress bar animations after data loads
//                 setTimeout(() => setAnimateProgress(true), 300);
//             })
//             .catch((error) => {
//                 console.error('Error fetching subscription:', error);
//                 setLoading(false);
//             });

//         // Alternative with axios:
//         // axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/subscription/me`)
//         //     .then(response => {
//         //         setSubscription(response.data);
//         //         setLoading(false);
//         //         setTimeout(() => setAnimateProgress(true), 300);
//         //     })
//         //     .catch(error => {
//         //         console.error('Error fetching subscription:', error);
//         //         setLoading(false);
//         //     });
//     }, []);

//     const getPlanIcon = (plan) => {
//         switch (plan?.toLowerCase()) {
//             case 'professional':
//             case 'pro':
//                 return <Crown className="text-yellow-500" size={24} />;
//             case 'premium':
//                 return <Zap className="text-purple-500" size={24} />;
//             default:
//                 return <CheckCircle className="text-green-500" size={24} />;
//         }
//     };

//     const getPlanColor = (plan) => {
//         switch (plan?.toLowerCase()) {
//             case 'professional':
//             case 'pro':
//                 return 'from-yellow-500 to-orange-500';
//             case 'premium':
//                 return 'from-purple-600 to-pink-600';
//             default:
//                 return 'from-green-500 to-blue-500';
//         }
//     };

//     const getProgressColor = (percent) => {
//         if (percent >= 90) return 'from-red-500 to-red-600';
//         if (percent >= 75) return 'from-yellow-500 to-orange-500';
//         return 'from-green-500 to-blue-500';
//     };

//     const formatLimitKey = (key) => {
//         return key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
//                 <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
//                     <div className="animate-pulse space-y-4">
//                         <div className="h-8 bg-gray-200 rounded-xl w-3/4 mx-auto"></div>
//                         <div className="h-4 bg-gray-200 rounded-lg w-1/2 mx-auto"></div>
//                         <div className="space-y-3 mt-6">
//                             <div className="h-6 bg-gray-200 rounded-lg"></div>
//                             <div className="h-3 bg-gray-200 rounded-full"></div>
//                         </div>
//                         <div className="space-y-3">
//                             <div className="h-6 bg-gray-200 rounded-lg"></div>
//                             <div className="h-3 bg-gray-200 rounded-full"></div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     if (!subscription) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
//                 <div className="bg-white rounded-3xl shadow-xl p-8 text-center max-w-md">
//                     <AlertTriangle className="mx-auto mb-4 text-red-500" size={48} />
//                     <h3 className="text-xl font-bold text-gray-800 mb-2">Unable to Load Subscription</h3>
//                     <p className="text-gray-600">Please try refreshing the page.</p>
//                 </div>
//             </div>
//         );
//     }

//     const isExpiringSoon = new Date(subscription.expiresAt) - new Date() < 7 * 24 * 60 * 60 * 1000; // 7 days

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
//             <div className="max-w-4xl mx-auto space-y-6">
//                 {/* Header Card */}
//                 <div className="bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
//                     <div className={`bg-gradient-to-r ${getPlanColor(subscription.plan)} p-6 sm:p-8 text-white relative overflow-hidden`}>
//                         <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
//                         <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12"></div>

//                         <div className="relative z-10">
//                             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                                 <div className="flex items-center gap-4">
//                                     <div className="p-3 bg-white bg-opacity-20 rounded-2xl">
//                                         {getPlanIcon(subscription.plan)}
//                                     </div>
//                                     <div>
//                                         <h1 className="text-2xl sm:text-3xl font-bold capitalize">
//                                             {subscription.plan} Plan
//                                         </h1>
//                                         <p className="text-white text-opacity-90 text-sm sm:text-base">
//                                             Your current subscription
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className={`mt-6 flex items-center gap-2 p-3 rounded-xl ${isExpiringSoon ? 'bg-red-500 bg-opacity-20' : 'bg-white bg-opacity-20'}`}>
//                                 <Calendar size={20} />
//                                 <span className="font-medium">
//                                     {isExpiringSoon ? 'Expires Soon: ' : 'Valid Until: '}
//                                     {new Date(subscription.expiresAt).toLocaleDateString('en-US', {
//                                         year: 'numeric',
//                                         month: 'long',
//                                         day: 'numeric'
//                                     })}
//                                 </span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Usage Stats */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {Object.entries(subscription.limits).map(([key, { used, max }], index) => {
//                         const percent = Math.min((used / max) * 100, 100);
//                         const isNearLimit = percent >= 80;

//                         return (
//                             <div
//                                 key={key}
//                                 className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
//                                 style={{
//                                     animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`
//                                 }}
//                             >
//                                 <div className="flex items-center justify-between mb-4">
//                                     <h3 className="font-semibold text-gray-800 text-lg">
//                                         {formatLimitKey(key)}
//                                     </h3>
//                                     <div className="flex items-center gap-2">
//                                         {isNearLimit && <AlertTriangle className="text-yellow-500" size={20} />}
//                                         <TrendingUp className="text-blue-500" size={20} />
//                                     </div>
//                                 </div>

//                                 <div className="space-y-3">
//                                     <div className="flex justify-between items-baseline">
//                                         <span className="text-2xl font-bold text-gray-900">
//                                             {used.toLocaleString()}
//                                         </span>
//                                         <span className="text-gray-500">
//                                             of {max.toLocaleString()}
//                                         </span>
//                                     </div>

//                                     {/* Progress Bar */}
//                                     <div className="relative">
//                                         <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
//                                             <div
//                                                 className={`h-full bg-gradient-to-r ${getProgressColor(percent)} rounded-full transition-all duration-1000 ease-out transform origin-left ${animateProgress ? 'scale-x-100' : 'scale-x-0'}`}
//                                                 style={{
//                                                     width: animateProgress ? `${percent}%` : '0%',
//                                                 }}
//                                             />
//                                         </div>
//                                         <div
//                                             className="absolute top-0 right-0 transform -translate-y-8 text-xs font-medium text-gray-600"
//                                             style={{
//                                                 left: `${Math.min(percent, 90)}%`,
//                                                 opacity: animateProgress ? 1 : 0,
//                                                 transition: 'opacity 0.5s ease-out 1s'
//                                             }}
//                                         >
//                                             {percent.toFixed(0)}%
//                                         </div>
//                                     </div>

//                                     {/* Status Message */}
//                                     <div className="flex items-center gap-2 text-sm">
//                                         {percent >= 100 ? (
//                                             <span className="text-red-600 font-medium flex items-center gap-1">
//                                                 <AlertTriangle size={16} />
//                                                 Limit reached
//                                             </span>
//                                         ) : percent >= 80 ? (
//                                             <span className="text-yellow-600 font-medium">
//                                                 Nearing limit
//                                             </span>
//                                         ) : (
//                                             <span className="text-green-600 font-medium">
//                                                 Good usage
//                                             </span>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>

//                 {/* Upgrade CTA (if approaching limits) */}
//                 {Object.values(subscription.limits).some(({ used, max }) => (used / max) >= 0.8) && (
//                     <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-6 sm:p-8 text-white text-center transform hover:scale-[1.02] transition-all duration-300">
//                         <h3 className="text-xl sm:text-2xl font-bold mb-2">
//                             Ready to Unlock More?
//                         </h3>
//                         <p className="text-purple-100 mb-6">
//                             You're approaching your plan limits. Upgrade for unlimited access!
//                         </p>
//                         <button className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105">
//                             Upgrade Plan
//                         </button>
//                     </div>
//                 )}
//             </div>

//             <style jsx>{`
//                 @keyframes slideInUp {
//                     from {
//                         opacity: 0;
//                         transform: translateY(30px);
//                     }
//                     to {
//                         opacity: 1;
//                         transform: translateY(0);
//                     }
//                 }
//             `}</style>
//         </div>
//     );
// }

import axios from "axios";
import React, { useEffect, useState } from "react";

export default function SubscriptionDashboard() {
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            return;
        }

        axios
            .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/freelancer/me`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setSubscriptions(res.data.subscriptions || []));

    }, []);

    if (!subscriptions.length) return <p className="p-6">No subscriptions found.</p>;

    return (
        <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">My Subscriptions</h2>
                <p className="text-gray-600">Manage your active plans and monitor usage limits</p>
            </div>

            {subscriptions.map((sub) => {
                const isActive = sub.active;
                return (
                    <div
                        key={sub.id}
                        className={`rounded-2xl p-6 shadow-lg border-2 bg-white/90 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${isActive
                                ? "border-purple-300 shadow-purple-100"
                                : "border-gray-200 shadow-gray-100"
                            }`}
                    >
                        {/* Header Section */}
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center space-x-3">
                                <div className={`w-3 h-3 rounded-full ${isActive ? "bg-purple-500" : "bg-gray-400"
                                    }`} />
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {sub.plan} Plan
                                </h3>
                            </div>
                            <span
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${isActive
                                        ? "bg-purple-100 text-purple-700 border border-purple-200"
                                        : "bg-gray-100 text-gray-600 border border-gray-200"
                                    }`}
                            >
                                {isActive ? "✓ Active" : "○ Inactive"}
                            </span>
                        </div>

                        {/* Date Information */}
                        <div className="bg-gray-50 rounded-xl p-4 mb-6">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-500 font-medium">Started:</span>
                                    <p className="text-gray-900 font-semibold">
                                        {new Date(sub.startedAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-gray-500 font-medium">
                                        {sub.expiresAt ? "Expires:" : "Status:"}
                                    </span>
                                    <p className="text-gray-900 font-semibold">
                                        {sub.expiresAt
                                            ? new Date(sub.expiresAt).toLocaleDateString()
                                            : "Lifetime"
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Usage Limits */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                                Usage Overview
                            </h4>

                            {Object.entries(sub.limits).map(([key, { used = 0, max }]) => {
                                const isUnlimited = max === null || max === "unlimited";
                                const percent = !isUnlimited ? Math.min((used / max) * 100, 100) : 0;
                                const isNearLimit = percent >= 80 && percent < 100;
                                const isOverLimit = percent >= 100;

                                return (
                                    <div key={key} className="bg-white rounded-xl p-4 border border-gray-100">
                                        <div className="flex justify-between items-center mb-3">
                                            <p className="capitalize font-medium text-gray-700 flex items-center">
                                                <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                            </p>
                                            <div className="text-right">
                                                <span className="text-sm font-bold text-gray-900">
                                                    {used}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    {isUnlimited ? " / Unlimited" : ` / ${max}`}
                                                </span>
                                            </div>
                                        </div>

                                        {!isUnlimited && (
                                            <div className="relative">
                                                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full transition-all duration-500 ${isOverLimit
                                                                ? "bg-gradient-to-r from-red-400 to-red-500"
                                                                : isNearLimit
                                                                    ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                                                                    : "bg-gradient-to-r from-purple-400 to-purple-500"
                                                            }`}
                                                        style={{ width: `${Math.min(percent, 100)}%` }}
                                                    />
                                                </div>
                                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                                    <span>0</span>
                                                    <span className={`font-medium ${isOverLimit ? "text-red-600" :
                                                            isNearLimit ? "text-orange-600" : "text-purple-600"
                                                        }`}>
                                                        {percent.toFixed(1)}%
                                                    </span>
                                                    <span>{max}</span>
                                                </div>
                                            </div>
                                        )}

                                        {isUnlimited && (
                                            <div className="flex items-center text-xs text-gray-500">
                                                <div className="flex-1 border-t border-dashed border-purple-200"></div>
                                                <span className="px-3 bg-purple-50 text-purple-600 rounded-full font-medium">
                                                    ∞ Unlimited
                                                </span>
                                                <div className="flex-1 border-t border-dashed border-purple-200"></div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-6 pt-6 border-t border-gray-100 flex space-x-3">
                            {isActive ? (
                                <>
                                    <button className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-xl font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-300/50">
                                        Upgrade Plan
                                    </button>
                                    <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300 hover:scale-105">
                                        Manage
                                    </button>
                                </>
                            ) : (
                                <button className="w-full bg-gradient-to-r from-gray-400 to-gray-500 text-white py-3 rounded-xl font-medium cursor-not-allowed opacity-60">
                                    Plan Expired
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}

            {/* Summary Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-200 shadow-lg shadow-purple-100">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold">G</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Groweza Pro Tips</h3>
                        <p className="text-sm text-gray-600">Optimize your subscription usage</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="bg-purple-50 rounded-xl p-4">
                        <div className="text-2xl font-bold text-purple-600">
                            {subscriptions.filter(s => s.active).length}
                        </div>
                        <div className="text-sm text-gray-600">Active Plans</div>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4">
                        <div className="text-2xl font-bold text-purple-600">
                            {subscriptions.reduce((total, sub) => {
                                if (sub.active) {
                                    return total + Object.values(sub.limits).reduce((sum, limit) => sum + (limit.used || 0), 0);
                                }
                                return total;
                            }, 0)}
                        </div>
                        <div className="text-sm text-gray-600">Total Usage</div>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4">
                        <div className="text-2xl font-bold text-purple-600">98%</div>
                        <div className="text-sm text-gray-600">Efficiency Score</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
