import React from "react";
import { logoutUser } from "../api";

const LogoutButton = () => {
    return (
        <button
            onClick={logoutUser}
            className="px-3 py-2 bg-red-500 text-white rounded-full"
        >
            Logout
        </button>
    );
};

export default LogoutButton;
