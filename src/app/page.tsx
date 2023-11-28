import BlogLayout from "@/components/layout/blogLayout/BlogLayout";
import Hero from "@/components/layout/blogLayout/Hero";
import Image from "next/image";

export default function Home() {
  const blogs = [1, 2, 3, 45, 66, 77, 8, 88, 7887];
  return (
    <>
      <BlogLayout>
        <Hero />
        <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
          {blogs &&
            blogs.map((blog) => {
              return (
                <div key={blog}>
                  <div className="rounded overflow-hidden shadow-lg">
                    <a href="#"></a>
                    <div className="relative">
                      <a href="#">
                        <Image width={500} height={300} alt="text" src={"/uploads/28-11-2023/51i47q0zjcu9agcyp487-1701165295706-354624147.webp"} />
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
                        Best View in Newyork City
                      </a>
                      <p className="text-gray-500 text-sm">
                        The city that never sleeps
                      </p>
                    </div>
                    <div className="px-6 py-4 flex flex-row items-center">
                      <span className="py-1 text-sm font-regular text-gray-900 mr-1 flex flex-row items-center">
                        cc
                        <span className="ml-1">6 mins ago</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        </div>
      </BlogLayout>
    </>
  );
}
