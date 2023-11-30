import BlogLayout from "@/components/layout/blogLayout/BlogLayout";
import service from "@/services";

export default async function PostPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const slug = params.slug as string;
  console.log(slug);
  const post = await service.post.getBySlug(slug);
  console.log("post", post);

  return (
    <BlogLayout>
      <div className="min-h-screen max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
        {post ? (
          <div>
            <div className="justify-center items-center text-center my-8">
              <p className="text-4xl font-semibold">{post.title}</p>
            </div>
            {post.shortContent}
          </div>
        ) : (
          <p>not found post</p>
        )}
      </div>
    </BlogLayout>
  );
}
