// // import { useLocation, useNavigate } from "react-router-dom";
// // import {
// //     FaDollarSign,
// //     FaUsers,
// //     FaCalendarAlt,
// //     FaCheckCircle,
// //     FaFileInvoice,
// //     FaRegFileAlt,
// //     FaPeopleArrows,
// // } from "react-icons/fa";

// // const tabs = [
// //     { name: "Dashboard", icon: <FaDollarSign />, link: "/dashboard" },
// //     { name: "Clients", icon: <FaUsers />, link: "/dashboard/clients" },
// //     { name: "Payments", icon: <FaDollarSign />, link: "/dashboard/payments" },
// //     { name: "Timeline", icon: <FaCalendarAlt />, link: "/dashboard/timeline" },
// //     { name: "Tasks", icon: <FaCheckCircle />, link: "/dashboard/tasks" },
// //     { name: "Invoices", icon: <FaFileInvoice />, link: "/dashboard/invoices" },
// //     { name: "Proposals", icon: <FaRegFileAlt />, link: "/dashboard/proposals" },
// //     {name:"Meetings" , icon:<FaPeopleArrows/> , link:"/dashboard/meetings"}
// // ];

// // export default function NavBar() {
// //     const location = useLocation(); // 👈 get current path
// //     const navigate = useNavigate();

// //     return (
// //         <div className="w-full flex gap-6 px-6 py-2 border-b bg-white">
// //             {tabs.map((tab) => {
// //                 const isActive = location.pathname === tab.link;
// //                 return (
// //                     <button
// //                         key={tab.name}
// //                         onClick={() => navigate(tab.link)}
// //                         className={`flex items-center gap-2 text-lg py-2 border-b-2 cursor-pointer ${isActive
// //                                 ? "text-blue-600 border-blue-600"
// //                                 : "text-gray-600 border-transparent"
// //                             } hover:text-blue-500 transition`}
// //                     >
// //                         {tab.icon}
// //                         {tab.name}
// //                     </button>
// //                 );
// //             })}
// //         </div>
// //     );
// // }



// import { useLocation, useNavigate } from "react-router-dom";
// import {
//     FaDollarSign,
//     FaUsers,
//     FaCalendarAlt,
//     FaCheckCircle,
//     FaFileInvoice,
//     FaRegFileAlt,
//     FaPeopleArrows,
// } from "react-icons/fa";

// const tabs = [
//     { name: "Dashboard", icon: <FaDollarSign />, link: "/dashboard" },
//     { name: "Clients", icon: <FaUsers />, link: "/dashboard/clients" },
//     { name: "Payments", icon: <FaDollarSign />, link: "/dashboard/payments" },
//     { name: "Timeline", icon: <FaCalendarAlt />, link: "/dashboard/timeline" },
//     { name: "Tasks", icon: <FaCheckCircle />, link: "/dashboard/tasks" },
//     { name: "Invoices", icon: <FaFileInvoice />, link: "/dashboard/invoices" },
//     { name: "Proposals", icon: <FaRegFileAlt />, link: "/dashboard/proposals" },
//     { name: "Meetings", icon: <FaPeopleArrows />, link: "/dashboard/meetings" },
// ];

// export default function NavBar() {
//     const location = useLocation();
//     const navigate = useNavigate();

//     return (
//         <div className="w-full overflow-x-auto border-b bg-white">
//             <div className="flex sm:flex-wrap gap-2 sm:gap-4 px-4 py-2 min-w-[600px] sm:min-w-0">
//                 {tabs.map((tab) => {
//                     const isActive = location.pathname === tab.link;
//                     return (
//                         <button
//                             key={tab.name}
//                             onClick={() => navigate(tab.link)}
//                             className={`flex items-center gap-2 px-3 py-2 text-sm sm:text-base whitespace-nowrap border-b-2 
//                                 ${isActive ? "text-blue-600 border-blue-600" : "text-gray-600 border-transparent"}
//                                 hover:text-blue-500 transition duration-200`}
//                         >
//                             {tab.icon}
//                             <span>{tab.name}</span>
//                         </button>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// }


