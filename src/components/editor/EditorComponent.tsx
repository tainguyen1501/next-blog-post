'use client'

import { MDXEditor, MDXEditorMethods, headingsPlugin, toolbarPlugin } from "@mdxeditor/editor"
import {FC} from 'react'
import {
  AdmonitionDirectiveDescriptor,
  UndoRedo,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  directivesPlugin,
  frontmatterPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  sandpackPlugin,
  tablePlugin,
  thematicBreakPlugin,
  Separator,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CreateLink,
  DiffSourceToggleWrapper,
  InsertImage,
  ListsToggle,
  KitchenSinkToolbar,
  SandpackConfig
} from "@mdxeditor/editor"

const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim()
const dataCode = ''
interface EditorProps {
  markdown: string
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>
}
export const virtuosoSampleSandpackConfig: SandpackConfig = {
  defaultPreset: 'react',
  presets: [
    {
      label: 'React',
      name: 'react',
      meta: 'live react',
      sandpackTemplate: 'react',
      sandpackTheme: 'light',
      snippetFileName: '/App.js',
      snippetLanguage: 'jsx',
      initialSnippetContent: defaultSnippetContent
    },
    {
      label: 'React',
      name: 'react',
      meta: 'live',
      sandpackTemplate: 'react',
      sandpackTheme: 'light',
      snippetFileName: '/App.js',
      snippetLanguage: 'jsx',
      initialSnippetContent: defaultSnippetContent
    },
    {
      label: 'Virtuoso',
      name: 'virtuoso',
      meta: 'live virtuoso',
      sandpackTemplate: 'react-ts',
      sandpackTheme: 'light',
      snippetFileName: '/App.tsx',
      initialSnippetContent: defaultSnippetContent,
      dependencies: {
        'react-virtuoso': 'latest',
        '@ngneat/falso': 'latest'
      },
      files: {
        '/data.ts': dataCode
      }
    }
  ]
}
/**
 * Extend this Component further with the necessary plugins or props you need.
 * proxying the ref is necessary. Next.js dynamically imported components don't support refs. 
*/
async function imageUploadHandler(image: File) {
  const formData = new FormData()
  formData.append('image', image)
  // send the file to your server and return 
  // the URL of the uploaded image in the response
  const response = await fetch('/uploads/new', { 
      method: 'POST', 
      body: formData 
  })
  const json = (await response.json()) as { url: string }
  // return json.url
  return 'https://picsum.photos/200'
}

const Editor: FC<EditorProps> = ({ markdown, editorRef }) => {
  return <MDXEditor ref={editorRef} markdown={markdown} 
  plugins={[
    toolbarPlugin({ toolbarContents: () => <><KitchenSinkToolbar /></>}),
    listsPlugin(),
    quotePlugin(),
    headingsPlugin({ allowedHeadingLevels: [1, 2, 3] }),
    linkPlugin(),
    linkDialogPlugin(),
    imagePlugin({ imageUploadHandler }),
    // imagePlugin({ 
    //   imageUploadHandler: (image) => {
    //     console.log(image)
    //     return imageUploadHandler(image)//Promise.resolve('https://picsum.photos/200/300')
    //   },
    //   // imageAutocompleteSuggestions: [
    //   //   'https://picsum.photos/200/300',
    //   //   'https://picsum.photos/200',
    //   // ]
    // }),
    tablePlugin(),
    thematicBreakPlugin(),
    frontmatterPlugin(),
    codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
    sandpackPlugin({ sandpackConfig: virtuosoSampleSandpackConfig }),
    codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'text', tsx: 'TypeScript' } }),
    // directivesPlugin({ directiveDescriptors: [YoutubeDirectiveDescriptor, AdmonitionDirectiveDescriptor] }),
    diffSourcePlugin({ 
      viewMode: 'rich-text', diffMarkdown: 'boo'}),
    markdownShortcutPlugin()
  ]}



/>
}

export default Editor
