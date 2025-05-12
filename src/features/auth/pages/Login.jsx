import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import LoginSchema from "../schema/LoginSchema";
import { Link } from "react-router";

const Login = () => {
    return (
        <div className="Container font-syne flex flex-col items-center justify-center h-dvh">
            <div className="flex flex-row size-fit w-full max-w-4xl shadow-[0_0_30px_rgba(0,0,0,0.2)] rounded-2xl overflow-hidden">
                <Formik
                    initialValues={{
                        identifier: "",
                        password: "",
                    }}
                    validationSchema={LoginSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log(values);
                        setSubmitting(false);
                    }}
                >
                    {({ values, errors, touched, isSubmitting }) => (
                        <Form className="flex flex-col items-center p-10 gap-y-5 w-1/2">
                            <h1 className="font-reservation font-bold text-5xl self-start">
                                Login.
                            </h1>
                            <div className="flex flex-col w-full">
                                <Field
                                    type="text"
                                    name="identifier"
                                    placeholder="Enter Username or Email"
                                    autoComplete="off"
                                    className="border border-gray-300 rounded-full px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-300"
                                />
                                <ErrorMessage
                                    name="identifier"
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
