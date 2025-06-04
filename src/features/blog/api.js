import ApiClient from "../../shared/api/ApiClient";

/*
 * Toggle like status for a blog
 * @param {number} blogId - The ID of the blog to toggle like
 * @returns {Promise} - Promise with the response data
 */
export const toggleLike = async (blogId) => {
    const response = await ApiClient.post(`/blogs/${blogId}/likes`);
    return response.data;
};

/*
 * Get like status for a blog
 * @param {number} blogId - The ID of the blog to check like status
 * @returns {Promise<boolean>} - Promise with the like status
 */
export const getLikeStatus = async (blogId) => {
    const response = await ApiClient.get(`/blogs/${blogId}/likes/status`);
    return response.data;
};

/*
 * Get like count for a blog
 * @param {number} blogId - The ID of the blog to get like count
 * @returns {Promise<number>} - Promise with the like count
 */
export const getLikeCount = async (blogId) => {
    const response = await ApiClient.get(`/blogs/${blogId}/likes/count`);
    return response.data;
};

/*
 * Toggle saved status for a blog
 * @param {number} blogId - The ID of the blog to toggle saved status
 * @returns {Promise<boolean>} - Promise with the saved status (true if saved, false if unsaved)
 */
export const toggleSavedStatus = async (blogId) => {
    const response = await ApiClient.post(`/blogs/saved/${blogId}`);
    return response.data.saved;
};

/*
 * Check if a blog is saved by the current user
 * @param {number} blogId - The ID of the blog to check saved status
 * @returns {Promise<boolean>} - Promise with the saved status
 */
export const getSavedStatus = async (blogId) => {
    const response = await ApiClient.get(`/blogs/saved/${blogId}/status`);
    return response.data.saved;
};

/*
 * Get all saved blogs for the current user
 * @returns {Promise<Array>} - Promise with the list of saved blogs
 */
export const getSavedBlogs = async () => {
    const response = await ApiClient.get(`/blogs/saved`);
    return response.data;
};
