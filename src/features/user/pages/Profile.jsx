import React from "react";
import Header from "../../../shared/components/header";
import ProfileContent from "../components/ProfileContent";
import ProfileInfo from "../components/ProfileInfo";

const Profile = () => {
    return (
        <>
            <Header />
            <div className="flex flex-row">
                <div className="Left-Bar w-1/5" />
                <div className="Middle-Bar h-screen w-1/2">
                    <ProfileContent />
                </div>
                <div className="Right-Bar h-screen w-3/10 border-l border-neutral-200">
                    <ProfileInfo />
                </div>
            </div>
        </>
    );
};

export default Profile;
