import React, { useState, useRef, useEffect } from "react";
import Header from "../../../shared/components/header";
import { PiPlusBold, PiArrowCircleRightLight } from "react-icons/pi";
import { BsChevronCompactUp, BsChevronCompactDown } from "react-icons/bs";

const topics = [
    "Artificial Intelligence",
    "Art",
    "Blockchain",
    "Business",
    "Cities",
    "Culture",
    "Data Science",
];

const Write = () => {
    const [coverImage, setCoverImage] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState("");
    const [isTopicOpen, setIsTopicOpen] = useState(false);
    const topicRef = useRef();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoverImage(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        const onClickOutside = (e) => {
            if (topicRef.current && !topicRef.current.contains(e.target)) {
                setIsTopicOpen(false);
            }
        };
        window.addEventListener("mousedown", onClickOutside);
        return () => window.removeEventListener("mousedown", onClickOutside);
    }, []);

    return (
        <>
            <Header />
            <div>
                <div className="min-h-screen flex flex-col items-center py-7 font-syne">
                    <form className="w-full max-w-170 space-y-8">
                        {/* 1. Cover Image Input */}
                        <div>
                            <label
                                htmlFor="cover-upload"
                                className="group relative w-full h-95 border-2 border-dashed rounded-xl border-gray-400 bg-gray-100 hover:border-black transition cursor-pointer flex items-center justify-center"
                            >
                                {coverImage ? (
                                    <img
                                        src={coverImage}
                                        alt="Cover preview"
                                        className="object-cover w-full h-full rounded-xl"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center text-gray-500 group-hover:text-black">
                                        <PiPlusBold className="text-5xl" />
                                        <span>Add cover image</span>
                                    </div>
                                )}
                                <input
                                    id="cover-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        {/* 2. Topic Select */}
                        <div className="relative" ref={topicRef}>
                            <label className="block text-sm font-medium mb-1">
                                Topic
                            </label>
                            <button
                                type="button"
                                onClick={() => setIsTopicOpen((v) => !v)}
                                className="w-full text-left border border-neutral-400 rounded-xl px-3 py-2 focus:ring flex justify-between items-center"
                            >
                                {selectedTopic || "Select a topic…"}
                                <PiArrowCircleRightLight className="text-2xl text-neutral-600" />
                            </button>

                            {isTopicOpen && (
                                <div>
                                    <BsChevronCompactUp className="absolute top-0 left-201 z-11 text-neutral-400" />
                                    <BsChevronCompactDown className="absolute top-66 left-201 z-11 text-neutral-400" />
                                    <ul className="absolute top-5 left-178 w-50 max-h-60 overflow-y-auto scrollbar-hidden bg-white border border-neutral-200 rounded-xl shadow-xl z-10 overflow-hidden">
                                        {topics.map((t) => (
                                            <li
                                                key={t}
                                                onClick={() => {
                                                    setSelectedTopic(t);
                                                    setIsTopicOpen(false);
                                                }}
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                                            >
                                                {t}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* 3. Title Input */}
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium mb-1"
                            >
                                Title
                            </label>
                            <input
                                id="title"
                                type="text"
                                placeholder="Your blog title here"
                                className="w-full text-4xl font-reservation font-bold border-b border-neutral-400 focus:outline-none placeholder-neutral-400"
                            />
                        </div>

                        {/* 4. Content Input */}
                        <div>
                            <label
                                htmlFor="content"
                                className="block text-sm font-medium mb-1"
                            >
                                Content
                            </label>
                            <textarea
                                id="content"
                                rows={12}
                                placeholder="Write your blog content here..."
                                className="w-full border border-neutral-400 rounded-xl px-3 py-2 focus:outline-none focus:ring resize-none scrollbar-hidden"
                            />
                        </div>

                        {/* Optional: Submit Button */}
                        <div className="text-right">
                            <button
                                type="submit"
                                className="px-6 py-2 font-medium border rounded-full hover:bg-black hover:text-white transition-colors duration-200"
                            >
                                Publish
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Write;
