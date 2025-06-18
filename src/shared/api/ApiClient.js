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

// --- Comment API Functions ---

export const getCommentsByBlogId = async (blogId) => {
    try {
        const response = await ApiClient.get(`/comments/blogs/${blogId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching comments for blog ${blogId}:`, error);
        throw error;
    }
};

export const postComment = async (blogId, userId, content) => {
    try {
        const response = await ApiClient.post(
            `/comments/blogs/${blogId}/users/${userId}`,
            content,
            {
                headers: {
                    "Content-Type": "text/plain",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(`Error posting comment for blog ${blogId}:`, error);
        throw error;
    }
};

export const toggleCommentLike = async (commentId, userId) => {
    try {
        const response = await ApiClient.post(
            `/comment-likes/${commentId}/users/${userId}`
        );
        return response.data; // Returns boolean: true if liked, false if unliked
    } catch (error) {
        console.error(`Error toggling like for comment ${commentId}:`, error);
        throw error;
    }
};

export const getCommentLikeCount = async (commentId) => {
    try {
        const response = await ApiClient.get(
            `/comment-likes/${commentId}/count`
        );
        return response.data; // Returns the like count
    } catch (error) {
        console.error(
            `Error fetching like count for comment ${commentId}:`,
            error
        );
        throw error;
    }
};

export const getCommentLikeStatus = async (commentId, userId) => {
    try {
        const response = await ApiClient.get(
            `/comment-likes/${commentId}/status/users/${userId}`
        );
        return response.data; // Returns boolean: true if liked by current user, false otherwise
    } catch (error) {
        console.error(
            `Error fetching like status for comment ${commentId}:`,
            error
        );
        throw error;
    }
};

// --- End Comment API Functions ---

export default ApiClient;
