import React from "react";

const ContinueReadingCard = () => {
    return (
        <div className="px-3 py-2 flex flex-row items-center space-x-3 rounded-2xl hover:bg-gray-100 duration-200">
            <img
                src="https://placehold.co/100"
                alt="Profile Picture"
                className="rounded-full object-cover size-8"
            />
            <h3 className="font-roboto">Lorem ipsum dolor sit amet consecte</h3>
        </div>
    );
};

export default ContinueReadingCard;
