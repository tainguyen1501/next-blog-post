"use client";

import {
  KitchenSinkToolbar,
  MDXEditor,
  MDXEditorMethods,
  SandpackConfig,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  frontmatterPlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  sandpackPlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import { FC, useRef } from "react";

const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim();
interface EditorProps {
  markdown: string;
  onSave: (content: string) => void;
  onChange?: (arg: string) => void;
}
export const virtuosoSampleSandpackConfig: SandpackConfig = {
  defaultPreset: "react",
  presets: [
    {
      label: "React",
      name: "react",
      meta: "live react",
      sandpackTemplate: "react",
      sandpackTheme: "light",
      snippetFileName: "/App.js",
      snippetLanguage: "jsx",
      initialSnippetContent: defaultSnippetContent,
    },
    {
      label: "React",
      name: "react",
      meta: "live",
      sandpackTemplate: "react",
      sandpackTheme: "light",
      snippetFileName: "/App.js",
      snippetLanguage: "jsx",
      initialSnippetContent: defaultSnippetContent,
    },
    {
      label: "Virtuoso",
      name: "virtuoso",
      meta: "live virtuoso",
      sandpackTemplate: "react-ts",
      sandpackTheme: "light",
      snippetFileName: "/App.tsx",
      initialSnippetContent: defaultSnippetContent,
      dependencies: {
        "react-virtuoso": "latest",
        "@ngneat/falso": "latest",
      },
      files: {
        "/data.ts": "",
      },
    },
  ],
};
/**
 * Extend this Component further with the necessary plugins or props you need.
 * proxying the ref is necessary. Next.js dynamically imported components don't support refs.
 */
async function imageUploadHandler(image: File) {
  const formData = new FormData();
  formData.append("file", image);
  try {
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      console.error("something went wrong, check your console.");
      return "";
    }
    const data: { fileUrl: string } = await res.json();
    return data.fileUrl;
  } catch (error) {
    console.error("something went wrong, check your console.");
  }
  return "";
}

const Editor: FC<EditorProps> = ({ markdown, onChange, onSave }) => {
  const ref = useRef<MDXEditorMethods>(null);
  return (
    <MDXEditor
      ref={ref}
      markdown={markdown}
      plugins={[
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <KitchenSinkToolbar />
              <button
                className="btn btn-primary"
                onClick={() => onSave(ref?.current?.getMarkdown() || "")}
              >
                save
              </button>
            </>
          ),
        }),
        listsPlugin(),
        quotePlugin(),
        headingsPlugin({ allowedHeadingLevels: [1, 2, 3] }),
        linkPlugin(),
        linkDialogPlugin(),
        imagePlugin({ imageUploadHandler }),
        tablePlugin(),
        thematicBreakPlugin(),
        frontmatterPlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: "txt" }),
        sandpackPlugin({ sandpackConfig: virtuosoSampleSandpackConfig }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            js: "JavaScript",
            css: "CSS",
            txt: "text",
            tsx: "TypeScript",
          },
        }),
        // directivesPlugin({ directiveDescriptors: [YoutubeDirectiveDescriptor, AdmonitionDirectiveDescriptor] }),
        diffSourcePlugin({
          viewMode: "rich-text",
          diffMarkdown: "boo",
        }),
        markdownShortcutPlugin(),
      ]}
      onChange={onChange}
    />
  );
};

export default Editor;
