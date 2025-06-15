import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const ForgotPassword = ({ switchToLogin, switchToVerifyOtp }) => {
    const handleSubmit = (values, { setSubmitting }) => {
        // Handle password reset logic here
        console.log("Password reset requested for:", values.email);
        setSubmitting(false);
        switchToVerifyOtp();
    };

    return (
        <Formik
            initialValues={{
                email: "",
            }}
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
                        className={`rounded-full px-4 py-2 text-white font-semibold w-full ${
                            isSubmitting
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-black hover:bg-gray-900"
                        }`}
                    >
                        {isSubmitting ? "Sending..." : "Send OTP"}
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
