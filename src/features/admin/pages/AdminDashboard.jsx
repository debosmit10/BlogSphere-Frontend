import React, { useState, useRef, useEffect } from "react";
import Header from "../../../shared/components/header";
import AnalyticsCard from "../components/AnalyticsCard";
// import CategoryManagement from "../components/CategoryManagement";
// import SiteManagement from "../components/SiteManagement";
import UserManagement from "../components/UserManagement";
// import ReportManagement from "../components/ReportManagement";
import { PiUsers, PiArticle, PiChatCircle, PiCalendar } from "react-icons/pi";
import { fetchDashboardStats, fetchAllUsers } from "../api";

const AdminDashboard = () => {
    // State for analytics data (dummy data for frontend)
    const [analytics, setAnalytics] = useState({
        totalUsers: 0,
        totalPosts: 0,
        totalComments: 0,
        postsToday: 0,
        postsThisWeek: 0,
        postsThisMonth: 0,
        postsThisYear: 0,
    });

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State for category management
    const [categories, setCategories] = useState([
        { id: 1, name: "technology", displayName: "Technology" },
        { id: 2, name: "lifestyle", displayName: "Lifestyle" },
        { id: 3, name: "travel", displayName: "Travel" },
        { id: 4, name: "food", displayName: "Food" },
        { id: 5, name: "health", displayName: "Health" },
    ]);
    const [newCategory, setNewCategory] = useState("");

    // State for reports (Dummy)
    const [reports, setReports] = useState([
        {
            id: 1,
            type: "profile_report",
            reportedUser: "Username's Profile",
            reportedBy: "Username",
            timestamp: "2024-12-06 14:30",
        },
        {
            id: 2,
            type: "blog_report",
            reportedContent: "Username's Blog ID - 7",
            reportedBy: "Username",
            timestamp: "2024-12-06 12:15",
        },
        {
            id: 3,
            type: "comment_report",
            reportedContent: "Username's Comment ID - 1",
            reportedBy: "Username",
            timestamp: "2024-12-06 09:45",
        },
    ]);

    // State for site management
    const [maintenanceMode, setMaintenanceMode] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const stats = await fetchDashboardStats();
                setAnalytics(stats);

                const usersData = await fetchAllUsers();
                setUsers(usersData);
            } catch (err) {
                console.error("Error fetching admin data:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="text-red-500 text-xl">
                    Error: {error.message}
                </div>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Reload Page
                </button>
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className="min-h-screen font-syne">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Admin Dashboard
                        </h1>
                        <p className="text-gray-600">
                            Manage your BlogSphere platform
                        </p>
                    </div>

                    {/* Analytics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <AnalyticsCard
                            icon={PiUsers}
                            title="Total Users"
                            value={analytics.totalUsers}
                            color="blue"
                        />
                        <AnalyticsCard
                            icon={PiArticle}
                            title="Total Posts"
                            value={analytics.totalPosts}
                            color="green"
                        />
                        <AnalyticsCard
                            icon={PiChatCircle}
                            title="Total Comments"
                            value={analytics.totalComments}
                            color="purple"
                        />
                        <AnalyticsCard
                            icon={PiCalendar}
                            title="Posts Today"
                            value={analytics.postsToday}
                            color="orange"
                        />
                    </div>

                    {/* Posts Analytics */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            Posts Analytics
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-blue-600">
                                    {analytics.postsToday}
                                </p>
                                <p className="text-sm text-gray-600">Today</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-green-600">
                                    {analytics.postsThisWeek}
                                </p>
                                <p className="text-sm text-gray-600">
                                    This Week
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-purple-600">
                                    {analytics.postsThisMonth}
                                </p>
                                <p className="text-sm text-gray-600">
                                    This Month
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-orange-600">
                                    {analytics.postsThisYear}
                                </p>
                                <p className="text-sm text-gray-600">
                                    This Year
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <CategoryManagement
                            categories={categories}
                            setCategories={setCategories}
                        />

                        <SiteManagement
                            maintenanceMode={maintenanceMode}
                            setMaintenanceMode={setMaintenanceMode}
                        />
                    </div>*/}

                    <UserManagement users={users} setUsers={setUsers} />

                    {/* <ReportManagement
                        reports={reports}
                        setReports={setReports}
                    /> */}
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
