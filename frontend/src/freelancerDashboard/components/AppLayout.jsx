import { Navigate, Outlet, useLocation } from "react-router-dom";
import NavBar from "./Navbar";
import TopBar from "./TopBar";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";


export default function DashboardLayout() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            setLoading(false);
            return;
        }

        axios
            .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/freelancer/me`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setUser(res.data);
            })
            .catch(() => {
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return null; // Or a spinner

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const profile = user.profile;

    if (
        user.role === 'freelancer' &&
        user.hasCompleted === false &&
        location.pathname !== '/onboarding'
    ) {
        return <Navigate to="/onboarding" replace />;
    }
    return (
        <div className=" w-[90%] mx-auto flex flex-col items-center  min-h-screen">
            <div className="w-[90%] flex flex-col gap-2">
                <TopBar profile={profile} />
                <NavBar />
            </div>
            {/* Page Content Goes Here */}
            <Outlet />
        </div>
    );
}
