import React, { useState, useContext } from "react";
import CommentCard from "./CommentCard";
import { postComment } from "../../../shared/api/ApiClient";
import { useAuth } from "../../../shared/contexts/AuthContext";
import { getFileUrl } from "../../../shared/api/ApiClient";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const CommentSection = ({
    blogId,
    comments,
    commentsLoading,
    commentsError,
    onCommentPosted,
}) => {
    const { user } = useAuth();

    const CommentSchema = Yup.object().shape({
        commentContent: Yup.string()
            .min(1, "Comment cannot be empty")
            .max(500, "Comment is too long")
            .required("Comment is required"),
    });

    const handlePostComment = async (values, { resetForm }) => {
        if (!values.commentContent.trim() || !user?.id || !blogId) {
            alert("Please write a comment and ensure you are logged in.");
            return;
        }
        try {
            await postComment(blogId, user.id, values.commentContent);
            resetForm(); // Clear the form after successful post
            onCommentPosted(); // Callback to refresh comments in Blog.jsx
        } catch (error) {
            console.error("Error posting comment:", error);
            alert("Failed to post comment. Please try again.");
        }
    };

    if (commentsLoading) return <div className="p-4">Loading comments...</div>;
    if (commentsError)
        return <div className="p-4 text-red-500">Error: {commentsError}</div>;

    return (
        <>
            <div className="sticky top-16 flex flex-col py-5 space-y-3 border-y border-neutral-200 bg-white">
                <div className="flex flex-row gap-2 items-center">
                    <span className="font-reservation font-bold text-4xl">
                        Comments
                    </span>
                    <span className="font-reservation text-xl">
                        ({comments.length})
                    </span>
                </div>
                <Formik
                    initialValues={{ commentContent: "" }}
                    validationSchema={CommentSchema}
                    onSubmit={handlePostComment}
                >
                    {({ isSubmitting, isValid, dirty }) => (
                        <Form className="flex flex-row space-x-3 items-center">
                            <img
                                src={
                                    user?.profilePictureUrl
                                        ? getFileUrl(
                                              "profile-pictures",
                                              user.profilePictureUrl
                                          )
                                        : "/api/files/profile-pictures/default.jpg"
                                }
                                alt="Profile Picture"
                                className="rounded-full object-cover size-10"
                            />
                            <Field
                                type="text"
                                name="commentContent"
                                placeholder="Write your comment here..."
                                className="outline-none border-b border-neutral-400 w-full text-lg bg-transparent placeholder-gray-400"
                            />
                            <ErrorMessage
                                name="commentContent"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting || !isValid || !dirty}
                                className="px-2 py-0.5 w-fit rounded-full border hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
                            >
                                Post
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
            <div>
                {comments && comments.length === 0 ? (
                    <div className="p-4">
                        No comments yet. Be the first to comment!
                    </div>
                ) : (
                    comments &&
                    comments.map((comment) => (
                        <CommentCard key={comment.id} comment={comment} />
                    ))
                )}
            </div>
        </>
    );
};

export default CommentSection;
