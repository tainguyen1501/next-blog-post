import "@/app/globals.css";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
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
      <div className="max-w-screen-xl mx-auto  pt-16 lg:pt-24">{children}</div>
    </div>
  );
}
