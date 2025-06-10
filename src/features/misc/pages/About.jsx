import React from "react";
import { Link } from "react-router";
const About = () => {
    return (
        <div className="font-syne min-h-screen bg-white text-gray-900">
            {/* Hero Section */}
            <header className="py-20 px-4 sm:px-6 lg:px-8 bg-black text-white">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="font-reservation font-bold text-4xl md:text-6xl mb-4">
                        BlogSphere
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                        Where Thoughts Converge and Stories Unfold in Monochrome
                    </p>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Our Story */}
                <section className="mb-10">
                    <h2 className="font-reservation text-3xl font-bold mb-6 border-b-2 border-black pb-2 inline-block">
                        Our Story
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8 ">
                        <div>
                            <p className="text-2xl mb-4">
                                Founded in 2025, BlogSphere emerged from a
                                simple idea: to create a pure, distraction-free
                                platform for writers and thinkers.
                            </p>
                            <p className="text-2xl mb-4">
                                In a world of visual overload, we champion the
                                power of words. Our black and white aesthetic is
                                a deliberate choice - stripping away color to
                                focus on content.
                            </p>
                            <p className="text-2xl">
                                What began as a small collective of minimalist
                                writers has grown into a thriving community of
                                thousands who appreciate substance over style.
                            </p>
                        </div>
                        <div className="h-70 md:h-80 flex items-center justify-center">
                            <img
                                src="src/shared/assets/images/team-image.jpg"
                                alt="Team Picture"
                                className="rounded-xl"
                            />
                        </div>
                    </div>
                </section>

                {/* Our Philosophy */}
                <section className="mb-10 bg-black text-white p-12 rounded-xl">
                    <h2 className="font-reservation text-3xl font-bold mb-8 text-center">
                        Our Philosophy
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="text-5xl mb-4">✍️</div>
                            <h3 className="text-xl font-bold mb-3">Clarity</h3>
                            <p>
                                We believe in clean, thoughtful writing that
                                communicates ideas without distraction.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl mb-4">🌐</div>
                            <h3 className="text-xl font-bold mb-3">
                                Community
                            </h3>
                            <p>
                                A space where diverse perspectives meet, debate,
                                and grow together.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl mb-4">⚖️</div>
                            <h3 className="text-xl font-bold mb-3">Balance</h3>
                            <p>
                                The interplay of black and white represents the
                                nuance in every story.
                            </p>
                        </div>
                    </div>
                </section>

                {/* The Platform */}
                <section className="mb-10">
                    <h2 className="font-reservation text-3xl font-bold mb-6 border-b-1 border-black pb-2 inline-block">
                        The Platform
                    </h2>
                    <div className="space-y-8">
                        <div className="p-6 border border-gray-200 rounded-lg">
                            <h3 className="text-xl font-bold mb-3">
                                Minimalist Design
                            </h3>
                            <p>
                                Our interface eliminates clutter, putting your
                                words front and center. No flashy colors, no
                                unnecessary elements - just you and your
                                audience.
                            </p>
                        </div>
                        <div className="p-6 border border-gray-200 rounded-lg">
                            <h3 className="text-xl font-bold mb-3">
                                Powerful Tools
                            </h3>
                            <p>
                                Behind our simple facade lies robust technology:
                                advanced editing, analytics, and distribution
                                tools to amplify your voice.
                            </p>
                        </div>
                        <div className="p-6 border border-gray-200 rounded-lg">
                            <h3 className="text-xl font-bold mb-3">
                                Engaged Community
                            </h3>
                            <p>
                                Connect with readers who value depth over
                                clickbait. Our members are here for meaningful
                                content and thoughtful discussion.
                            </p>
                        </div>
                    </div>
                </section>

                {/* The Team */}
                <section className="mb-10">
                    <h2 className="font-reservation text-3xl font-bold mb-12 border-b-2 border-black pb-2 inline-block">
                        The Minds Behind BlogSphere
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
                        {[
                            {
                                image: "Somik",
                                name: "Somik Acharjee",
                                role: "Founder & Frontend Developer",
                                bio: "Crafts pixel-perfect, user-friendly interfaces.",
                            },
                            {
                                name: "Debosmit Karmakar",
                                role: "Founder & Full-Stack Developer",
                                bio: "Leads the vision while building robust end-to-end systems.",
                            },
                            {
                                name: "Shantonu Ganguly",
                                role: "Backend Developer",
                                bio: "Ensures seamless server logic and database performance.",
                            },
                            {
                                name: "Rahul Adhya",
                                role: "Frontend Developer",
                                bio: "Turns designs into responsive experiences.",
                            },
                            {
                                name: "Sanket Adhikary",
                                role: "Frontend Developer",
                                bio: "Turns designs into responsive experiences.",
                            },
                        ].map((member, index) => (
                            <div
                                key={index}
                                className="border border-gray-200 p-6 rounded-lg hover:shadow-lg transition-shadow"
                            >
                                <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 mx-auto flex items-center justify-center text-gray-500 overflow-hidden">
                                    <img
                                        src={`src/shared/assets/images/${
                                            member.name.split(" ")[0]
                                        }.jpg`}
                                        alt="Member Picture"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-center mb-1">
                                    {member.name}
                                </h3>
                                <p className="text-gray-600 text-center mb-3">
                                    {member.role}
                                </p>
                                <p className="text-gray-700 text-center">
                                    {member.bio}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-black text-white p-12 rounded-xl">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="font-reservation text-3xl font-bold mb-6">
                            Ready to Join Our Community?
                        </h2>
                        <p className="text-xl mb-8 text-gray-300">
                            Whether you're here to write or to read, we're glad
                            you found us. Start your BlogSphere journey today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/registration"
                                className="bg-white text-black px-8 py-3 rounded font-bold hover:bg-gray-200 transition-colors"
                            >
                                Create Account
                            </Link>
                            <Link
                                to="/home"
                                className="border border-white text-white px-8 py-3 rounded font-bold hover:bg-gray-900 transition-colors"
                            >
                                Explore Blogs
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default About;
