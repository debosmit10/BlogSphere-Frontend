import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import LoginSchema from "../schema/LoginSchema";
import { Link } from "react-router";

const Login = () => {
    return (
        <div>
            <h1>Login Form</h1>
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
                    <Form>
                        <div>
                            <Field
                                type="text"
                                name="identifier"
                                placeholder="Enter Username or Email"
                                autoComplete="off"
                            />
                            <ErrorMessage name="identifier" component="div" />
                        </div>

                        <div>
                            <Field
                                type="password"
                                name="password"
                                placeholder="Enter Username or Password"
                                autoComplete="off"
                            />
                            <ErrorMessage name="password" component="div" />
                        </div>

                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Login"}
                        </button>
                    </Form>
                )}
            </Formik>
            <Link to="/forgotPassword">Forgot Password?</Link> <br />
            <Link to="/registration">Don't have an account?</Link>
        </div>
    );
};

export default Login;
