// import { FaDollarSign } from "react-icons/fa";
// import { HiOutlineUserAdd } from "react-icons/hi";
// import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator} from "@/components/ui/dropdown-menu";
// import React from "react";

// export default function TopBar({profile}) {
//     return (
//         <div className=" w-full flex justify-between items-center px-6 py-3 border-b bg-white">
//             <div className="  flex items-center gap-3">
//                 <img src="/logo.png" alt="logo" className="h-12 w-12" />
//                 <span className="text-2xl font-semibold text-blue-600">Groweza</span>
//             </div>
//             <div className="flex items-center gap-4">
//                 <select className="border px-3 py-1 rounded-md text-lg">
//                     <option>$ USD</option>
//                     <option>₹ INR</option>
//                     <option>€ EUR</option>
//                 </select>
//                 <DropdownMenu>
//                     <DropdownMenuTrigger className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500  text-white  rounded-full text-sm p-0.5 cursor-pointer"><img src={profile} className="w-12 h-12 rounded-full border-2  " alt="" /></DropdownMenuTrigger>
//                     <DropdownMenuContent>
//                         <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                         <DropdownMenuSeparator />
//                         <DropdownMenuItem>Profile</DropdownMenuItem>
//                         <DropdownMenuItem>Billing</DropdownMenuItem>
//                         <DropdownMenuItem>Webiste</DropdownMenuItem>
//                         <DropdownMenuItem>Logout</DropdownMenuItem>
//                     </DropdownMenuContent>
//                 </DropdownMenu>
//             </div>
//         </div>
//     );
// }

// import { FaDollarSign } from "react-icons/fa";
// import { HiOutlineUserAdd } from "react-icons/hi";
// import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
// import React from "react";
// import {useNavigate} from "react-router-dom";
// import {toast} from "react-toastify";

// export default function TopBar({profile}) {
//     const navigate = useNavigate();

//     const handleLogout =()=>{
//         localStorage.removeItem("authToken");
//         navigate("/");
//         toast.success("Logging from dashboard");

//     }

//     return (
//         <div className="w-full flex justify-between items-center px-3 sm:px-6 py-3 border-b bg-white shadow-sm transition-all duration-300">
//             {/* Logo Section */}
//             <div className="flex items-center gap-2 sm:gap-3">
//                 <img
//                     src="/logo.png"
//                     alt="logo"
//                     className="h-8 w-8 sm:h-12 sm:w-12 transition-transform duration-300 hover:scale-110"
//                 />
//                 <span className="text-xl sm:text-2xl font-semibold text-blue-600 transition-colors duration-300 hover:text-blue-700">
//                     Groweza
//                 </span>
//             </div>

//             {/* Right Section */}
//             <div className="flex items-center gap-2 sm:gap-4">
//                 {/* Currency Selector */}
//                 <select className="border border-gray-300 px-2 sm:px-3 py-1 rounded-md text-sm sm:text-lg 
//                                  bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 
//                                  focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md">
//                     <option>$ USD</option>
//                     <option>₹ INR</option>
//                     <option>€ EUR</option>
//                 </select>

//                 {/* User Dropdown */}
//                 <DropdownMenu>
//                     <DropdownMenuTrigger className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 
//                                                    text-white rounded-full text-sm p-0.5 cursor-pointer 
//                                                    hover:from-blue-600 hover:to-purple-600 
//                                                    transform transition-all duration-300 hover:scale-105 
//                                                    shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 
//                                                    focus:ring-blue-500 focus:ring-offset-2">
//                         <img
//                             src={profile || "https://via.placeholder.com/48x48/6366f1/ffffff?text=U"}
//                             className="w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 border-white 
//                                      transition-all duration-300 hover:border-gray-200"
//                             alt="Profile"
//                         />
//                     </DropdownMenuTrigger>

//                     <DropdownMenuContent className="w-56 mt-2  border border-gray-200 rounded-lg shadow-xl 
//                                                    animate-in slide-in-from-top-2 duration-300 
//                                                    backdrop-blur-sm bg-white/95">
//                         <DropdownMenuLabel className="text-gray-700 font-medium px-3 py-2 border-b border-gray-100">
//                             My Account
//                         </DropdownMenuLabel>
//                         <DropdownMenuSeparator className="bg-gray-100" />

