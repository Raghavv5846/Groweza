import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TemplateSelector = () => {
    const [freelancer, setFreelancer] = useState(null);
    const [selected, setSelected] = useState("minimal");
    const navigate = useNavigate();

    const token = localStorage.getItem("authToken");
    if (!token) {   
        navigate("/login");
        return null;
    }

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/portfolio/me`, 
            {
            headers: { Authorization: `Bearer ${token}` }})
            .then((res) => setFreelancer(res.data))
            .catch((err) => console.error("Error fetching freelancer data:", err));
    }, []);

    const handleGo = () => {
        navigate("/dashboard/preview", { state: { template: selected, freelancer } });
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Choose a Template</h1>
            <div className="flex gap-4">
                <button
                    className={`p-4 border ${selected === "minimal" ? "border-blue-500" : "border-gray-300"}`}
                    onClick={() => setSelected("minimal")}
                >
                    Minimal Template
                </button>
                <button
                    className={`p-4 border ${selected === "hero" ? "border-blue-500" : "border-gray-300"}`}
                    onClick={() => setSelected("hero")}
                >
                    Hero Dark Template
                </button>
            </div>
            <button
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded"
                onClick={handleGo}
            >
                Go
            </button>
        </div>
    );
};

export default TemplateSelector;
