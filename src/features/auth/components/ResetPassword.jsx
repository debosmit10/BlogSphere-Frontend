import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const ResetPassword = ({ switchToLogin }) => {
    const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
        try {
            //await...
            switchToLogin(); // Switch to login after successful password reset
        } catch (error) {
            setFieldError(
                "newPassword",
                error.message || "Password reset failed"
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={{
                newPassword: "",
                confirmNewPassword: "",
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
                            type="password"
                            name="newPassword"
                            placeholder="New Password"
                            autoComplete="new-password"
                            className="border border-gray-300 rounded-full px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-300"
                        />
                        <ErrorMessage
                            name="newPassword"
                            component="div"
                            className="text-red-400 text-sm mt-1 pl-4"
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <Field
                            type="password"
                            name="confirmNewPassword"
                            placeholder="Confirm New Password"
                            autoComplete="new-password"
                            className="border border-gray-300 rounded-full px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-300"
                        />
                        <ErrorMessage
                            name="confirmNewPassword"
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
                        {isSubmitting ? "Resetting..." : "Reset Password"}
                    </button>

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

export default ResetPassword;
