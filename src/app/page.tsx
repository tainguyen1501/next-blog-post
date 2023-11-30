'use client'

import api from "@/apis";
import CardPost from "@/components/cards/post/CardPost";
import CardSkeleton from "@/components/cards/skeleton/CardSkeleton";
import BlogLayout from "@/components/layout/blogLayout/BlogLayout";
import Hero from "@/components/layout/blogLayout/Hero";
import { PostModel } from "@/models/post";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
export function Home() {
  const router = useRouter();
  const { isLoading, error, data } = useQuery({
    queryKey: ["fetch-posts"],
    queryFn: () => api.post.get(),
  });
  const handleSelectedPost = (post: PostModel) => {
    console.log(post);
    router.push(`/${post.slug || ''}`);
  };
  return (
    <>
      <BlogLayout>
        <Hero />
        <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
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
      </BlogLayout>
    </>
  );
}