//                         <DropdownMenuItem className="px-3 py-2 text-gray-700 hover:bg-gradient-to-r 
//                                                    hover:from-blue-50 hover:to-purple-50 
//                                                    hover:text-blue-700 transition-all duration-200 
//                                                    cursor-pointer rounded-md mx-1 my-1 
//                                                    focus:bg-gradient-to-r focus:from-blue-50 focus:to-purple-50" onClick={() => { navigate("/dashboard/me") }}>
//                             <span className="flex items-center gap-2" >
//                                 <div className="w-2 h-2 bg-blue-500 rounded-full transition-all duration-300"></div>
//                                 Profile
//                             </span>
//                         </DropdownMenuItem>

//                         <DropdownMenuItem className="px-3 py-2 text-gray-700 hover:bg-gradient-to-r 
//                                                    hover:from-blue-50 hover:to-purple-50 
//                                                    hover:text-blue-700 transition-all duration-200 
//                                                    cursor-pointer rounded-md mx-1 my-1 
//                                                    focus:bg-gradient-to-r focus:from-blue-50 focus:to-purple-50"onClick={() => { navigate("/dashboard/my-billings") }}>
//                             <span className="flex items-center gap-2" >
//                                 <div className="w-2 h-2 bg-green-500 rounded-full transition-all duration-300"></div>
//                                 Billing
//                             </span>
//                         </DropdownMenuItem>

//                         <DropdownMenuItem className="px-3 py-2 text-gray-700 hover:bg-gradient-to-r 
//                                                    hover:from-blue-50 hover:to-purple-50 
//                                                    hover:text-blue-700 transition-all duration-200 
//                                                    cursor-pointer rounded-md mx-1 my-1 
//                                                    focus:bg-gradient-to-r focus:from-blue-50 focus:to-purple-50" onClick={() => { navigate("/dashboard/my-website") }}>
//                             <span className="flex items-center gap-2" >
//                                 <div className="w-2 h-2 bg-purple-500 rounded-full transition-all duration-300"></div>
//                                 Website
//                             </span>
//                         </DropdownMenuItem>

//                         <DropdownMenuItem className="px-3 py-2 text-gray-700 hover:bg-gradient-to-r 
//                                                    hover:from-blue-50 hover:to-purple-50 
//                                                    hover:text-blue-700 transition-all duration-200 
//                                                    cursor-pointer rounded-md mx-1 my-1 
//                                                    focus:bg-gradient-to-r focus:from-blue-50 focus:to-purple-50" onClick={() => { navigate("/dashboard/my-invoice") }}>
//                             <span className="flex items-center gap-2" >
//                                 <div className="w-2 h-2 bg-zinc-900 rounded-full transition-all duration-300"></div>
//                                 All Invoice
//                             </span>
//                         </DropdownMenuItem>



//                         <DropdownMenuItem className="px-3 py-2 text-gray-700 hover:bg-gradient-to-r 
//                                                    hover:from-red-50 hover:to-orange-50 
//                                                    hover:text-blue-700 transition-all duration-200 
//                                                    cursor-pointer rounded-md mx-1 my-1 
//                                                    focus:bg-gradient-to-r focus:from-blue-50 focus:to-purple-50" onClick={() => { navigate("/dashboard/all-proposal") }}>
//                             <span className="flex items-center gap-2" >
//                                 <div className="w-2 h-2 bg-cyan-400 rounded-full transition-all duration-300"></div>
//                                 All Proposal
//                             </span>
//                         </DropdownMenuItem>

//                         <DropdownMenuSeparator className="bg-gray-100 my-2" />

//                         <DropdownMenuItem className="px-3 py-2 text-red-600 hover:bg-red-50 
//                                                    hover:text-red-700 transition-all duration-200 
//                                                    cursor-pointer rounded-md mx-1 my-1 
//                                                    focus:bg-red-50 font-medium" onClick={handleLogout}>
//                             <span className="flex items-center gap-2" >
//                                 <div className="w-2 h-2 bg-red-500 rounded-full transition-all duration-300"></div>
//                                 Logout
//                             </span>
//                         </DropdownMenuItem>
//                     </DropdownMenuContent>
//                 </DropdownMenu>
//             </div>
//         </div>
//     );
// }

