import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import LoginSchema from "../schema/LoginSchema";
import { Link, useNavigate } from "react-router";
import Cookies from "js-cookie";
import { loginUser } from "../api";

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
        try {
            const { token, userId, username } = await loginUser(values);

            // Store token in cookie (expires in 1 day)
            Cookies.set("token", token, { expires: 1 });

            // Redirect to home
            navigate("/home");
        } catch (error) {
            setFieldError("username", "Invalid credentials");
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
                    {({ values, errors, touched, isSubmitting }) => (
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
