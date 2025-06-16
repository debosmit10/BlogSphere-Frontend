import React, { useEffect, useState } from "react";
import Header from "../../../shared/components/header";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useParams, useNavigate } from "react-router";
import { getBlogById, updateBlog } from "../api";
import ApiClient, { getFileUrl } from "../../../shared/api/ApiClient";
import { AIButton } from "../../../shared/components/Buttons";
import { enhanceTextWithAI } from "../api";
//import { getAllTopics } from "../../home/api";

const Edit = () => {
    const { id } = useParams(); // Get blog ID from URL
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEnhancing, setIsEnhancing] = useState(false);

    useEffect(() => {
        const fetchBlogAndTopics = async () => {
            try {
                const fetchedBlog = await getBlogById(id);
                setBlog(fetchedBlog);
            } catch (err) {
                setError("Failed to load blog or topics.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogAndTopics();
    }, [id]);

    const validate = (values) => {
        const errors = {};
        if (!values.title) errors.title = "Title is required";
        if (!values.content) errors.content = "Content is required";
        return errors;
    };

    const handleEnhanceText = async (values, setFieldValue) => {
        setIsEnhancing(true);
        try {
            const enhancedText = await enhanceTextWithAI(values.content);
            setFieldValue("content", enhancedText);
        } catch (error) {
            console.error("Error enhancing text:", error);
            alert("Failed to enhance text. Please try again.");
        } finally {
            setIsEnhancing(false);
        }
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("content", values.content);

            await updateBlog(id, formData);
            //alert("Blog updated successfully!");
            navigate(`/blog/${id}`); // Redirect to updated blog page
        } catch (err) {
            setError("Failed to update blog.");
            console.error(err);
            /*alert(
                "Failed to update blog: " + (err.response?.data || err.message)
            );*/
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <Header /> && <div className="p-7">Loading blog details...</div>;
    }

    if (error) {
        return (
            <Header /> && <div className="p-7 text-red-500">Error: {error}</div>
        );
    }

    if (!blog) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className="min-h-screen flex flex-col items-center py-7 font-syne">
                <div className="w-full max-w-170 space-y-3">
                    <img
                        src={getFileUrl("blog-images", blog.imageUrl)}
                        alt="Blog Cover"
                        className="aspect-16/9 object-cover w-full h-full rounded-xl"
                    />
                    <span className="mb-2 font-medium text-neutral-600 hover:underline">
                        #{blog.topicDisplayName}
                    </span>
                    <Formik
                        initialValues={{
                            title: blog.title || "",
                            content: blog.content || "",
                        }}
                        validate={validate}
                        onSubmit={handleSubmit}
                        enableReinitialize={true}
                    >
                        {({ values, isSubmitting, setFieldValue }) => (
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
                                <div className="flex flex-row justify-between text-right">
                                    {/* <Link
                                        to={`/blog/${id}`}
                                        className="px-6 py-2 font-medium border rounded-full hover:bg-black hover:text-white transition-colors duration-200"
                                    >
                                        Cancel
                                    </Link> */}
                                    <AIButton
                                        onClick={() =>
                                            handleEnhanceText(
                                                values,
                                                setFieldValue
                                            )
                                        }
                                        isEnhancing={isEnhancing}
                                        disabled={isEnhancing || isSubmitting}
                                    />
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
