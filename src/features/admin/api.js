import ApiClient from "../../shared/api/ApiClient";

export const fetchDashboardStats = async () => {
    try {
        const response = await ApiClient.get("/admin/dashboard-stats");
        return response.data;
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        throw error;
    }
};

export const fetchAllUsers = async () => {
    try {
        const response = await ApiClient.get("/admin/users");
        return response.data;
    } catch (error) {
        console.error("Error fetching all users:", error);
        throw error;
    }
};

export const deleteUser = async (userId) => {
    try {
        await ApiClient.delete(`/admin/users/${userId}`);
        return true;
    } catch (error) {
        console.error(`Error deleting user ${userId}:`, error);
        throw error;
    }
};

export const updateUserRole = async (userId, newRole) => {
    try {
        const response = await ApiClient.put(
            `/admin/users/${userId}/role?newRole=${newRole}`
        );
        return response.data;
    } catch (error) {
        console.error(`Error updating user role for user ${userId}:`, error);
        throw error;
    }
};
