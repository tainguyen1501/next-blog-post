"use client";

import { PostModel } from "@/models/post";
import Image from "next/image";

interface CardPostProps {
  post: PostModel;
  handleSelectedPost: (post: PostModel) => void;
}

function CardPost(props: CardPostProps) {
  const post = props.post;
  return (
    <div
      className="rounded overflow-hidden shadow-lg cursor-pointer"
      onClick={() => props.handleSelectedPost(post)}
    >
      <div className="relative">
        <a href="#">
          <Image
            width={500}
            height={400}
            alt="text"
            src={post.image || "/images/banner4.webp"}
          />
          <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
        </a>
      </div>
      <div className="px-6 py-4">
        <a
          href="#"
          className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out"
        >
          {post.title}
        </a>
        <p className="text-gray-500 text-sm">{post.shortContent}</p>
      </div>
      {/* <div className="px-6 py-4 flex flex-row items-center">
        <span className="py-1 text-sm font-regular text-gray-900 mr-1 flex flex-row items-center">
          cc
          <span className="ml-1">6 mins ago</span>
        </span>
      </div> */}
    </div>
  );
}

export default CardPost;
