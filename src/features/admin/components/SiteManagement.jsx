import React from "react";
import { PiToggleLeft, PiToggleRight } from "react-icons/pi";

const SiteManagement = ({ maintenanceMode, setMaintenanceMode }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
            Site Management
        </h2>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
                <h3 className="font-medium text-gray-900">Maintenance Mode</h3>
                <p className="text-sm text-gray-600">
                    {maintenanceMode
                        ? "Site is currently in maintenance mode"
                        : "Site is live and accessible"}
                </p>
            </div>
            <button
                onClick={() => setMaintenanceMode(!maintenanceMode)}
                className={`text-3xl transition-colors ${
                    maintenanceMode
                        ? "text-red-600 hover:text-red-700"
                        : "text-gray-400 hover:text-gray-600"
                }`}
            >
                {maintenanceMode ? <PiToggleRight /> : <PiToggleLeft />}
            </button>
        </div>
    </div>
);

export default SiteManagement;