// import { useLocation, useNavigate } from "react-router-dom";
// import {
//     FaDollarSign,
//     FaUsers,
//     FaCalendarAlt,
//     FaCheckCircle,
//     FaFileInvoice,
//     FaRegFileAlt,
//     FaPeopleArrows,
//     FaBars,
//     FaTimes,
// } from "react-icons/fa";
// import { useState } from "react";

// const tabs = [
//     { name: "Dashboard", icon: <FaDollarSign />, link: "/dashboard" },
//     { name: "Clients", icon: <FaUsers />, link: "/dashboard/clients" },
//     { name: "Payments", icon: <FaDollarSign />, link: "/dashboard/payments" },
//     { name: "Timeline", icon: <FaCalendarAlt />, link: "/dashboard/timeline" },
//     { name: "Tasks", icon: <FaCheckCircle />, link: "/dashboard/tasks" },
//     { name: "Invoices", icon: <FaFileInvoice />, link: "/dashboard/invoices" },
//     { name: "Proposals", icon: <FaRegFileAlt />, link: "/dashboard/proposals" },
//     { name: "Meetings", icon: <FaPeopleArrows />, link: "/dashboard/meetings" },
// ];

// export default function NavBar() {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const [drawerOpen, setDrawerOpen] = useState(false);

//     const toggleDrawer = () => setDrawerOpen(!drawerOpen);
//     const closeDrawer = () => setDrawerOpen(false);

//     const renderNavItems = (isDrawer = false) =>
//         tabs.map((tab) => {
//             const isActive = location.pathname === tab.link;
//             return (
//                 <button
//                     key={tab.name}
//                     onClick={() => {
//                         navigate(tab.link);
//                         if (isDrawer) closeDrawer();
//                     }}
//                     className={`flex items-center gap-2 px-3 py-2 text-sm sm:text-base whitespace-nowrap border-b-2 
//                         ${isActive ? "text-blue-600 border-blue-600" : "text-gray-600 border-transparent"} 
//                         hover:text-blue-500 transition duration-200 w-full text-left`}
//                 >
//                     {tab.icon}
//                     <span>{tab.name}</span>
//                 </button>
//             );
//         });

//     return (
//         <>
//             {/* Top bar */}
//             <div className="w-full flex items-center justify-between px-4 py-3 border-b bg-white sm:hidden">
//                 <span className="text-xl font-bold text-blue-600">Groweza</span>
//                 <button onClick={toggleDrawer} className="text-2xl text-gray-700 focus:outline-none">
//                     {drawerOpen ? <FaTimes /> : <FaBars />}
//                 </button>
//             </div>

//             {/* Horizontal navbar for large screens */}
//             <div className="w-full gap-2 px-4 py-2 border-b bg-white hidden sm:flex">
//                 {renderNavItems()}
//             </div>

//             {/* Mobile Drawer */}
//             {drawerOpen && (
//                 <div className="sm:hidden fixed top-0 left-0 w-64 h-full bg-white z-50 shadow-lg transition-transform duration-300 ease-in-out">
//                     <div className="flex justify-between items-center px-4 py-3 border-b">
//                         <span className="text-lg font-semibold text-blue-600">Navigation</span>
//                         <button onClick={closeDrawer} className="text-xl text-gray-700">
//                             <FaTimes />
//                         </button>
//                     </div>
//                     <div className="flex flex-col px-4 py-2 gap-2">
//                         {renderNavItems(true)}
//                     </div>
//                 </div>
//             )}

//             {/* Background overlay when drawer is open */}
//             {drawerOpen && (
//                 <div
//                     className="fixed inset-0 bg-black bg-opacity-30 z-40 sm:hidden"
//                     onClick={closeDrawer}
//                 ></div>
//             )}
//         </>
//     );
// }


