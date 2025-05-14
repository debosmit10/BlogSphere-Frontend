import React from "react";
import {
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaTwitter,
    FaLinkedin,
    FaInstagram,
} from "react-icons/fa";
const Contact = () => {
    return (
        <div className="font-syne min-h-screen bg-white text-gray-900">
            {/* Hero Section */}
            <header className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="font-reservation font-bold text-4xl md:text-6xl mb-4">
                        Get in Touch
                    </h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                        We'd love to hear from you. Reach out for inquiries,
                        collaborations, or just to say hello.
                    </p>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="border border-gray-200 p-8 rounded-lg">
                        <h2 className=" font-reservation text-3xl font-bold mb-6 border-b-2 border-black pb-2 inline-block">
                            Send Us a Message
                        </h2>
                        <form className="space-y-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-lg font-medium mb-2"
                                >
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-lg font-medium mb-2"
                                >
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="subject"
                                    className="block text-lg font-medium mb-2"
                                >
                                    Subject
                                </label>
                                <select
                                    id="subject"
                                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                >
                                    <option value="">Select a subject</option>
                                    <option value="general">
                                        General Inquiry
                                    </option>
                                    <option value="collaboration">
                                        Collaboration
                                    </option>
                                    <option value="technical">
                                        Technical Support
                                    </option>
                                    <option value="feedback">Feedback</option>
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-lg font-medium mb-2"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows="6"
                                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                    placeholder="Your message here..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-black text-white py-3 px-6 rounded font-bold hover:bg-gray-800 transition-colors"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div>
                            <h2 className=" font-reservation text-3xl font-bold mb-6 border-b-2 border-black pb-2 inline-block">
                                Contact Information
                            </h2>
                            <p className="text-lg mb-6">
                                Have questions or feedback? We're here to help.
                                Reach out through any of these channels.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="bg-black text-white p-3 rounded-full mr-4">
                                    <FaEnvelope className="text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-1">
                                        Email
                                    </h3>
                                    <p className="text-gray-700">
                                        hello@blogsphere.com
                                    </p>
                                    <p className="text-gray-700">
                                        support@blogsphere.com
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-black text-white p-3 rounded-full mr-4">
                                    <FaPhone className="text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-1">
                                        Phone
                                    </h3>
                                    <p className="text-gray-700">
                                        +1 (555) 123-4567
                                    </p>
                                    <p className="text-gray-700">
                                        Mon-Fri, 9am-5pm EST
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-black text-white p-3 rounded-full mr-4">
                                    <FaMapMarkerAlt className="text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-1">
                                        Office
                                    </h3>
                                    <p className="text-gray-700">
                                        1234 Blog Lane
                                    </p>
                                    <p className="text-gray-700">
                                        Brooklyn, NY 11201
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <h3 className="text-xl font-bold mb-4">
                                Follow Us
                            </h3>
                            <div className="flex space-x-4">
                                <a
                                    href="#"
                                    className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition-colors"
                                >
                                    <FaTwitter className="text-xl" />
                                </a>
                                <a
                                    href="#"
                                    className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition-colors"
                                >
                                    <FaLinkedin className="text-xl" />
                                </a>
                                <a
                                    href="#"
                                    className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition-colors"
                                >
                                    <FaInstagram className="text-xl" />
                                </a>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-6">
                            <h3 className="text-xl font-bold mb-4">
                                Newsletter
                            </h3>
                            <p className="mb-4">
                                Subscribe to get updates on new features and
                                blog tips.
                            </p>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="flex-grow px-4 py-3 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                />
                                <button className="bg-black text-white px-6 py-3 rounded-r font-bold hover:bg-gray-800 transition-colors">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Contact;
