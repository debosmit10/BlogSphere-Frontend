import React from "react";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import videoLoop from "../assets/home_bg_loop_720p.mp4";
import { Link } from "react-router";

const LandingPage = () => {
    return (
        <div className="Container flex flex-row h-dvh">
            {/* ----- Left Side ----- */}
            <div className="p-10 pr-13 flex flex-col justify-between">
                <div className="font-reservation font-bold text-4xl">
                    BLOGSPHERE
                </div>
                <nav className="">
                    <ul className="font-reservation text-8xl">
                        <li>
                            <Link to="/home">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </ul>
                </nav>
                <div className="Socials flex gap-5">
                    <a href="#twitter" className="text-4xl">
                        <FaXTwitter />
                    </a>
                    <a href="#facebook" className="text-4xl">
                        <FaFacebook />
                    </a>
                    <a href="#youtube" className="text-4xl">
                        <FaYoutube />
                    </a>
                </div>
            </div>
            {/* ----- Right Side ----- */}
            <div className="relative flex grow rounded-l-[4rem] overflow-hidden shadow-[-0.58vw_0px_20px_rgba(0,0,0,0.4)]">
                <video
                    src={videoLoop}
                    className="object-cover"
                    autoPlay
                    muted
                    loop
                ></video>
            </div>
        </div>
    );
};

export default LandingPage;