// import { useState, useEffect } from "react";
// import {
//     FaDollarSign,
//     FaUsers,
//     FaCalendarAlt,
//     FaCheckCircle,
//     FaFileInvoice,
//     FaRegFileAlt,
//     FaPeopleArrows,
//     FaBars,
//     FaTimes,
//     FaTachometerAlt,
// } from "react-icons/fa";

// const tabs = [
//     { name: "Dashboard", icon: <FaTachometerAlt />, link: "/dashboard" },
//     { name: "Clients", icon: <FaUsers />, link: "/dashboard/clients" },
//     { name: "Payments", icon: <FaDollarSign />, link: "/dashboard/payments" },
//     { name: "Timeline", icon: <FaCalendarAlt />, link: "/dashboard/timeline" },
//     { name: "Tasks", icon: <FaCheckCircle />, link: "/dashboard/tasks" },
//     { name: "Invoices", icon: <FaFileInvoice />, link: "/dashboard/invoices" },
//     { name: "Proposals", icon: <FaRegFileAlt />, link: "/dashboard/proposals" },
//     { name: "Meetings", icon: <FaPeopleArrows />, link: "/dashboard/meetings" },
// ];

// export default function NavBar() {
//     const [currentPath, setCurrentPath] = useState("/dashboard");
//     const [drawerOpen, setDrawerOpen] = useState(false);
//     const [isScrolled, setIsScrolled] = useState(false);

//     // Handle scroll effect for navbar
//     useEffect(() => {
//         const handleScroll = () => {
//             setIsScrolled(window.scrollY > 10);
//         };
//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, []);

//     // Close drawer on escape key
//     useEffect(() => {
//         const handleEscape = (e) => {
//             if (e.key === "Escape") setDrawerOpen(false);
//         };
//         if (drawerOpen) {
//             document.addEventListener("keydown", handleEscape);
//             document.body.style.overflow = "hidden";
//         } else {
//             document.body.style.overflow = "unset";
//         }
//         return () => {
//             document.removeEventListener("keydown", handleEscape);
//             document.body.style.overflow = "unset";
//         };
//     }, [drawerOpen]);

//     const toggleDrawer = () => setDrawerOpen(!drawerOpen);
//     const closeDrawer = () => setDrawerOpen(false);

//     const handleNavigate = (link) => {
//         setCurrentPath(link);
//         if (drawerOpen) closeDrawer();
//     };

//     const renderNavItems = (isDrawer = false) =>
//         tabs.map((tab, index) => {
//             const isActive = currentPath === tab.link;
//             return (
//                 <button
//                     key={tab.name}
//                     onClick={() => handleNavigate(tab.link)}
//                     className={`
//                         group relative flex items-center gap-3 px-4 py-3 text-sm font-medium
//                         transition-all duration-300 ease-out
//                         ${isDrawer ? "w-full text-left rounded-lg mx-2" : "whitespace-nowrap rounded-md"}
//                         ${isActive
//                             ? "text-blue-600 bg-blue-50 shadow-sm"
//                             : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
//                         }
//                         hover:scale-105 hover:shadow-md active:scale-95
//                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
//                     `}
//                     style={{
//                         animationDelay: isDrawer ? `${index * 50}ms` : "0ms",
//                         animation: isDrawer && drawerOpen ? "slideInFromLeft 0.3s ease-out forwards" : "none"
//                     }}
//                 >
//                     {/* Icon with animation */}
//                     <span className={`
//                         transition-all duration-300
//                         ${isActive ? "transform rotate-12 scale-110" : "group-hover:scale-110"}
//                     `}>
//                         {tab.icon}
//                     </span>

