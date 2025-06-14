import ApiClient from "../../shared/api/ApiClient";

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
