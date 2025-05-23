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
