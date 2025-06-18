import React from "react";
import {
    PiSquareSplitVertical,
    PiNotePencil,
    PiNote,
    PiBookmarksSimple,
    PiClockCounterClockwise,
} from "react-icons/pi";
import { LeftbarButton } from "../../../shared/components/Buttons";
import ContinueReading from "./ContinueReading";
import { Link } from "react-router";

const LeftBar = ({ activeView, setActiveView }) => {
    const handleFeedClick = () => {
        setActiveView("feed");
    };

    const handleSavedClick = () => {
        setActiveView("saved");
    };

    return (
        <div className="p-5 sticky top-16">
            <ul className="pb-5 border-b border-neutral-200 ">
                <li>
                    <Link>
                        <LeftbarButton
                            icon={PiSquareSplitVertical}
                            label="Feed"
                            onClick={handleFeedClick}
                        />
                    </Link>
                </li>
                <li>
                    <Link
                        to={`/write`}
                        className="flex px-3 py-2 items-center space-x-2 rounded-full w-fit hover:bg-gray-100 transition-colors duration-200"
                    >
                        <PiNotePencil className="text-2xl" />
                        <span className="text-xl ">Write</span>
                    </Link>
                </li>
                {/* <li>
                    <LeftbarButton icon={PiNote} label="Drafts" />
                </li> */}
                <li>
                    <LeftbarButton
                        icon={PiBookmarksSimple}
                        label="Saved"
                        onClick={handleSavedClick}
                    />
                </li>
            </ul>
            <div className="flex px-3 pt-7 pb-3 items-center space-x-2 text-xl">
                <PiClockCounterClockwise />
                <span>Continue Reading</span>
            </div>
            <ContinueReading />
        </div>
    );
};

export default LeftBar;
