import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import RegistrationSchema from "../schema/RegistrationSchema";
import { Link } from "react-router";

const Registration = () => {
    return (
        <div>
            <h1>Registration Form</h1>
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
                onSubmit={(values, { setSubmitting }) => {
                    console.log(values);
                    setSubmitting(false);
                }}
            >
                {({ values, errors, touched, isSubmitting }) => (
                    <Form>
                        <div>
                            <Field
                                type="text"
                                name="name"
                                placeholder="Enter Name"
                                className=""
                                autoComplete="on"
                            />
                            <ErrorMessage name="name" component="div" />
                        </div>

                        <div>
                            <Field
                                type="text"
                                name="username"
                                placeholder="Enter Username"
                                autoComplete="off"
                            />
                            <ErrorMessage name="username" component="div" />
                        </div>

                        <div>
                            <Field
                                type="email"
                                name="email"
                                placeholder="Enter Email"
                                autoComplete="on"
                            />
                            <ErrorMessage name="email" component="div" />
                        </div>

                        <div>
                            <Field
                                type="password"
                                name="password"
                                placeholder="New Password"
                                autoComplete="off"
                            />
                            <ErrorMessage name="password" component="div" />
                        </div>

                        <div>
                            <Field
                                type="password"
                                name="confirmPassword"
                                placeholder="Re-enter Password"
                                autoComplete="off"
                            />
                            <ErrorMessage name="cnfPassword" component="div" />
                        </div>

                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Register"}
                        </button>
                    </Form>
                )}
            </Formik>
            <Link to="/login">Already have an account?</Link>
        </div>
    );
};

export default Registration;
