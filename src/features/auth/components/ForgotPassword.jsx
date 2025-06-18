import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ForgotPasswordSchema from "../schema/ForgotPasswordSchema";
import { forgotPassword } from "../api";
import { CgSpinner } from "react-icons/cg";

const ForgotPassword = ({ switchToLogin, switchToVerifyOtp }) => {
    const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
        try {
            const response = await forgotPassword(values.email);
            console.log(response.data);
            switchToVerifyOtp(values.email); // Pass email to verify OTP component
        } catch (error) {
            console.error("Forgot password error:", error);
            setFieldError("email", error.response?.data || "An error occurred");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={{
                email: "",
            }}
            validationSchema={ForgotPasswordSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="flex flex-col items-center p-10 gap-y-5 w-1/2">
                    <h1 className="font-reservation font-bold text-5xl self-start">
                        Reset Password.
                    </h1>
                    <div className="flex flex-col w-full">
                        <Field
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            autoComplete="email"
                            className="border border-gray-300 rounded-full px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-300"
                        />
                        <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-400 text-sm mt-1 pl-4"
                        />
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
                                <span>Sending</span>
                                <CgSpinner className="animate-spin text-xl" />
                            </>
                        ) : (
                            <span>Send OTP</span>
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={switchToLogin}
                        className="text-sm hover:underline cursor-pointer"
                    >
                        Remember your password? Login
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default ForgotPassword;
