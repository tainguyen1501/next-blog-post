"use client";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";
import React from "react";
import PropTypes from "prop-types";

MDXContent.propTypes = {};

function MDXContent({ source }: { source: MDXRemoteProps }) {
  return (
    <div>
        data 33
      <MDXRemote {...source} />
    </div>
  );
}

export default MDXContent;
