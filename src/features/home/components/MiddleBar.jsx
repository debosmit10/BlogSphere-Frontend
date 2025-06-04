import React from "react";
import Feed from "./Feed";

const MiddleBar = () => {
    return (
        <div className="p-7">
            <h1 className="pb-5 font-reservation font-bold text-2xl border-b border-neutral-200">
                For you
            </h1>
            <Feed />
        </div>
    );
};

export default MiddleBar;
