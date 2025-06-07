import axios from "axios";
import Cookies from "js-cookie";

// Base API URL (from Spring backend)
const API_BASE_URL = "http://localhost:8080/api";

// Axios instance
const ApiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // Required for cookies/JWT
});

export const getFileUrl = (type, filename) => {
    return `${API_BASE_URL}/files/${type}/${filename}`;
};

// Request interceptor
ApiClient.interceptors.request.use((config) => {
    const token = Cookies.get("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    if (!(config.data instanceof FormData)) {
        config.headers["Content-Type"] = "application/json";
    }
    return config;
});

// Response interceptor
ApiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired? Redirect to login
            Cookies.remove("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export const getUserProfile = async (userId) => {
    try {
        const response = await ApiClient.get(`/users/${userId}/profile`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
    }
};

export default ApiClient;
