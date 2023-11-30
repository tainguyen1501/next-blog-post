"use client";

import api from "@/apis";
import "@/app/style.css";
import service from "@/services";
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

  return (
    <div>
      <div className="min-h-screen max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
        {isLoading ? (
          <div>loading... </div>
        ) : post ? (
          //   <div>
          //     <div className="justify-center items-center text-center my-8">
          //       <p className="text-4xl font-semibold">{post.title}</p>
          //     </div>
          //     {post.shortContent}
          //   </div>
          <div className="container" style={{ position: "relative" }}>
            <div className="flex min-h-screen flex-col items-center">
              {/* <input onChange={(e) => handleOnchangeText(e)} /> */}
              <div>
                Editor:
                <Suspense fallback={null}>
                  <EditorComp markdown={post.content || ""} />
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
