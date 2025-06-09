import React from "react";
import TopPickCard from "./TopPickCard";

const TopPicks = () => {
    return (
        <div className="space-y-7">
            {/* All the top picks will apprear here */}
            <TopPickCard />
            <TopPickCard />
            <TopPickCard />
        </div>
    );
};

export default TopPicks;
