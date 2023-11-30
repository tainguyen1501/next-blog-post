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
            height={300}
            alt="text"
            src={
              "/uploads/28-11-2023/51i47q0zjcu9agcyp487-1701165295706-354624147.webp"
            }
          />
          {/* <img className="w-full" src="" alt="Sunset in the mountains"> */}
          <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
        </a>
        <a href="#!">
          <div className="absolute bottom-0 left-0 bg-indigo-600 px-4 py-2 text-white text-sm hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
            Photos
          </div>
        </a>

        <a href="!#">
          <div className="text-sm absolute top-0 right-0 bg-indigo-600 px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
            <span className="font-bold">27</span>
            <small>March</small>
          </div>
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
      <div className="px-6 py-4 flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img
            className="h-8 w-8 rounded-full"
            src="https://demo.themesberg.com/windster/images/users/neil-sims.png"
            alt="Neil image"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            Neil Sims
          </p>
          <p className="text-sm text-gray-500 truncate">
            <a href="/cdn-cgi/l/email-protection">tainguyen@gmail.com</a>
          </p>
        </div>
      </div>
      <div className="px-6 py-4 flex flex-row items-center">
        <span className="py-1 text-sm font-regular text-gray-900 mr-1 flex flex-row items-center">
          cc
          <span className="ml-1">6 mins ago</span>
        </span>
      </div>
    </div>
  );
}

export default CardPost;
