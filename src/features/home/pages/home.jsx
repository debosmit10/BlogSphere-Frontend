import React, { useState } from "react";
import Header from "../../../shared/components/header";
import LeftBar from "../components/LeftBar";
import MiddleBar from "../components/MiddleBar";
import RightBar from "../components/RightBar";
import Saved from "../components/Saved";

const home = () => {
    // State to manage the active view: 'feed' or 'saved'
    const [activeView, setActiveView] = useState("feed");

    return (
        <div className="font-syne font-normal">
            <Header />
            <div className="flex flex-row">
                <div className="Left-bar w-1/5 border-r border-neutral-200">
                    <LeftBar
                        activeView={activeView}
                        setActiveView={setActiveView}
                    />
                </div>
                <div className="Middle-bar w-1/2">
                    {activeView === "feed" ? <MiddleBar /> : <Saved />}
                </div>
                <div className="Right-bar w-3/10 border-l border-neutral-200">
                    <RightBar />
                </div>
            </div>
        </div>
    );
};

export default home;
