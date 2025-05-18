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

export default ApiClient;
