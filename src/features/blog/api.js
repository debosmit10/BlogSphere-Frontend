import ApiClient from "../../shared/api/ApiClient";

export const getBlogById = async (blogId) => {
    try {
        const response = await ApiClient.get(`/blogs/${blogId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching blog by ID:", error);
        throw error;
    }
};

export const updateBlog = async (blogId, blogData) => {
    try {
        const response = await ApiClient.put(`/blogs/${blogId}`, blogData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating blog:", error);
        throw error;
    }
};

// Toggle like status for a blog
export const toggleLike = async (blogId) => {
    const response = await ApiClient.post(`/blogs/${blogId}/likes`);
    return response.data;
};

// Get like status for a blog
export const getLikeStatus = async (blogId) => {
    const response = await ApiClient.get(`/blogs/${blogId}/likes/status`);
    return response.data;
};

// Get like count for a blog
export const getLikeCount = async (blogId) => {
    const response = await ApiClient.get(`/blogs/${blogId}/likes/count`);
    return response.data;
};

// Toggle saved status for a blog
export const toggleSavedStatus = async (blogId) => {
    const response = await ApiClient.post(`/blogs/saved/${blogId}`);
    return response.data.saved;
};

// Check if a blog is saved by the current user
export const getSavedStatus = async (blogId) => {
    const response = await ApiClient.get(`/blogs/saved/${blogId}/status`);
    return response.data.saved;
};

// Get all saved blogs for the current user
export const getSavedBlogs = async () => {
    const response = await ApiClient.get(`/blogs/saved`);
    return response.data;
};

// Enhance text with AI
export const enhanceTextWithAI = async (text) => {
    try {
        const response = await ApiClient.post("/ai/enhance-text", { text });
        return response.data;
    } catch (error) {
        console.error("Error enhancing text with AI:", error);
        throw error;
    }
};
