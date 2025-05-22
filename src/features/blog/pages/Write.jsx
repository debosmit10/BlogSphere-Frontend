import React, { useState, useRef, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Header from "../../../shared/components/header";
import { PiPlusBold, PiArrowCircleRightLight } from "react-icons/pi";
import { BsChevronCompactUp, BsChevronCompactDown } from "react-icons/bs";
import ApiClient from "../../../shared/api/ApiClient";

const Write = () => {
    const [topics, setTopics] = useState([]);
    const [coverImage, setCoverImage] = useState(null);
    const [isTopicOpen, setIsTopicOpen] = useState(false);
    const topicRef = useRef();
    const fileInputRef = useRef();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setCoverImage(imageUrl);
        }
    };

    useEffect(() => {
        const onClickOutside = (e) => {
            if (topicRef.current && !topicRef.current.contains(e.target)) {
                setIsTopicOpen(false);
            }
        };
        window.addEventListener("mousedown", onClickOutside);
        return () => window.removeEventListener("mousedown", onClickOutside);
    }, []);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await ApiClient.get("/blogs/topics");
                setTopics(response.data); // Assuming backend returns array of {name, displayName}
            } catch (error) {
                console.error("Error fetching topics:", error);
            }
        };

        fetchTopics();
    }, []);

    const validate = (values) => {
        const errors = {};
        if (!values.title) errors.title = "Title is required";
        if (!values.content) errors.content = "Content is required";
        return errors;
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        // Create FormData to handle file upload
        const formData = new FormData();

        if (fileInputRef.current.files[0]) {
            formData.append("imageFile", fileInputRef.current.files[0]);
        }
        formData.append("topic", values.topic);
        formData.append("title", values.title);
        formData.append("content", values.content);

        try {
            const response = await ApiClient.post("/blogs", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Blog created:", response.data);
            // Redirect to the new blog
            navigate(`/blog/${response.data.id}`);
        } catch (error) {
            console.error("Error creating blog:", error);
            // Handle error (show toast, etc.)
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Header />
            <div>
                <div className="min-h-screen flex flex-col items-center py-7 font-syne">
                    <Formik
                        initialValues={{
                            topic: "",
                            title: "",
                            content: "",
                        }}
                        validate={validate}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="w-full max-w-170 space-y-8">
                                {/* 1. Cover Image Input - Uncontrolled */}
                                <div>
                                    <label
                                        htmlFor="cover-upload"
                                        className="group relative w-full h-95 border-2 border-dashed rounded-xl border-gray-400 bg-gray-100 hover:border-black transition cursor-pointer flex items-center justify-center"
                                    >
                                        {coverImage ? (
                                            <img
                                                src={coverImage}
                                                alt="Cover preview"
                                                className="object-cover w-full h-full rounded-xl"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center text-gray-500 group-hover:text-black">
                                                <PiPlusBold className="text-5xl" />
                                                <span>Add cover image</span>
                                            </div>
                                        )}
                                        <input
                                            id="cover-upload"
                                            ref={fileInputRef}
                                            name="coverImage"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>

                                {/* 2. Topic Select */}
                                <div className="relative" ref={topicRef}>
                                    <label className="block text-sm font-medium mb-1">
                                        Topic
                                    </label>
                                    <Field name="topic">
                                        {({ field, form }) => (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setIsTopicOpen(
                                                            (v) => !v
                                                        )
                                                    }
                                                    className="w-full text-left border border-neutral-400 rounded-xl px-3 py-2 focus:ring flex justify-between items-center"
                                                >
                                                    {topics.find(
                                                        (topic) =>
                                                            topic.name ===
                                                            field.value
                                                    )?.displayName ||
                                                        "Select a topic…"}
                                                    <PiArrowCircleRightLight className="text-2xl text-neutral-600" />
                                                </button>

                                                {isTopicOpen && (
                                                    <div>
                                                        <BsChevronCompactUp className="absolute top-0 left-201 z-11 text-neutral-400" />
                                                        <BsChevronCompactDown className="absolute top-66 left-201 z-11 text-neutral-400" />
                                                        <ul className="absolute top-5 left-178 w-50 max-h-60 overflow-y-auto scrollbar-hidden bg-white border border-neutral-200 rounded-xl shadow-xl z-10 overflow-hidden">
                                                            {topics.map(
                                                                (topic) => (
                                                                    <li
                                                                        key={
                                                                            topic.name
                                                                        }
                                                                        onClick={() => {
                                                                            form.setFieldValue(
                                                                                "topic",
                                                                                topic.name
                                                                            );
                                                                            setIsTopicOpen(
                                                                                false
                                                                            );
                                                                        }}
                                                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                                                                    >
                                                                        {
                                                                            topic.displayName
                                                                        }
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </Field>
                                </div>

                                {/* 3. Title Input */}
                                <div>
                                    <label
                                        htmlFor="title"
                                        className="block text-sm font-medium mb-1"
                                    >
                                        Title
                                    </label>
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
                                    <label
                                        htmlFor="content"
                                        className="block text-sm font-medium mb-1"
                                    >
                                        Content
                                    </label>
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
                                <div className="text-right">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-6 py-2 font-medium border rounded-full hover:bg-black hover:text-white transition-colors duration-200"
                                    >
                                        {isSubmitting
                                            ? "Publishing..."
                                            : "Publish"}
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

export default Write;
