import React from "react";
import TopPicks from "./TopPicks";

const RightBar = () => {
    return (
        <div className="sticky top-16 p-7 space-y-5">
            <h1 className="font-reservation font-bold text-2xl">Top Picks</h1>
            <TopPicks />
        </div>
    );
};

export default RightBar;
