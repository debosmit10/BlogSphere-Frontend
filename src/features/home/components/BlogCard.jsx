import React from "react";
import {
    PiThumbsUp,
    PiThumbsUpFill,
    PiChats,
    PiChatsFill,
    PiBookmarksSimple,
    PiBookmarksSimpleFill,
    PiDotsThreeBold,
} from "react-icons/pi";

const BlogCard = () => {
    return (
        <div className="py-5 flex flex-row items-center border-b border-neutral-200 space-x-5">
            {/* <-----<< Blog Info >>-----> */}
            <div className="flex flex-col space-y-2 w-7/10">
                <div className="flex flex-row items-center space-x-4">
                    <img
                        src="https://placehold.co/100"
                        alt="Profile Picture"
                        className="rounded-full object-cover size-10"
                    />
                    <span className="text-lg">Username</span>
                </div>
                <h2 className="font-roboto font-bold text-3xl">
                    Lorem ipsum dolor sit amet consectetur
                </h2>
                <p className="font-roboto">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Pariatur quo quod magni quisquam veritatis nihil a sit
                    voluptates quidem temporibus dolor, fuga molestias!
                </p>
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row items-center space-x-4">
                        <span>19h</span>
                        <button className="flex flex-row space-x-2">
                            <PiThumbsUp className="text-2xl" />
                            <span>69</span>
                        </button>
                        <button className="flex flex-row space-x-2">
                            <PiChats className="text-2xl" />
                            <span>69</span>
                        </button>
                    </div>
                    <div className="flex flex-row items-center space-x-4">
                        <button>
                            <PiBookmarksSimple className="text-2xl" />
                        </button>
                        <button>
                            <PiDotsThreeBold className="text-2xl" />
                        </button>
                    </div>
                </div>
            </div>

            {/* <-----<< Blog Image >>-----> */}
            <img
                src="https://placehold.co/1920x1080"
                alt="Blog Picture"
                className="w-3/10 rounded-xl"
            ></img>
        </div>
    );
};

export default BlogCard;