// Demo component to showcase the TopBar
// function TopBarDemo() {
//     return (
//         <div className="min-h-screen bg-gray-50">
//             <TopBar profile="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
//             <div className="p-6">
//                 <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>
//                 <p className="text-gray-600">Your enhanced TopBar with stylish dropdown menu and responsive design is ready!</p>
//             </div>
//         </div>
//     );
// }

// import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// export default function TopBar({ profile }) {
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         localStorage.removeItem("authToken");
//         navigate("/");
//         toast.success("Logging from dashboard");
//     };

//     return (
//         <div className="w-full flex justify-between items-center px-4 sm:px-6 py-3 border-b bg-white shadow-sm transition-all duration-300">
//             {/* Logo Section */}
//             <div className="flex items-center gap-2 sm:gap-3">
//                 <img
//                     src="/logo.png"
//                     alt="logo"
//                     className="h-8 w-8 sm:h-10 sm:w-10 transition-transform duration-300 hover:scale-110"
//                 />
//                 <span className="text-xl font-semibold text-blue-600 hidden xs:inline sm:text-2xl transition-colors duration-300 hover:text-blue-700">
//                     Groweza
//                 </span>
//             </div>

//             {/* Right Section */}
//             <div className="flex items-center gap-2 sm:gap-4">
//                 {/* Currency Selector (hide on very small screens) */}
//                 <select className="hidden sm:block border border-gray-300 px-2 sm:px-3 py-1 rounded-md text-sm sm:text-base 
//                                  bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 
//                                  focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md">
//                     <option>$ USD</option>
//                     <option>₹ INR</option>
//                     <option>€ EUR</option>
//                 </select>

//                 {/* User Dropdown */}
//                 <DropdownMenu>
//                     <DropdownMenuTrigger className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 
//                                                    text-white rounded-full text-sm p-0.5 cursor-pointer 
//                                                    hover:from-blue-600 hover:to-purple-600 
//                                                    transform transition-all duration-300 hover:scale-105 
//                                                    shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 
//                                                    focus:ring-blue-500 focus:ring-offset-2">
//                         <img
//                             src={profile || "https://via.placeholder.com/48x48/6366f1/ffffff?text=U"}
//                             className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white 
//                                      transition-all duration-300 hover:border-gray-200"
//                             alt="Profile"
//                         />
//                     </DropdownMenuTrigger>

//                     <DropdownMenuContent className="w-52 sm:w-56 mt-2 border border-gray-200 rounded-lg shadow-xl 
//                                                    animate-in slide-in-from-top-2 duration-300 
//                                                    backdrop-blur-sm bg-white/95">
//                         <DropdownMenuLabel className="text-gray-700 font-medium px-3 py-2 border-b border-gray-100">
//                             My Account
//                         </DropdownMenuLabel>
//                         <DropdownMenuSeparator className="bg-gray-100" />

//                         {[
//                             { label: "Profile", color: "blue-500", path: "/dashboard/me" },
//                             { label: "Billing", color: "green-500", path: "/dashboard/my-billings" },
//                             // { label: "Website", color: "purple-500", path: "/dashboard/my-website" },
//                             // { label: "All Invoice", color: "zinc-900", path: "/dashboard/my-invoice" },
//                             // { label: "All Proposal", color: "cyan-400", path: "/dashboard/all-proposal" },
//                         ].map((item) => (
//                             <DropdownMenuItem
//                                 key={item.label}
//                                 className="px-3 py-2 text-gray-700 hover:bg-gradient-to-r 
//                                            hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 
//                                            transition-all duration-200 cursor-pointer rounded-md mx-1 my-1"
//                                 onClick={() => navigate(item.path)}
//                             >
//                                 <span className="flex items-center gap-2">
//                                     <div className={`w-2 h-2 bg-${item.color} rounded-full`} />
//                                     {item.label}
//                                 </span>
//                             </DropdownMenuItem>
//                         ))}

//                         <DropdownMenuSeparator className="bg-gray-100 my-2" />

