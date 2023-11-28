import React from "react";
import PropTypes from "prop-types";

import "@/app/globals.css";
import Header from "./Header";
import Footer from "./Footer";
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
