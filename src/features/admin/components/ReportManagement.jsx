import React, { useState, useRef, useEffect } from "react";
import { PiFlag, PiArrowCircleRightLight } from "react-icons/pi";
import { BsChevronCompactUp } from "react-icons/bs";

const ReportManagement = ({ reports, setReports }) => {
    const [isReportActionOpen, setIsReportActionOpen] = useState({});
    const reportActionRefs = useRef({});

    useEffect(() => {
        const handleClickOutside = (event) => {
            Object.keys(reportActionRefs.current).forEach((reportId) => {
                if (
                    reportActionRefs.current[reportId] &&
                    !reportActionRefs.current[reportId].contains(event.target)
                ) {
                    setIsReportActionOpen((prev) => ({
                        ...prev,
                        [reportId]: false,
                    }));
                }
            });
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleReportAction = (reportId, action) => {
        setReports(
            reports.map((report) =>
                report.id === reportId ? { ...report, status: action } : report
            )
        );
        setIsReportActionOpen((prev) => ({ ...prev, [reportId]: false }));
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <PiFlag /> User Reports
            </h2>

            <div className="space-y-4">
                {reports.map((report) => (
                    <ReportItem
                        key={report.id}
                        report={report}
                        isActionOpen={isReportActionOpen[report.id]}
                        setIsActionOpen={setIsReportActionOpen}
                        ref={(el) => (reportActionRefs.current[report.id] = el)}
                        onAction={handleReportAction}
                    />
                ))}
            </div>
        </div>
    );
};

const ReportItem = ({
    report,
    isActionOpen,
    setIsActionOpen,
    ref,
    onAction,
}) => (
    <div className="border border-gray-200 rounded-lg p-4">
        <div className="flex items-start justify-between">
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                    <PiFlag className="text-red-500" />
                    <span className="font-medium text-gray-900 capitalize">
                        {report.type.replace("_", " ")}
                    </span>
                </div>
                <p className="text-gray-700 mb-1">
                    <strong>Content:</strong>{" "}
                    {report.reportedContent || report.reportedUser}
                </p>
                <p className="text-gray-700 mb-1">
                    <strong>Reported by:</strong> {report.reportedBy}
                </p>
                <p className="text-sm text-gray-500">{report.timestamp}</p>
            </div>

            {report.status === "pending" && (
                <div className="relative" ref={ref}>
                    <button
                        onClick={() =>
                            setIsActionOpen((prev) => ({
                                ...prev,
                                [report.id]: !prev[report.id],
                            }))
                        }
                        className="text-gray-600 hover:text-gray-900 transition-colors ml-4"
                    >
                        <PiArrowCircleRightLight className="text-xl" />
                    </button>

                    {isActionOpen && (
                        <div className="absolute right-0 top-8 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                            <BsChevronCompactUp className="absolute -top-2 right-4 text-gray-200" />
                            <button
                                onClick={() => onAction(report.id, "resolved")}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-green-600"
                            >
                                Mark Resolved
                            </button>
                            <button
                                onClick={() => onAction(report.id, "dismissed")}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-gray-600"
                            >
                                Dismiss
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    </div>
);

export default ReportManagement;
