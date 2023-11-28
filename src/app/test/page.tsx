"use client";

import utils from "@/utils/utils";
import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
const EditorComp = dynamic(
  () => import("../../components/editor/EditorComponent"),
  { ssr: false }
);

const markdown = `
# Hello world!
Check the EditorComponent.tsx file for the code .
`;
export default function TestPage() {
  const [slug, setSlug] = useState("");
  const handleOnchangeText = (e: any) => {
    console.log(e.target.value);
    setSlug(utils.string.slugify(e.target.value));
  };
  return (
    <>
      <div className="flex min-h-screen flex-col items-center">
        {slug}
        <input onChange={(e) => handleOnchangeText(e)} />
        <div>
          Editor:
          <Suspense fallback={null}>
            <EditorComp markdown={markdown} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
