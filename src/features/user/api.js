import ApiClient from "../../shared/api/ApiClient";

export const toggleFollow = async (followerId, followingId) => {
    try {
        const response = await ApiClient.post(
            `/follows/${followerId}/following/${followingId}`
        );
        return response.data;
    } catch (error) {
        console.error(
            `Error toggling follow status for user ${followingId}:`,
            error
        );
        throw error;
    }
};

export const getFollowStatus = async (followerId, followingId) => {
    try {
        const response = await ApiClient.get(
            `/follows/${followerId}/following/${followingId}/status`
        );
        return response.data;
    } catch (error) {
        console.error(
            `Error fetching follow status for user ${followingId}:`,
            error
        );
        throw error;
    }
};

export const getFollowerCount = async (userId) => {
    try {
        const response = await ApiClient.get(
            `/follows/${userId}/followers/count`
        );
        return response.data;
    } catch (error) {
        console.error(
            `Error fetching follower count for user ${userId}:`,
            error
        );
        throw error;
    }
};

export const getFollowingCount = async (userId) => {
    try {
        const response = await ApiClient.get(
            `/follows/${userId}/following/count`
        );
        return response.data;
    } catch (error) {
        console.error(
            `Error fetching following count for user ${userId}:`,
            error
        );
        throw error;
    }
};
