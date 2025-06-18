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

export const forgotPassword = async (email) => {
    try {
        const response = await ApiClient.post("/v1/auth/forgot-password", {
            email,
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const verifyOtp = async (email, otp) => {
    try {
        const response = await ApiClient.post("/v1/auth/verify-otp", {
            email,
            otp,
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const resetPassword = async (email, newPassword, confirmPassword) => {
    try {
        const response = await ApiClient.post("/v1/auth/reset-password", {
            email,
            newPassword,
            confirmPassword,
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
