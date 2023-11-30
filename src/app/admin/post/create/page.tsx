"use client";

import utils from "@/utils/utils";
import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import "@/app/style.css";
const EditorComp = dynamic(
  () => import("@/components/editor/EditorComponent"),
  { ssr: false }
);

const markdown = `
# Hello world!
Check the EditorComponent.tsx file for the code .
`;
export default function CreatePostPage() {
  const [slug, setSlug] = useState("");
  const handleOnchangeText = (e: any) => {
    console.log(e.target.value);
    setSlug(utils.string.slugify(e.target.value));
  };
  const editorOnChangeHandle = (val: string) => {
    console.log(val);
  };
  return (
    <div className="container" style={{ position: "relative" }}>
      <div className="flex min-h-screen flex-col items-center">
        {slug}
        <input onChange={(e) => handleOnchangeText(e)} />
        <div>
          Editor:
          <Suspense fallback={null}>
            <EditorComp markdown={markdown} onChange={editorOnChangeHandle} />
          </Suspense>
        </div>
      </div>
      <div className="btn-group">
        <div>
          <button
            className="btn-circle btn-danger"
            style={{ marginBottom: 10 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-rotate-ccw"
            >
              <polyline points="1 4 1 10 7 10"></polyline>
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
            </svg>
          </button>
        </div>

        <button
          // onClick={() => onSavePost()}
          className="btn-circle btn-primary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-save"
          >
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
            <polyline points="17 21 17 13 7 13 7 21"></polyline>
            <polyline points="7 3 7 8 15 8"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
}
