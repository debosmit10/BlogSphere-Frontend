import React from "react";
import BlogCard from "../../home/components/BlogCard";

// "https://placehold.co/1920x1080/cccccc/FFFFFF?text=Profile Cover"

const ProfileContent = ({ blogs }) => {
    return (
        <div className="flex flex-col px-7 space-y-2">
            <img
                src={`/src/shared/assets/images/wave_background.jpg`}
                alt="Profile Cover"
                className="w-full h-64 rounded-b-xl aspect-7/2 object-cover"
                loading="lazy"
            />
            {/* <nav className="sticky top-16 py-5 flex w-full justify-center space-x-7 bg-white border-b border-neutral-200 font-reservation">
                <button className="text-neutral-600 hover:text-black transition-colors duration-200 cursor-pointer">
                    Blogs
                </button>
                <button className="text-neutral-600 hover:text-black transition-colors duration-200 cursor-pointer">
                    About
                </button>
                <button className="text-neutral-600 hover:text-black transition-colors duration-200 cursor-pointer">
                    Drafts
                </button>
            </nav> */}
            {blogs.length === 0 ? (
                <p className="text-gray-600">No blogs posted yet.</p>
            ) : (
                <div>
                    {blogs.map((blog) => (
                        <BlogCard key={blog.id} blog={blog} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProfileContent;
