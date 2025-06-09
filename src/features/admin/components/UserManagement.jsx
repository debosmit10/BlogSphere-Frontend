import React, { useState, useRef, useEffect } from "react";
import { PiTrash, PiCrown, PiUser } from "react-icons/pi";
import { BsChevronCompactUp, BsChevronCompactDown } from "react-icons/bs";
import { deleteUser, updateUserRole } from "../api";

const UserManagement = ({ users, setUsers }) => {
    const [isUserActionOpen, setIsUserActionOpen] = useState({});
    const userActionRefs = useRef({});

    useEffect(() => {
        const handleClickOutside = (event) => {
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
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleDeleteUser = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await deleteUser(userId);
                setUsers(users.filter((user) => user.id !== userId));
            } catch (err) {
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
            alert("Failed to update user role.");
        }
    };

    return (
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
                                <td className="py-3 px-4">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            user.role === "ROLE_ADMIN"
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
                                    <UserActionsDropdown
                                        user={user}
                                        isOpen={isUserActionOpen[user.id]}
                                        setIsOpen={setIsUserActionOpen}
                                        ref={(el) =>
                                            (userActionRefs.current[user.id] =
                                                el)
                                        }
                                        onDelete={handleDeleteUser}
                                        onRoleChange={handleUpdateUserRole}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const UserActionsDropdown = ({
    user,
    isOpen,
    setIsOpen,
    ref,
    onDelete,
    onRoleChange,
}) => (
    <div className="relative inline-block text-left" ref={ref}>
        <button
            onClick={() =>
                setIsOpen((prev) => ({ ...prev, [user.id]: !prev[user.id] }))
            }
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            Actions
            {isOpen ? (
                <BsChevronCompactUp className="-mr-1 ml-2 h-5 w-5" />
            ) : (
                <BsChevronCompactDown className="-mr-1 ml-2 h-5 w-5" />
            )}
        </button>

        {isOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <div className="py-1">
                    <button
                        onClick={() => onDelete(user.id)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                        <PiTrash className="mr-2" />
                        Delete User
                    </button>
                    {user.role === "ROLE_USER" ? (
                        <button
                            onClick={() => onRoleChange(user.id, "ROLE_ADMIN")}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                            <PiCrown className="mr-2" />
                            Make Admin
                        </button>
                    ) : (
                        <button
                            onClick={() => onRoleChange(user.id, "ROLE_USER")}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                            <PiUser className="mr-2" />
                            Remove Admin
                        </button>
                    )}
                </div>
            </div>
        )}
    </div>
);

export default UserManagement;
