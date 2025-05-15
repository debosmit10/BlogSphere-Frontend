import React from "react";
import TopPickCard from "./TopPickCard";

const RightBar = () => {
    return (
        <div className="sticky top-16 p-7 space-y-5">
            <h1 className="font-reservation font-bold text-2xl">Top Picks</h1>
            <div className="space-y-7">
                {/* All the top picks will apprear here */}
                <TopPickCard />
                <TopPickCard />
                <TopPickCard />
            </div>
        </div>
    );
};

export default RightBar;
