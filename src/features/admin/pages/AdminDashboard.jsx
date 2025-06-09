import React, { useState, useRef, useEffect } from "react";
import Header from "../../../shared/components/header";
import {
    PiUsers,
    PiArticle,
    PiChatCircle,
    PiCalendar,
    PiPlus,
    PiTrash,
    PiUserCheck,
    PiCrown,
    PiUser,
    PiWarning,
    PiToggleLeft,
    PiToggleRight,
    PiArrowCircleRightLight,
    PiBell,
    PiFlag,
} from "react-icons/pi";
import { BsChevronCompactUp, BsChevronCompactDown } from "react-icons/bs";
import {
    fetchDashboardStats,
    fetchAllUsers,
    deleteUser,
    updateUserRole,
} from "../api";

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

    // State for report/reports (Dummy)
    const [report, setReport] = useState([
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

    // Dropdown states
    const [isUserActionOpen, setIsUserActionOpen] = useState({});
    const [isreportActionOpen, setIsreportActionOpen] = useState({});
    const userActionRefs = useRef({});
    const reportActionRefs = useRef({});

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

    // Handle click outside for dropdowns
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check user action dropdowns
            Object.keys(userActionRefs.current).forEach((userId) => {
                if (
                    userActionRefs.current[userId] &&
                    !userActionRefs.current[userId].contains(event.target)
                ) {
                    setIsUserActionOpen((prev) => ({
                        ...prev,
                        [userId]: false,
                    }));
                }
            });

            // Check report action dropdowns
            Object.keys(reportActionRefs.current).forEach((reportId) => {
                if (
                    reportActionRefs.current[reportId] &&
                    !reportActionRefs.current[reportId].contains(event.target)
                ) {
                    setIsreportActionOpen((prev) => ({
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

    // Analytics Card Component
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

    // Category management functions
    const handleAddCategory = () => {
        if (newCategory.trim()) {
            const categoryName = newCategory.toLowerCase().replace(/\s+/g, "_");
            const newCat = {
                id: Date.now(),
                name: categoryName,
                displayName: newCategory.trim(),
            };
            setCategories([...categories, newCat]);
            setNewCategory("");
        }
    };

    const handleRemoveCategory = (categoryId) => {
        setCategories(categories.filter((cat) => cat.id !== categoryId));
    };

    // User management functions
    const handleDeleteUser = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await deleteUser(userId);
                setUsers(users.filter((user) => user.id !== userId));
            } catch (err) {
                console.error("Error deleting user:", err);
                alert("Failed to delete user.");
            }
        }
    };

    const handleUpdateUserRole = async (userId, newRole) => {
        try {
            const updatedUser = await updateUserRole(userId, newRole);
            setUsers(
                users.map((user) => (user.id === userId ? updatedUser : user))
            );
            setIsUserActionOpen((prev) => ({ ...prev, [userId]: false }));
        } catch (err) {
            console.error("Error updating user role:", err);
            alert("Failed to update user role.");
        }
    };

    // report management functions
    const handlereportAction = (reportId, action) => {
        setReport(
            report.map((report) => {
                if (report.id === reportId) {
                    return { ...report, status: action };
                }
                return report;
            })
        );
        setIsreportActionOpen((prev) => ({
            ...prev,
            [reportId]: false,
        }));
    };

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
            <div className="min-h-screen bg-gray-50 font-syne">
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Category Management */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                Blog Categories
                            </h2>

                            {/* Add Category */}
                            <div className="flex gap-2 mb-4">
                                <input
                                    type="text"
                                    value={newCategory}
                                    onChange={(e) =>
                                        setNewCategory(e.target.value)
                                    }
                                    placeholder="Enter new category name"
                                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    onKeyPress={(e) =>
                                        e.key === "Enter" && handleAddCategory()
                                    }
                                />
                                <button
                                    onClick={handleAddCategory}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                                >
                                    <PiPlus /> Add
                                </button>
                            </div>

                            {/* Categories List */}
                            <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-hidden">
                                {categories.map((category) => (
                                    <div
                                        key={category.id}
                                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                    >
                                        <span className="font-medium text-gray-900">
                                            {category.displayName}
                                        </span>
                                        <button
                                            onClick={() =>
                                                handleRemoveCategory(
                                                    category.id
                                                )
                                            }
                                            className="text-red-600 hover:text-red-800 transition-colors"
                                        >
                                            <PiTrash className="text-lg" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Site Management */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                Site Management
                            </h2>

                            {/* Maintenance Mode Toggle */}
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <h3 className="font-medium text-gray-900">
                                        Maintenance Mode
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {maintenanceMode
                                            ? "Site is currently in maintenance mode"
                                            : "Site is live and accessible"}
                                    </p>
                                </div>
                                <button
                                    onClick={() =>
                                        setMaintenanceMode(!maintenanceMode)
                                    }
                                    className={`text-3xl transition-colors ${
                                        maintenanceMode
                                            ? "text-red-600 hover:text-red-700"
                                            : "text-gray-400 hover:text-gray-600"
                                    }`}
                                >
                                    {maintenanceMode ? (
                                        <PiToggleRight />
                                    ) : (
                                        <PiToggleLeft />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* User Management */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mt-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            User Management
                        </h2>

                        <div className="overflow-x-auto scrollbar-hidden">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                                            User
                                        </th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                                            Email
                                        </th>
                                        {/* <th className="text-left py-3 px-4 font-medium text-gray-900">
                                            Join Date
                                        </th> */}
                                        {/* <th className="text-left py-3 px-4 font-medium text-gray-900">
                                            Posts
                                        </th> */}
                                        {/* <th className="text-left py-3 px-4 font-medium text-gray-900">
                                            Comments
                                        </th> */}
                                        {/* <th className="text-left py-3 px-4 font-medium text-gray-900">
                                            Status
                                        </th> */}
                                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                                            Role
                                        </th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="border-b border-gray-100 hover:bg-gray-50"
                                        >
                                            <td className="py-3 px-4 font-medium text-gray-900">
                                                {user.username}
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">
                                                {user.email}
                                            </td>
                                            {/* <td className="py-3 px-4 text-gray-600">
                                                {user.joinDate}
                                            </td> */}
                                            {/* <td className="py-3 px-4 text-gray-600">
                                                {user.postsCount}
                                            </td> */}
                                            {/* <td className="py-3 px-4 text-gray-600">
                                                {user.commentsCount}
                                            </td> */}
                                            {/* <td className="py-3 px-4">
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                        user.status === "active"
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-red-100 text-red-800"
                                                    }`}
                                                >
                                                    {user.status}
                                                </span>
                                            </td> */}
                                            <td className="py-3 px-4">
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                        user.role ===
                                                        "ROLE_ADMIN"
                                                            ? "bg-purple-100 text-purple-800"
                                                            : "bg-gray-100 text-gray-800"
                                                    }`}
                                                >
                                                    {user.role === "ROLE_ADMIN"
                                                        ? "Admin"
                                                        : "User"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="relative inline-block text-left">
                                                    <button
                                                        onClick={() =>
                                                            setIsUserActionOpen(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    [user.id]:
                                                                        !prev[
                                                                            user
                                                                                .id
                                                                        ],
                                                                })
                                                            )
                                                        }
                                                        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                    >
                                                        Actions
                                                        {isUserActionOpen[
                                                            user.id
                                                        ] ? (
                                                            <BsChevronCompactUp className="-mr-1 ml-2 h-5 w-5" />
                                                        ) : (
                                                            <BsChevronCompactDown className="-mr-1 ml-2 h-5 w-5" />
                                                        )}
                                                    </button>
                                                    {isUserActionOpen[
                                                        user.id
                                                    ] && (
                                                        <div
                                                            ref={(el) =>
                                                                (userActionRefs.current[
                                                                    user.id
                                                                ] = el)
                                                            }
                                                            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                                                        >
                                                            <div className="py-1">
                                                                <button
                                                                    onClick={() =>
                                                                        handleDeleteUser(
                                                                            user.id
                                                                        )
                                                                    }
                                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                                >
                                                                    <PiTrash className="mr-2" />
                                                                    Delete User
                                                                </button>
                                                                {user.role ===
                                                                "ROLE_USER" ? (
                                                                    <button
                                                                        onClick={() =>
                                                                            handleUpdateUserRole(
                                                                                user.id,
                                                                                "ROLE_ADMIN"
                                                                            )
                                                                        }
                                                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                                    >
                                                                        <PiCrown className="mr-2" />
                                                                        Make
                                                                        Admin
                                                                    </button>
                                                                ) : (
                                                                    <button
                                                                        onClick={() =>
                                                                            handleUpdateUserRole(
                                                                                user.id,
                                                                                "ROLE_ADMINUSER"
                                                                            )
                                                                        }
                                                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                                    >
                                                                        <PiUser className="mr-2" />
                                                                        Remove
                                                                        Admin
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* report/Reports */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mt-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <PiBell /> User Reports
                        </h2>

                        <div className="space-y-4">
                            {report.map((report) => (
                                <div
                                    key={report.id}
                                    className="border border-gray-200 rounded-lg p-4"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <PiFlag className="text-red-500" />
                                                <span className="font-medium text-gray-900 capitalize">
                                                    {report.type.replace(
                                                        "_",
                                                        " "
                                                    )}
                                                </span>
                                            </div>
                                            <p className="text-gray-700 mb-1">
                                                <strong>Content:</strong>{" "}
                                                {report.reportedContent ||
                                                    report.reportedUser}
                                            </p>
                                            <p className="text-gray-700 mb-1">
                                                <strong>Reported by:</strong>{" "}
                                                {report.reportedBy}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                {report.timestamp}
                                            </p>
                                        </div>

                                        {report.status === "pending" && (
                                            <div
                                                className="relative"
                                                ref={(el) =>
                                                    (reportActionRefs.current[
                                                        report.id
                                                    ] = el)
                                                }
                                            >
                                                <button
                                                    onClick={() =>
                                                        setIsreportActionOpen(
                                                            (prev) => ({
                                                                ...prev,
                                                                [report.id]:
                                                                    !prev[
                                                                        report
                                                                            .id
                                                                    ],
                                                            })
                                                        )
                                                    }
                                                    className="text-gray-600 hover:text-gray-900 transition-colors ml-4"
                                                >
                                                    <PiArrowCircleRightLight className="text-xl" />
                                                </button>

                                                {isreportActionOpen[
                                                    report.id
                                                ] && (
                                                    <div className="absolute right-0 top-8 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                                        <BsChevronCompactUp className="absolute -top-2 right-4 text-gray-200" />

                                                        <button
                                                            onClick={() =>
                                                                handlereportAction(
                                                                    report.id,
                                                                    "resolved"
                                                                )
                                                            }
                                                            className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-green-600"
                                                        >
                                                            Mark Resolved
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handlereportAction(
                                                                    report.id,
                                                                    "dismissed"
                                                                )
                                                            }
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
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
