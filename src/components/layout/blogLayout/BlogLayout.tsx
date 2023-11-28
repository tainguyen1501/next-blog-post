import React from "react";

import "@/app/globals.css";
import Footer from "./Footer";
import Header from "./Header";
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
