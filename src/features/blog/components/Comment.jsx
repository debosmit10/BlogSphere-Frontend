import React from "react";
import { Link } from "react-router";
import {
    PiThumbsUp,
    PiThumbsUpFill,
    PiChats,
    PiChatsFill,
    PiDotsThreeBold,
} from "react-icons/pi";

const Comment = () => {
    return (
        <div className="mt-5 pb-5 space-y-3 border-b border-neutral-200">
            <div className="flex flex-row items-center space-x-3">
                <Link to={`#user`}>
                    <img
                        src="https://placehold.co/100"
                        alt="Profile Picture"
                        className="rounded-full object-cover size-10"
                    />
                </Link>
                <Link to={`#user`}>Username</Link>
            </div>
            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum
                illum cumque suscipit qui tempora unde maiores debitis? Dolores,
                a deleniti.
            </p>
            <div className="flex flex-row justify-between">
                <div className="flex flex-row  space-x-3">
                    <button className="flex flex-row space-x-2">
                        <PiThumbsUp className="text-2xl" />
                        <span>0</span>
                    </button>
                    <button className="flex flex-row space-x-2">
                        <PiChats className="text-2xl" />
                        <span>0</span>
                    </button>
                </div>
                <button>
                    <PiDotsThreeBold className="text-2xl" />
                </button>
            </div>
        </div>
    );
};

export default Comment;
