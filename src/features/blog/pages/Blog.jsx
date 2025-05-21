import React from "react";
import Header from "../../../shared/components/header";
import { Link } from "react-router";
import { FollowButton } from "../../../shared/components/Buttons";
import {
    PiThumbsUp,
    PiThumbsUpFill,
    PiBookmarksSimple,
    PiBookmarksSimpleFill,
    PiDotsThreeBold,
} from "react-icons/pi";
import Comment from "../components/Comment";

const Blog = () => {
    return (
        <>
            <Header />
            <div className="p-5 flex flex-col items-center font-syne">
                <div className="w-170">
                    <div className="flex flex-col space-y-0">
                        <img
                            src="https://placehold.co/1920x1080.jpg"
                            alt="Blog Cover"
                            className="mb-4 rounded-xl"
                        />
                        <Link
                            to={`#technology`}
                            className="mb-2 font-medium text-neutral-600 hover:underline    "
                        >
                            #technology
                        </Link>
                        <h1 className="font-reservation font-bold text-4xl ">
                            This is the blog topic!
                        </h1>
                    </div>
                    <section>
                        <div className="sticky top-16 py-5 space-y-3 bg-white border-b border-neutral-200">
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-row items-center space-x-3">
                                    <img
                                        src="https://placehold.co/100"
                                        alt="Profile Picture"
                                        className="rounded-full object-cover size-10"
                                    />
                                    <Link to={`#user`}>Username</Link>
                                    <FollowButton />
                                </div>
                                <div className="flex flex-row space-x-3 items-center">
                                    <span>19h</span>
                                    <button className="flex flex-row space-x-2">
                                        <PiThumbsUp className="text-2xl" />
                                        <span>0</span>
                                    </button>
                                    <button>
                                        <PiBookmarksSimple className="text-2xl" />
                                    </button>
                                    <button>
                                        <PiDotsThreeBold className="text-2xl" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="text-lg/loose font-montserrat font-normal">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Voluptate eaque cupiditate quo
                                voluptas consectetur aspernatur eum quisquam
                                officiis, error tempore ipsa exercitationem
                                nulla odit perspiciatis unde explicabo eveniet
                                deserunt illum iste quas. Blanditiis inventore
                                ab facilis facere a nisi minus ipsam,
                                voluptatibus aut quis dolorum totam! Accusamus
                                dolorem fugiat illum consequuntur eveniet
                                recusandae odio pariatur saepe ipsa, sed ipsam
                                veritatis alias aperiam culpa officiis autem
                                eaque at quo natus omnis ullam cupiditate neque
                                sequi. Totam quaerat cum tenetur. Hic quo
                                blanditiis perferendis molestiae debitis
                                obcaecati, eius omnis unde ex incidunt, et
                                consequatur est assumenda, error tenetur
                                consequuntur sunt odit saepe.
                                <br />
                                <br />
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Obcaecati fugit voluptas
                                vitae, inventore impedit dignissimos consequatur
                                saepe hic dolorem non quae facere voluptatibus
                                corporis repellendus sed! Aliquid repudiandae
                                quas a consectetur quos est illum harum quam,
                                tempore optio repellat blanditiis quia nesciunt
                                provident quae! Incidunt, quas? Voluptatum
                                debitis ducimus magni odit dolor rerum eveniet
                                neque vero cumque illo. Labore neque quo, modi
                                fugiat nihil alias delectus commodi quod, illum
                                vel deleniti beatae impedit provident laborum
                                eligendi aspernatur ipsa! Sunt sequi quas
                                voluptatibus tempora numquam delectus autem ut
                                nostrum ea pariatur debitis, fuga possimus
                                natus? Dolorum, ab. Labore inventore facere
                                ipsum, delectus omnis modi esse dicta
                                consequuntur, magni quisquam ipsam assumenda?
                                Aliquam laborum iure et illo, doloribus nam
                                dignissimos accusantium dolorum, placeat,
                                voluptates in consequatur. Laboriosam eius neque
                                illo dolor odio ab recusandae natus magni,
                                dolorem in ratione vitae atque hic eaque facilis
                                illum possimus rerum aspernatur assumenda
                                suscipit eos beatae. Saepe quibusdam temporibus
                                neque pariatur esse alias corrupti itaque, odit
                                ea, unde a. Esse molestiae ipsam placeat dolore
                                aperiam ipsa dicta a laborum reiciendis dolor,
                                deserunt, vitae nam recusandae veniam quae sit?
                                Voluptas ipsam soluta ipsa? Totam optio
                                inventore nam porro voluptatem eaque impedit
                                maiores, reiciendis ratione accusantium vero
                                nobis?
                            </p>
                        </div>
                    </section>
                    {/*<section>
                        <div className="sticky top-16 flex flex-col py-5 space-y-3 border-y border-neutral-200 bg-white">
                            <span className="font-reservation font-bold text-4xl">
                                Comments
                            </span>
                            <div className="flex flex-row space-x-3 items-center">
                                <img
                                    src="https://placehold.co/100"
                                    alt="Profile Picture"
                                    className="rounded-full object-cover size-10"
                                />
                                <input
                                    type="text"
                                    placeholder="Write your comment here..."
                                    className="outline-none border-b border-neutral-400 w-full text-lg bg-transparent placeholder-gray-400"
                                />
                            </div>
                        </div>
                        <div>
                            <Comment />
                            <Comment />
                            <Comment />
                            <Comment />
                            <Comment />
                            <Comment />
                        </div>
                    </section>*/}
                </div>
            </div>
        </>
    );
};

export default Blog;
