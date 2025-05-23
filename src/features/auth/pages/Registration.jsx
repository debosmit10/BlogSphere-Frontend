import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import RegistrationSchema from "../schema/RegistrationSchema";
import { Link, useNavigate } from "react-router";
import { registerUser } from "../api";

const Registration = () => {
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
        try {
            await registerUser(values);
            navigate("/login"); // Redirect to login after successful registration
        } catch (error) {
            setFieldError("username", error.message || "Registration failed");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="Container font-syne flex flex-col items-center justify-center h-dvh">
            <div className="flex flex-row size-fit w-full max-w-4xl shadow-[0_0_30px_rgba(0,0,0,0.2)] rounded-2xl overflow-hidden">
                <Formik
                    initialValues={{
                        name: "",
                        username: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                    }}
                    validationSchema={RegistrationSchema}
                    validateOnChange={false}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, isSubmitting }) => (
                        <Form className="flex flex-col items-center p-10 gap-y-5 w-1/2">
                            <h1 className="font-reservation font-bold text-5xl self-start">
                                Register.
                            </h1>
                            <div className="flex flex-col w-full">
                                <Field
                                    type="text"
                                    name="name"
                                    placeholder="Enter Name"
                                    autoComplete="on"
                                    className="border border-gray-300 rounded-full px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-300"
                                />
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="text-red-400 text-sm mt-1 pl-4"
                                />
                            </div>

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
                                    type="email"
                                    name="email"
                                    placeholder="Enter Email"
                                    autoComplete="on"
                                    className="border border-gray-300 rounded-full px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-300"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-red-400 text-sm mt-1 pl-4"
                                />
                            </div>

                            <div className="flex flex-col w-full">
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="New Password"
                                    autoComplete="off"
                                    className="border border-gray-300 rounded-full px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-300"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="text-red-400 text-sm mt-1 pl-4"
                                />
                            </div>

                            <div className="flex flex-col w-full">
                                <Field
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Re-enter Password"
                                    autoComplete="off"
                                    className="border border-gray-300 rounded-full px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-300"
                                />
                                <ErrorMessage
                                    name="cnfPassword"
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
                                {isSubmitting ? "Submitting..." : "Register"}
                            </button>
                            <Link
                                to="/login"
                                className="text-sm hover:underline"
                            >
                                Already have an account?
                            </Link>
                        </Form>
                    )}
                </Formik>
                <div className="Picture bg-[url(src/features/auth/assets/login-banner-1280p.jpg)] bg-cover bg-center w-1/2" />
            </div>
        </div>
    );
};

export default Registration;
