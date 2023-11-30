"use client";

import api from "@/apis";
import "@/app/style.css";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { Suspense } from "react";
const EditorComp = dynamic(
  () => import("@/components/editor/EditorComponent"),
  { ssr: false }
);

export default function PostPage() {
  const params = useParams();
  const id = params.id as string;
  console.log(id);
  const {
    isLoading,
    error,
    data: post,
  } = useQuery({
    queryKey: [`fetch-posts-${id}`],
    queryFn: async () => await api.post.getById(id),
  });

  const onSaveContent = async (content: string) => {
    console.log("post", post);
    console.log("sagedsfdsf", content);

    const res = await fetch("/api/posts", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...post, id: post._id, content: content }),
    });

    if (res.status === 200) {
      console.log(await res.json());
    } else {
    }
  };
  return (
    <div>
      <div className="min-h-screen max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
        {isLoading ? (
          <div>loading... </div>
        ) : post ? (
          <div className="container" style={{ position: "relative" }}>
            <div className="flex min-h-screen flex-col items-center">
              <div>
                <Suspense fallback={null}>
                  <EditorComp
                    markdown={post.content || ""}
                    onSave={onSaveContent}
                  />
                </Suspense>
              </div>
            </div>
          </div>
        ) : (
          <p>not found post</p>
        )}
      </div>
    </div>
  );
}