//                         <DropdownMenuItem className="px-3 py-2 text-red-600 hover:bg-red-50 
//                                                    hover:text-red-700 transition-all duration-200 
//                                                    cursor-pointer rounded-md mx-1 my-1 font-medium"
//                             onClick={handleLogout}>
//                             <span className="flex items-center gap-2">
//                                 <div className="w-2 h-2 bg-red-500 rounded-full" />
//                                 Logout
//                             </span>
//                         </DropdownMenuItem>
//                     </DropdownMenuContent>
//                 </DropdownMenu>
//             </div>
//         </div>
//     );
// }

import React from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

export default function TopBar({ profile, onMobileMenuClick }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/");
        toast.success("Logging out from dashboard");
    };

    return (
        <div className="sticky top-0 z-10 bg-white shadow-sm flex justify-between items-center px-4 sm:px-6 py-3 border-b">
            {/* Left: Mobile Menu Button + Logo */}
            <div className="flex items-center gap-3">
                {/* Mobile menu button */}
                <button
                    onClick={onMobileMenuClick}
                    className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition"
                >
                    <FaBars />
                </button>

                {/* Logo */}
                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => navigate("/dashboard")}
                >
                    <img
                        src="/logo.png"
                        alt="Groweza Logo"
                        className="h-8 w-8 sm:h-10 sm:w-10 transition-transform duration-300 hover:scale-110"
                    />
                    <span className="text-xl font-semibold text-blue-600 sm:text-2xl transition-colors duration-300 hover:text-blue-700">
                        Groweza
                    </span>
                </div>
            </div>

            {/* Right: Currency Selector + User Menu */}
            <div className="flex items-center gap-3 sm:gap-4">
                {/* Currency Selector (hidden on very small screens) */}
                {/* <select
                    className="hidden sm:block border border-gray-300 px-2 sm:px-3 py-1 rounded-md text-sm sm:text-base 
                     bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 
                     focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                    <option>$ USD</option>
                    <option>₹ INR</option>
                    <option>€ EUR</option>
                </select> */}

                {/* Profile Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 
                       text-white rounded-full text-sm p-0.5 cursor-pointer 
                       hover:from-blue-600 hover:to-purple-600 
                       transform transition-all duration-300 hover:scale-105 
                       shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 
                       focus:ring-blue-500 focus:ring-offset-2"
                    >
                        <img
                            src={
                                profile ||
                                "https://via.placeholder.com/48x48/6366f1/ffffff?text=U"
                            }
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white 
                         transition-all duration-300 hover:border-gray-200"
                            alt="Profile"
                        />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        className="w-52 sm:w-56 mt-2 border border-gray-200 rounded-lg shadow-xl 
                       animate-in slide-in-from-top-2 duration-300 
                       backdrop-blur-sm bg-white/95"
                    >
                        <DropdownMenuLabel className="text-gray-700 font-medium px-3 py-2 border-b border-gray-100">
                            My Account
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-gray-100" />

                        {[
                            { label: "Profile", color: "blue-500", path: "/dashboard/me" },
                            {
                                label: "Billing",
                                color: "green-500",
                                path: "/dashboard/my-billings"
                            },
                            { label: "Subscription", color: "red-500", path: "/dashboard/my-subscriptions" },

                        ].map((item) => (
                            <DropdownMenuItem
                                key={item.label}
                                className="px-3 py-2 text-gray-700 hover:bg-gradient-to-r 
                           hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 
                           transition-all duration-200 cursor-pointer rounded-md mx-1 my-1"
                                onClick={() => navigate(item.path)}
                            >
                                <span className="flex items-center gap-2">
                                    <div className={`w-2 h-2 bg-${item.color} rounded-full`} />
                                    {item.label}
                                </span>
                            </DropdownMenuItem>
                        ))}

                        

                        <DropdownMenuSeparator className="bg-gray-100 my-2" />

                        <DropdownMenuItem
                            className="px-3 py-2 text-red-600 hover:bg-red-50 
                         hover:text-red-700 transition-all duration-200 
                         cursor-pointer rounded-md mx-1 my-1 font-medium"
                            onClick={handleLogout}
                        >
                            <span className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-500 rounded-full" />
                                Logout
                            </span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
