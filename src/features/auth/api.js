import ApiClient from "../../shared/api/ApiClient";
import Cookies from "js-cookie";

export const registerUser = async (userData) => {
    try {
        const response = await ApiClient.post("/auth/register", userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await ApiClient.post("/auth/login", credentials);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const logoutUser = () => {
    Cookies.remove("token");
    // Redirect to login page
    window.location.href = "/login";
};
