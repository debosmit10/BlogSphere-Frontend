import ApiClient from "../../shared/api/ApiClient";

export const fetchAllBlogs = async () => {
    try {
        const response = await ApiClient.get("/blogs");
        return response.data;
    } catch (error) {
        console.error("Error fetching blogs:", error);
        throw error;
    }
};

export const fetchBlogsByTopic = async (topic) => {
    try {
        console.log("API function topic : ", topic);
        const response = await ApiClient.get(`/blogs/topic/${topic}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching blogs by topic:", error);
        throw error;
    }
};

export const fetchUserBlogs = async () => {
    try {
        const response = await ApiClient.get("/blogs/my-blogs");
        return response.data;
    } catch (error) {
        console.error("Error fetching user blogs:", error);
        throw error;
    }
};

// Add other blog-related API calls here
export const createBlog = async (blogData) => {
    try {
        const response = await ApiClient.post("/blogs", blogData);
        return response.data;
    } catch (error) {
        console.error("Error creating blog:", error);
        throw error;
    }
};

export const fetchBlogsFromFollowedUsers = async () => {
    try {
        const response = await ApiClient.get("/blogs/following");
        return response.data;
    } catch (error) {
        console.error("Error fetching blogs from followed users:", error);
        throw error;
    }
};

export const fetchTopLikedBlogsOfWeek = async () => {
    try {
        const response = await ApiClient.get("/blogs/top-liked-weekly");
        return response.data;
    } catch (error) {
        console.error("Error fetching top liked blogs of the week:", error);
        throw error;
    }
};

export const fetchRecentlyVisitedBlogs = async () => {
    try {
        const response = await ApiClient.get("/blogs/recently-visited");
        return response.data;
    } catch (error) {
        console.error("Error fetching recently visited blogs:", error);
        throw error;
    }
};

export const deleteBlog = async (blogId) => {
    try {
        const response = await ApiClient.delete(`/blogs/${blogId}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting blog ${blogId}:`, error);
        throw error;
    }
};

export const getAllTopics = async () => {
    try {
        const response = await ApiClient.get("/blogs/topics");
        return response.data;
    } catch (error) {
        console.error("Error fetching topics:", error);
        throw error;
    }
};
