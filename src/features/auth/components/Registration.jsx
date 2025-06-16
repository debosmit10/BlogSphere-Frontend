import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import RegistrationSchema from "../schema/RegistrationSchema";
import { registerUser } from "../api";
import { CgSpinner } from "react-icons/cg";

const Registration = ({ switchToLogin }) => {
    const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
        try {
            await registerUser(values);
            switchToLogin(); // Switch to login after successful registration
        } catch (error) {
            setFieldError("username", error.message || "Registration failed");
        } finally {
            setSubmitting(false);
        }
    };

    return (
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
                        className={`flex flex-row justify-center space-x-2 rounded-full px-4 py-2 text-white bg-black font-semibold w-full cursor-pointer ${
                            isSubmitting ? "cursor-not-allowed" : ""
                        }`}
                    >
                        {isSubmitting ? (
                            <>
                                <span>Registering</span>
                                <CgSpinner className="animate-spin text-xl" />
                            </>
                        ) : (
                            <span>Register</span>
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={switchToLogin}
                        className="text-sm hover:underline cursor-pointer"
                    >
                        Already have an account?
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default Registration;
