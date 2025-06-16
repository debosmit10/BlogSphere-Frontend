import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../shared/contexts/AuthContext";
import Login from "../components/Login";
import Registration from "../components/Registration";
import ForgotPassword from "../components/ForgotPassword";
import VerifyOtp from "../components/VerifyOtp";
import ResetPassword from "../components/ResetPassword";

const Authentication = () => {
    const [activeComponent, setActiveComponent] = useState("login");
    const [userEmail, setUserEmail] = useState("");
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Redirects to home if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/home");
        }
    }, [isAuthenticated, navigate]);

    const switchToLogin = () => setActiveComponent("login");
    const switchToRegister = () => setActiveComponent("register");
    const switchToForgotPassword = (email = "") => {
        setUserEmail(email);
        setActiveComponent("forgotPassword");
    };
    const switchToVerifyOtp = (email) => {
        setUserEmail(email);
        setActiveComponent("verifyOtp");
    };
    const switchToResetPassword = (email) => {
        setUserEmail(email);
        setActiveComponent("resetPassword");
    };

    const renderComponent = () => {
        switch (activeComponent) {
            case "login":
                return (
                    <Login
                        switchToRegister={switchToRegister}
                        switchToForgotPassword={switchToForgotPassword}
                    />
                );
            case "register":
                return <Registration switchToLogin={switchToLogin} />;
            case "forgotPassword":
                return (
                    <ForgotPassword
                        switchToLogin={switchToLogin}
                        switchToVerifyOtp={switchToVerifyOtp}
                    />
                );
            case "verifyOtp":
                return (
                    <VerifyOtp
                        switchToLogin={switchToLogin}
                        switchToResetPassword={switchToResetPassword}
                        switchToForgotPassword={switchToForgotPassword}
                        email={userEmail}
                    />
                );
            case "resetPassword":
                return (
                    <ResetPassword
                        switchToLogin={switchToLogin}
                        email={userEmail}
                    />
                );
            default:
                return (
                    <LoginComponent
                        switchToRegister={switchToRegister}
                        switchToForgotPassword={switchToForgotPassword}
                    />
                );
        }
    };

    return (
        <div className="Container font-syne flex flex-col items-center justify-center h-dvh">
            <div className="flex flex-row size-fit w-full max-w-4xl rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.12)] hover:shadow-[0_0_30px_rgba(0,0,0,0.2)] transition-shadow">
                {renderComponent()}
                <div className="Picture bg-[url(src/features/auth/assets/login-banner-1280p.jpg)] bg-cover bg-center w-1/2" />
            </div>
        </div>
    );
};

export default Authentication;