//                     {/* Text */}
//                     <span className="relative overflow-hidden">
//                         {tab.name}
//                         {/* Animated underline for desktop */}
//                         {!isDrawer && (
//                             <span className={`
//                                 absolute bottom-0 left-0 h-0.5 bg-blue-600 
//                                 transition-all duration-300 ease-out
//                                 ${isActive ? "w-full" : "w-0 group-hover:w-full"}
//                             `} />
//                         )}
//                     </span>

//                     {/* Active indicator for drawer */}
//                     {isDrawer && isActive && (
//                         <span className="absolute right-3 w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
//                     )}
//                 </button>
//             );
//         });

//     return (
//         <>
//             {/* Top bar for mobile */}
//             <div className={`
//                 w-full flex items-center justify-between px-4 py-4 border-b bg-white/95 backdrop-blur-sm sm:hidden
//                 sticky top-0 z-30 transition-all duration-300
//                 ${isScrolled ? "shadow-lg border-gray-200" : "border-gray-100"}
//             `}>
//                 <div className="flex items-center gap-2">
//                     <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
//                         <span className="text-white font-bold text-sm">G</span>
//                     </div>
//                     <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
//                         Groweza
//                     </span>
//                 </div>

//                 <button
//                     onClick={toggleDrawer}
//                     className={`
//                         p-2 rounded-lg transition-all duration-300 ease-out
//                         ${drawerOpen ? "bg-red-50 text-red-600" : "bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-600"}
//                         hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
//                     `}
//                     aria-label={drawerOpen ? "Close menu" : "Open menu"}
//                 >
//                     <div className={`transition-transform duration-300 ${drawerOpen ? "rotate-180" : ""}`}>
//                         {drawerOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
//                     </div>
//                 </button>
//             </div>

//             {/* Horizontal navbar for desktop */}
//             <div className={`
//                 w-full px-6 py-3 border-b bg-white/95 backdrop-blur-sm hidden sm:flex
//                 sticky top-0 z-30 transition-all duration-300
//                 ${isScrolled ? "shadow-lg border-gray-200" : "border-gray-100"}
//             `}>
//                 <div className="flex items-center gap-6 w-full">
//                     {/* Logo for desktop */}
//                     <div className="flex items-center gap-3 mr-8">
//                         <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
//                             <span className="text-white font-bold">G</span>
//                         </div>
//                         <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
//                             Groweza
//                         </span>
//                     </div>

//                     {/* Navigation items */}
//                     <div className="flex items-center gap-2 flex-1 overflow-x-auto scrollbar-hide">
//                         {renderNavItems()}
//                     </div>
//                 </div>
//             </div>

//             {/* Mobile Drawer */}
//             <div className={`
//                 sm:hidden fixed top-0 left-0 w-80 max-w-[85vw] h-full bg-white z-50 shadow-2xl
//                 transform transition-transform duration-300 ease-out
//                 ${drawerOpen ? "translate-x-0" : "-translate-x-full"}
//             `}>
//                 {/* Drawer Header */}
//                 <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
//                     <div className="flex items-center gap-3">
//                         <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
//                             <span className="text-white font-bold text-sm">G</span>
//                         </div>
//                         <span className="text-lg font-semibold text-gray-800">Navigation</span>
//                     </div>
//                     <button
//                         onClick={closeDrawer}
//                         className="p-2 rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all duration-200 hover:scale-110 active:scale-95"
//                         aria-label="Close navigation"
//                     >
//                         <FaTimes size={16} />
//                     </button>
//                 </div>

//                 {/* Navigation Items */}
//                 <div className="py-4 space-y-1 max-h-[calc(100vh-80px)] overflow-y-auto">
//                     {renderNavItems(true)}
//                 </div>
//             </div>

//             {/* Background overlay */}
//             <div
//                 className={`
//                     fixed inset-0 bg-black z-40 sm:hidden transition-all duration-300
//                     ${drawerOpen ? "bg-opacity-50 backdrop-blur-sm" : "bg-opacity-0 pointer-events-none"}
//                 `}
//                 onClick={closeDrawer}
//             />

