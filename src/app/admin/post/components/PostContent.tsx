"use client";

import { CreateOrUpdatePostModel, PostModel } from "@/models/post";
import { useState } from "react";
import CreateOrUpdatePost from "./CreateOrUpdatePost";
import { useQuery } from "@tanstack/react-query";
import CardPost from "@/components/cards/post/CardPost";
import CardSkeleton from "@/components/cards/skeleton/CardSkeleton";
import api from "@/apis";
function PostContent() {
  const [showModal, setShowModal] = useState(false);
  const [createOrUpdatePostData, setCreateOrUpdatePostData] = useState({
    title: "",
  });

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSavePost = async (data: CreateOrUpdatePostModel) => {
    console.log("save", data);
    try {
      //update
      if (data._id) {
        const res = await fetch("/api/posts", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: data._id,
            title: data.title,
            metaTitle: data.metaTitle,
            metaKeywords: data.metaKeywords,
            metaDescription: data.metaDescription,
            shortContent: data.shortContent,
          }),
        });

        if (res.status === 200) {
          refetch();
        } else {
        }
      }
      //create new
      else {
        const res = await fetch("/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: data.title,
            metaTitle: data.metaTitle,
            metaKeywords: data.metaKeywords,
            metaDescription: data.metaDescription,
            shortContent: data.shortContent,
          }),
        });

        if (res.status === 200) {
          refetch();
        } else {
        }
      }
    } catch (error) {}
    setShowModal(false);
  };

  const handleDeletePost = async (id: string) => {
    const res = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (res.status === 200) {
      refetch();
      setShowModal(false);
    } else {
    }
  };

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["fetch-posts"],
    queryFn: async () => await api.post.get(),
  });

  const handleSelectedPost = (post: PostModel) => {
    setCreateOrUpdatePostData({ ...post });
    setShowModal(true);
  };

  const handleCreateNewPost = () => {
    const obj: CreateOrUpdatePostModel = {
      title: "",
      shortContent: "",
      metaTitle: "",
      metaKeywords: "",
      metaDescription: "",
      image: "",
    };
    setCreateOrUpdatePostData(obj);
    setShowModal(true);
  };
  return (
    <div>
      <div className="container">
        <div>
          <div className="py-4">
            <button
              onClick={() => handleCreateNewPost()}
              className="hidden sm:inline-flex rounded-md bg-indigo-600 text-white shadow-sm hover:bg-indigo-500  font-medium text-sm px-5 py-2.5 text-center items-center mr-3"
            >
              Create new post
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
            {isLoading ? (
              Array.from(Array(10).keys()).map((i) => (
                <CardSkeleton key={i} className="w-full" />
              ))
            ) : error ? (
              <p>Error</p>
            ) : (
              <>
                {data &&
                  data.map((post: PostModel) => (
                    <CardPost
                      key={post._id}
                      post={post}
                      handleSelectedPost={handleSelectedPost}
                    />
                  ))}
              </>
            )}
          </div>
        </div>
      </div>
      <CreateOrUpdatePost
        show={showModal}
        handleClose={handleCloseModal}
        handleSave={handleSavePost}
        handleDeletePost={handleDeletePost}
        defaultValues={createOrUpdatePostData}
      />
    </div>
  );
}

export default PostContent;
