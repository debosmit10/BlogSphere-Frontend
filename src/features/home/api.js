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
