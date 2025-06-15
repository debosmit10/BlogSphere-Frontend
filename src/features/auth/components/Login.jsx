import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import LoginSchema from "../schema/LoginSchema";
import { loginUser } from "../api";
import { useAuth } from "../../../shared/contexts/AuthContext"; // Import useAuth hook

const Login = ({ switchToRegister, switchToForgotPassword }) => {
    const { login, isAuthenticated } = useAuth();

    const handleSubmit = async (
        values,
        { setSubmitting, setFieldError, setFieldValue }
    ) => {
        try {
            console.log("Login attempt with:", values);
            const response = await loginUser(values);
            console.log("Login API response:", response);

            // **FIX:** Check for token and essential user info (e.g., username) in the FLAT response
            if (!response || !response.token || !response.username) {
                console.error(
                    "Login Error: Invalid response structure or missing token/username from loginUser API.",
                    response
                );
                setFieldError("username", "Login failed. Please try again."); // Generic error
                return; // Stop execution
            }

            const { token, ...userData } = response; // Destructure token, rest is userData

            // Ensure profilePictureUrl exists, even if null, for consistency
            if (!userData.hasOwnProperty("profilePictureUrl")) {
                userData.profilePictureUrl = null;
            }

            console.log("Extracted token:", token);
            console.log("Constructed userData:", userData);

            // Call the login function from AuthContext with token and the constructed userData object
            login(token, userData);
        } catch (error) {
            // Handle login errors (e.g., invalid credentials)
            console.error("Login failed:", error);
            // Provide specific feedback if possible, otherwise generic
            setFieldError("username", "Invalid username or password");
            // Clear password field on error for security
            setFieldValue("password", "");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={{
                username: "",
                password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched, isSubmitting }) => (
                <Form className="flex flex-col items-center p-10 gap-y-5 w-1/2">
                    <h1 className="font-reservation font-bold text-5xl self-start">
                        Login.
                    </h1>
                    <div className="flex flex-col w-full">
                        <Field
                            type="text"
                            name="username"
                            placeholder="Enter Username"
                            autoComplete="off"
                            className="border border-gray-300 rounded-full px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-300"
                        />
                        <ErrorMessage
                            name="username"
                            component="div"
                            className="text-red-400 text-sm mt-1 pl-4"
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <Field
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            autoComplete="off"
                            className="border border-gray-300 rounded-full px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-300"
                        />
                        <ErrorMessage
                            name="password"
                            component="div"
                            className="text-red-400 text-sm mt-1 pl-4"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={switchToForgotPassword}
                        className="text-sm hover:underline cursor-pointer"
                    >
                        Forgot Password?
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`rounded-full px-4 py-2 text-white font-semibold w-full ${
                            isSubmitting
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-black hover:bg-gray-900"
                        }`}
                    >
                        {isSubmitting ? "Submitting..." : "Login"}
                    </button>
                    <button
                        type="button"
                        onClick={switchToRegister}
                        className="text-sm hover:underline cursor-pointer"
                    >
                        Don't have an account?
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default Login;
