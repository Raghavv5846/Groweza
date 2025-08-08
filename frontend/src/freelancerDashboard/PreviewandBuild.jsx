import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { MinimalPortfolio } from "./websiteTemplates/Minimal";
import { HeroDark } from "./websiteTemplates/Dark";


const PreviewAndBuild = () => {
    const { state } = useLocation();
    const { template, freelancer } = state || {};
    const [isBuilding, setIsBuilding] = useState(false);

    const handleBuild = async () => {
        try {
            setIsBuilding(true);
            const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/portfolio/build-site`, { template, data: freelancer });
            const url = res.data.url;
            window.open(url, "_blank");
        } catch (err) {
            console.error("Build failed:", err);
        } finally {
            setIsBuilding(false);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Preview Your Portfolio</h1>
            <div className="border rounded shadow mb-6">
                {template === "minimal" && <MinimalPortfolio data={freelancer} />}
                {template === "hero" && <HeroDark data={freelancer} />}
            </div>
            <button
                onClick={handleBuild}
                className="px-6 py-2 bg-green-600 text-white rounded"
                disabled={isBuilding}
            >
                {isBuilding ? "Building..." : "Build Portfolio"}
            </button>
        </div>
    );
};

export default PreviewAndBuild;
