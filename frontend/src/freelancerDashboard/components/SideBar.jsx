// SideBar.jsx
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    FaDollarSign, FaUsers, FaCalendarAlt, FaCheckCircle,
    FaFileInvoice, FaRegFileAlt, FaPeopleArrows, FaBars
} from "react-icons/fa";
import { motion } from "framer-motion";

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

export default function SideBar({ mobile = false, closeMobile }) {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <motion.aside
            animate={{ width: collapsed && !mobile ? "4rem" : "14rem" }}
            initial={false}
            className={`bg-white border-r shadow-sm flex flex-col transition-all duration-300
                ${mobile ? "fixed top-0 left-0 h-full z-50" : "h-full"}`}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-[8.5%]  border-b">
                {!collapsed && <span className="text-2xl font-bold text-blue-600">Groweza</span>}
                <button
                    onClick={() => {
                        if (mobile) closeMobile();
                        else setCollapsed(!collapsed);
                    }}
                    className="p-2 text-gray-600 hover:text-blue-600 transition"
                >
                    <FaBars className="cursor-pointer"/>
                </button>
            </div>

            {/* Scrollable Nav */}
            <nav className="flex-1 overflow-y-auto">
                {tabs.map((tab) => {
                    const isActive = location.pathname === tab.link;
                    return (
                        <button
                            key={tab.name}
                            onClick={() => {
                                navigate(tab.link);
                                if (mobile) closeMobile();
                            }}
                            className={`flex cursor-pointer items-center text-xl gap-3 px-4 py-5 w-full text-left transition 
                                ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
                        >
                            {tab.icon}
                            {!collapsed && <span>{tab.name}</span>}
                        </button>
                    );
                })}
            </nav>
        </motion.aside>
    );
}
