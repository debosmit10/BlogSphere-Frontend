import React from "react";
import Header from "../../../shared/components/header";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router";

const Edit = () => {
    const validate = (values) => {
        const errors = {};
        if (!values.title) errors.title = "Title is required";
        if (!values.content) errors.content = "Content is required";
        return errors;
    };

    const handleSubmit = async (values, { setSubmitting }) => {};

    return (
        <>
            <Header />
            <div className="min-h-screen flex flex-col items-center py-7 font-syne">
                <div className="w-full max-w-170 space-y-3">
                    <img
                        src="https://wallpapercave.com/wp/wp12025786.jpg"
                        alt="Blog Cover"
                        className="object-cover w-full h-full rounded-xl"
                    />
                    <span className="mb-2 font-medium text-neutral-600 hover:underline">
                        #Life
                    </span>
                    <Formik
                        initialValues={{
                            title: "Original blog's title...",
                            content: "Original blog's content ",
                        }}
                        validate={validate}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-7">
                                {/* 3. Title Input */}
                                <div>
                                    <Field
                                        id="title"
                                        name="title"
                                        type="text"
                                        placeholder="Your blog title here"
                                        className="w-full text-4xl font-reservation font-bold border-b border-neutral-400 focus:outline-none placeholder-neutral-400"
                                    />
                                    <ErrorMessage
                                        name="title"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                {/* 4. Content Input */}
                                <div>
                                    <Field
                                        as="textarea"
                                        id="content"
                                        name="content"
                                        rows={12}
                                        placeholder="Write your blog content here..."
                                        className="w-full border border-neutral-400 rounded-xl px-3 py-2 focus:outline-none focus:ring resize-none scrollbar-hidden"
                                    />
                                    <ErrorMessage
                                        name="content"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="text-right space-x-5">
                                    <Link
                                        to={`/home`}
                                        className="px-6 py-2 font-medium border rounded-full hover:bg-black hover:text-white transition-colors duration-200"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-6 py-2 font-medium border rounded-full hover:bg-black hover:text-white transition-colors duration-200"
                                    >
                                        {isSubmitting
                                            ? "Updating..."
                                            : "Update"}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
};

export default Edit;
