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
                          Best View in Newyork City
                        </a>
                        <p className="text-gray-500 text-sm">
                          The city that never sleeps
                        </p>
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
                            <a href="/cdn-cgi/l/email-protection">
                              tainguyen@gmail.com
                            </a>
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
                  </div>
                );
              })}
          </div>

          <div>
            <div
              className={`rounded-xl overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] animate-pulse`}
            >
              {/* image */}
              <div className="w-full aspect-video bg-slate-300" />
              <div className="p-5">
                {/* title */}
                <div className="w-56 h-2 mt-4 bg-slate-300 rounded-lg" />
                {/* caption */}
                <div className="w-24 h-2 mt-4 bg-slate-300 rounded-lg" />
                <div className="flex justify-between flex-nowrap items-center mt-6">
                  <div className="flex items-center gap-x-2 md:gap-x-2.5">
                    {/* profile image */}
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-300" />
                    <div className="flex flex-col">
                      {/* user's name */}
                      <div className="w-24 h-2 bg-slate-300 rounded-lg" />
                      {/* verified status */}
                      <div className="w-16 h-2 mt-2 bg-slate-300 rounded-lg" />
                    </div>
                  </div>
                  {/* date */}
                  <div className="w-10 h-2 mt-4 bg-slate-300 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </BlogLayout>
    </>
  );
}
