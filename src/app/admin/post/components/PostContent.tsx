"use client";

import { CreateOrUpdatePostModel, PostModel } from "@/models/post";
import { useState } from "react";
import CreateOrUpdatePost from "./CreateOrUpdatePost";
import { useQuery } from "@tanstack/react-query";
import CardPost from "@/components/cards/post/CardPost";
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

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts", {
        method: "GET",
      });

      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
        return data;
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["fetch-posts"],
    queryFn: async () => await fetchPosts(),
  });

  const handleSelectedPost = (post: PostModel) => {
    console.log(post);
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
      <div className="flex items-center justify-between mb-4 min-h-[500px]">
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
          {data &&
            data.map((post: PostModel) => (
              <CardPost
                key={post._id}
                post={post}
                handleSelectedPost={handleSelectedPost}
              />
            ))}
        </div>
      </div>
      <button onClick={() => handleCreateNewPost()}>Create new post</button>
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
