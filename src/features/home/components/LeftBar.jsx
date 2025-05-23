import React from "react";
import {
    PiSquareSplitVertical,
    PiNotePencil,
    PiNote,
    PiBookmarksSimple,
    PiClockCounterClockwise,
} from "react-icons/pi";
import { LeftbarButton } from "../../../shared/components/Buttons";
import ContinueReadingCard from "./ContinueReadingCard";

const LeftBar = () => {
    return (
        <div className="p-5 sticky top-16">
            <ul className="pb-5 border-b border-neutral-200 ">
                <li>
                    <LeftbarButton icon={PiSquareSplitVertical} label="Feed" />
                </li>
                <li>
                    <LeftbarButton icon={PiNotePencil} label="Write" />
                </li>
                <li>
                    <LeftbarButton icon={PiNote} label="Drafts" />
                </li>
                <li>
                    <LeftbarButton icon={PiBookmarksSimple} label="Saved" />
                </li>
            </ul>
            <div className="flex px-3 pt-7 pb-3 items-center space-x-2 text-xl">
                <PiClockCounterClockwise />
                <span>Continue Reading</span>
            </div>
            <div className="">
                {/* All the continue reading cards will apprear here */}
                <ContinueReadingCard />
                <ContinueReadingCard />
                <ContinueReadingCard />
            </div>
        </div>
    );
};

export default LeftBar;
