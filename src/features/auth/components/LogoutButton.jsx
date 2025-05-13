import React from "react";
import { logoutUser } from "../api";

const LogoutButton = () => {
    return (
        <button
            onClick={logoutUser}
            className="px-4 py-2 bg-red-500 text-white rounded"
        >
            Logout
        </button>
    );
};

export default LogoutButton;
