import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import LoginSchema from "../schema/LoginSchema";
import { Link, useNavigate } from "react-router";
import { loginUser } from "../api";
import { useAuth } from "../../../shared/contexts/AuthContext"; // Import useAuth hook

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth(); // Get login function from context

    const handleSubmit = async (
        values,
        { setSubmitting, setFieldError, setFieldValue }
    ) => {
        try {
            console.log("Login attempt with:", values);
            // **API returns a FLAT object like:**
            // { token: "...", userId: 1, username: "user1", profilePictureUrl: "url_or_null", name: "User Name", email: "...", role: "..." }
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

            console.log("Login successful, navigating to /home");
            // Redirect to home after successful login
            navigate("/home");
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
        <div className="Container font-syne flex flex-col items-center justify-center h-dvh">
            <div className="flex flex-row size-fit w-full max-w-4xl shadow-[0_0_30px_rgba(0,0,0,0.2)] rounded-2xl overflow-hidden">
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
                            <Link
                                to="/forgotPassword"
                                className="text-sm hover:underline"
                            >
                                Forgot Password?
                            </Link>
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
                            <Link
                                to="/registration"
                                className="text-sm hover:underline"
                            >
                                Don't have an account?
                            </Link>
                        </Form>
                    )}
                </Formik>
                <div className="Picture bg-[url(src/features/auth/assets/login-banner-1280p.jpg)] bg-cover bg-center w-1/2" />
            </div>
        </div>
    );
};

export default Login;
