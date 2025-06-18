import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ResetPasswordSchema from "../schema/ResetPasswordSchema";
import { resetPassword } from "../api";
import { CgSpinner } from "react-icons/cg";

const ResetPassword = ({ switchToLogin, email }) => {
    const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
        try {
            const response = await resetPassword(
                email,
                values.newPassword,
                values.confirmNewPassword
            );
            console.log(response.data);
            switchToLogin(); // Switch to login after successful password reset
        } catch (error) {
            console.error("Reset password error:", error);
            setFieldError(
                "newPassword",
                error.response?.data || "Password reset failed"
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
            validationSchema={ResetPasswordSchema}
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
                        className={`flex flex-row justify-center space-x-2 rounded-full px-4 py-2 text-white bg-black font-semibold w-full cursor-pointer ${
                            isSubmitting ? "cursor-not-allowed" : ""
                        }`}
                    >
                        {isSubmitting ? (
                            <>
                                <span>Resetting</span>
                                <CgSpinner className="animate-spin text-xl" />
                            </>
                        ) : (
                            <span>Reset</span>
                        )}
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
