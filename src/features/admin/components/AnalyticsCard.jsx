import React from "react";

const AnalyticsCard = ({
    icon: Icon,
    title,
    value,
    subtitle,
    color = "blue",
}) => (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-600">{title}</p>
                <p className={`text-3xl font-bold text-${color}-600`}>
                    {value.toLocaleString()}
                </p>
                {subtitle && (
                    <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
                )}
            </div>
            <div className={`p-3 rounded-full bg-${color}-100`}>
                <Icon className={`text-2xl text-${color}-600`} />
            </div>
        </div>
    </div>
);

export default AnalyticsCard;
