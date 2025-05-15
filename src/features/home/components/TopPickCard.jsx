import React from "react";

const TopPickCard = () => {
    return (
        <div className="flex flex-row w-100 rounded-2xl items-center space-x-3">
            <img
                src="https://placehold.co/1920x1080"
                alt="Blog Picture"
                className="h-20 rounded-xl"
            />
            <div className="flex flex-col justify-center space-y-1">
                <div className="flex flex-row space-x-3 items-center">
                    <img
                        src="https://placehold.co/100"
                        alt="Profile Picture"
                        className="rounded-full object-cover size-8"
                    />
                    <span className="font-semibold">Username</span>
                    <span>19h</span>
                </div>
                <h3 className="font-roboto">
                    Lorem ipsum dolor sit amet consectetur
                </h3>
            </div>
        </div>
    );
};

export default TopPickCard;
