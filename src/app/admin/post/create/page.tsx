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
    </div>
  );
}
