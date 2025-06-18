import React, { useState, useRef, useEffect } from "react";
import Feed from "./Feed";
import FeedFollowing from "./FeedFollowing";
import FeedTopic from "./FeedTopic";
import { getAllTopics } from "../api";
import { PiArrowCircleLeft } from "react-icons/pi";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

const MiddleBar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [activeView, setActiveView] = useState("forYou");
    const [activeFeedView, setActiveFeedView] = useState("feed");
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const menuRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const fetchedTopics = await getAllTopics();
                setTopics(fetchedTopics);
            } catch (error) {
                console.error("Failed to fetch topics:", error);
            }
        };
        fetchTopics();
    }, []);

    const handleForYouClick = () => {
        setActiveView("forYou");
        setActiveFeedView("feed");
        setSelectedTopic(null);
        setMenuOpen(false);
    };

    const handleFollowingClick = () => {
        setActiveView("following");
        setActiveFeedView("following");
        setSelectedTopic(null);
        setMenuOpen(false);
    };

    const handleTopicClick = (topicName) => {
        setActiveView("forYou");
        setActiveFeedView("topic");
        setSelectedTopic(topicName);
    };

    const renderFeedComponent = () => {
        switch (activeFeedView) {
            case "forYou":
                return <Feed />;
            case "following":
                return <FeedFollowing />;
            case "topic":
                return <FeedTopic selectedTopic={selectedTopic} />;
            default:
                return <Feed />;
        }
    };

    return (
        <div className="p-7">
            <div className="relative flex flex-row items-center justify-between border-b border-neutral-200">
                <div className="flex flex-row items-center pb-5 space-x-5">
                    {/* Button to open dropdown menu */}
                    <button
                        onClick={() => setMenuOpen((prev) => !prev)}
                        className="cursor-pointer"
                    >
                        <PiArrowCircleLeft className="text-2xl" />
                    </button>
                    {/* Dropdown menu to select view */}
                    {isMenuOpen && (
                        <ul
                            ref={menuRef}
                            className="absolute top-[-0.2rem] right-235 w-fit max-h-60 overflow-y-auto scrollbar-hidden bg-white border border-neutral-200 rounded-xl shadow z-10 overflow-hidden"
                        >
                            <li
                                onClick={handleForYouClick}
                                className="dropdown-list"
                            >
                                <span>For You</span>
                            </li>
                            <li
                                onClick={handleFollowingClick}
                                className="dropdown-list"
                            >
                                <span>Following</span>
                            </li>
                        </ul>
                    )}
                    {/* Current View */}
                    <span className="font-reservation font-bold text-2xl">
                        {activeView === "forYou" ? "For You" : "Following"}
                    </span>
                </div>
                {/* Blog Topics */}
                <div className="flex flex-row items-center space-x-2 pb-5">
                    <BsChevronCompactLeft className="text-xl text-neutral-300" />
                    <div className="flex flex-row w-80 space-x-2 overflow-auto scrollbar-hidden">
                        {topics.map((topic) => (
                            <button
                                key={topic.name}
                                onClick={() => handleTopicClick(topic.name)}
                                className="whitespace-nowrap hover:underline cursor-pointer"
                            >
                                {topic.displayName}
                            </button>
                        ))}
                    </div>
                    <BsChevronCompactRight className="text-xl text-neutral-300" />
                </div>
            </div>
            {renderFeedComponent()}
        </div>
    );
};

export default MiddleBar;
