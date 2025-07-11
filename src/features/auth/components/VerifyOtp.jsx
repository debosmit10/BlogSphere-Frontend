import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Countdown from "react-countdown";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import VerifyOtpSchema from "../schema/VerifyOtpSchema";
import { forgotPassword, verifyOtp } from "../api";
import { CgSpinner } from "react-icons/cg";

const VerifyOtp = ({
    switchToResetPassword,
    switchToLogin,
    email,
    initialCountdown = 30000, // 30 seconds in milliseconds
}) => {
    const [countdownDate, setCountdownDate] = useState(
        Date.now() + initialCountdown
    );
    const [showResend, setShowResend] = useState(false);
    const [isResending, setIsResending] = useState(false);

    // Renderer for the countdown with circular progress bar
    const renderCountdown = ({ seconds, completed }) => {
        if (completed) {
            return null; // Will be handled by the onComplete callback
        }

        const percentage = (seconds / (initialCountdown / 1000)) * 100;

        return (
            <div className="flex items-center gap-2">
                <span className="text-sm">Resend OTP in</span>
                <div className="w-6 h-6">
                    <CircularProgressbar
                        value={percentage}
                        text={`${seconds}`}
                        styles={buildStyles({
                            textSize: "60px",
                            pathTransitionDuration: 1,
                            pathColor: `rgba(0, 0, 0, ${percentage / 100})`,
                            textColor: "#000",
                            trailColor: "#d6d6d6",
                            backgroundColor: "#3e98c7",
                        })}
                    />
                </div>
            </div>
        );
    };

    const handleResendOtp = async () => {
        setIsResending(true);
        try {
            await forgotPassword(email);
            console.log("Resending OTP to:", email);
            setCountdownDate(Date.now() + initialCountdown);
            setShowResend(false);
        } catch (error) {
            console.error("Resend OTP error:", error);
            alert("Failed to resend OTP. Please try again.");
        } finally {
            setIsResending(false);
        }
    };

    const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
        try {
            const response = await verifyOtp(email, values.otp);
            console.log(response.data);
            switchToResetPassword(email);
        } catch (error) {
            console.error("Verify OTP error:", error);
            setFieldError("otp", error.response?.data || "Invalid OTP.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={{
                otp: "",
            }}
            validationSchema={VerifyOtpSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="flex flex-col items-center p-10 gap-y-5 w-1/2">
                    <h1 className="font-reservation font-bold text-5xl self-start">
                        Verify OTP.
                    </h1>
                    <p className="text-sm text-gray-600 self-start">
                        We've sent a verification code to your email.
                    </p>

                    <div className="flex flex-col w-full">
                        <Field
                            type="text"
                            name="otp"
                            placeholder="Enter OTP"
                            autoComplete="off"
                            className="border border-gray-300 rounded-full px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-300"
                        />
                        <ErrorMessage
                            name="otp"
                            component="div"
                            className="text-red-400 text-sm mt-1 pl-4"
                        />
                    </div>

                    <div className="flex flex-col items-center w-full gap-2">
                        {!showResend ? (
                            <Countdown
                                date={countdownDate}
                                renderer={renderCountdown}
                                onComplete={() => setShowResend(true)}
                            />
                        ) : (
                            <button
                                type="button"
                                onClick={handleResendOtp}
                                disabled={isResending}
                                className="text-sm hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
                            >
                                {isResending
                                    ? "Resending OTP..."
                                    : "Resend OTP"}
                            </button>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`flex flex-row justify-center space-x-2 rounded-full px-4 py-2 text-white bg-black font-semibold w-full cursor-pointer ${
                            isSubmitting ? "cursor-not-allowed" : ""
                        }`}
                    >
                        {isSubmitting ? (
                            <>
                                <span>Verifying</span>
                                <CgSpinner className="animate-spin text-xl" />
                            </>
                        ) : (
                            <span>Verify</span>
                        )}
                    </button>
                    {/* <button
                            type="button"
                            onClick={() => switchToForgotPassword(email)}
                            className="text-sm hover:underline cursor-pointer"
                        >
                            Back to Forgot Password
                    </button> */}
                    <button
                        type="button"
                        onClick={switchToLogin}
                        className="text-sm hover:underline"
                    >
                        Back to Login
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default VerifyOtp;
