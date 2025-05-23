import React from "react";
import Feed from "./Feed";

const MiddleBar = () => {
    return (
        <div className="p-7">
            <div className=" pb-5 border-b border-neutral-200">
                <h1 className="font-reservation font-bold text-2xl">For you</h1>
            </div>
            <div>
                <Feed />
            </div>
        </div>
    );
};

export default MiddleBar;
