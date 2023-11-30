import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import "@/app/globals.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (!session) {
    redirect("/signin");
  }
  return (
    <div>
      <Header />

      <div className="flex overflow-hidden bg-white pt-16">
        <Sidebar />
        <div
          className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
          id="sidebarBackdrop"
        ></div>
        <div
          id="main-content"
          className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64"
        >
          <main>
            <div className="pt-6 px-4">
              <div className="w-full">
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
                  {children}
                </div>
              </div>
            </div>
          </main>
      
          <p className="text-center text-sm text-gray-500 my-10">
            &copy; 2023{" "}
            <a href="#" className="hover:underline" target="_blank">
              Wixo
            </a>
            . All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