//             {/* Custom CSS for animations */}
//             <style jsx>{`
//                 @keyframes slideInFromLeft {
//                     from {
//                         opacity: 0;
//                         transform: translateX(-20px);
//                     }
//                     to {
//                         opacity: 1;
//                         transform: translateX(0);
//                     }
//                 }
                
//                 .scrollbar-hide {
//                     -ms-overflow-style: none;
//                     scrollbar-width: none;
//                 }
//                 .scrollbar-hide::-webkit-scrollbar {
//                     display: none;
//                 }
//             `}</style>
//         </>
//     );
// }


import { useLocation, useNavigate } from "react-router-dom";
import {
    FaDollarSign,
    FaUsers,
    FaCalendarAlt,
    FaCheckCircle,
    FaFileInvoice,
    FaRegFileAlt,
    FaPeopleArrows,
    FaBars,
    FaTimes,
} from "react-icons/fa";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
    { name: "Dashboard", icon: <FaDollarSign />, link: "/dashboard" },
    { name: "Clients", icon: <FaUsers />, link: "/dashboard/clients" },
    { name: "Payments", icon: <FaDollarSign />, link: "/dashboard/payments" },
    { name: "Timeline", icon: <FaCalendarAlt />, link: "/dashboard/timeline" },
    { name: "Tasks", icon: <FaCheckCircle />, link: "/dashboard/tasks" },
    { name: "Invoices", icon: <FaFileInvoice />, link: "/dashboard/invoices" },
    { name: "Proposals", icon: <FaRegFileAlt />, link: "/dashboard/proposals" },
    { name: "Meetings", icon: <FaPeopleArrows />, link: "/dashboard/meetings" },
];

export default function NavBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => setDrawerOpen(!drawerOpen);
    const closeDrawer = () => setDrawerOpen(false);

    const renderNavItems = (isDrawer = false) =>
        tabs.map((tab) => {
            const isActive = location.pathname === tab.link;
            return (
                <button
                    key={tab.name}
                    onClick={() => {
                        navigate(tab.link);
                        if (isDrawer) closeDrawer();
                    }}
                    className={`flex items-center gap-2 px-3 py-2 text-sm sm:text-base whitespace-nowrap border-b-2 
                        ${isActive ? "text-blue-600 border-blue-600" : "text-gray-600 border-transparent"} 
                        hover:text-blue-500 transition duration-200 w-full text-left`}
                >
                    {tab.icon}
                    <span>{tab.name}</span>
                </button>
            );
        });

    return (
        <>
            {/* Mobile Top Bar */}
            <div className="w-full flex items-center justify-between px-4 py-3 border-b bg-white sm:hidden">
                <span className="text-xl font-bold text-blue-600">Groweza</span>
                <button onClick={toggleDrawer} className="text-2xl text-gray-700 focus:outline-none">
                    {drawerOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Desktop Horizontal Navbar */}
            <div className="w-full gap-2 px-4 py-2 border-b bg-white hidden sm:flex">
                {renderNavItems()}
            </div>

            {/* AnimatePresence handles mounting/unmounting animations */}
            <AnimatePresence>
                {drawerOpen && (
                    <>
                        {/* Drawer */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "tween", duration: 0.3 }}
                            className="fixed top-0 left-0 w-64 h-full bg-white z-50 shadow-lg"
                        >
                            <div className="flex justify-between items-center px-4 py-3 border-b">
                                <span className="text-lg font-semibold text-blue-600">Navigation</span>
                                <button onClick={closeDrawer} className="text-xl text-gray-700">
                                    <FaTimes />
                                </button>
                            </div>
                            <div className="flex flex-col px-4 py-2 gap-2">
                                {renderNavItems(true)}
                            </div>
                        </motion.div>

                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.3 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black z-40 sm:hidden"
                            onClick={closeDrawer}
                        />
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
