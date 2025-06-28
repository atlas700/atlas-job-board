"use client";

import { useIsDarkMode } from "@/hooks/useIsDarkMode";
import { cn } from "@/lib/utils";
import {
  headingsPlugin,
  listsPlugin,
  MDXEditor,
  tablePlugin,
  quotePlugin,
  toolbarPlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  linkPlugin,
  type MDXEditorMethods,
  type MDXEditorProps,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  ListsToggle,
  InsertThematicBreak,
  InsertTable,
  InsertCodeBlock,
  codeBlockPlugin,
} from "@mdxeditor/editor";
import type { Ref } from "react";

export default function InternalMarkdownEditor({
  ref,
  className,
  ...props
}: MDXEditorProps & { ref?: Ref<MDXEditorMethods> }) {
  const isDarkMode = useIsDarkMode();

  const markDownClassNames =
    "max-w-none prose prose-neutral font-sans dark:prose-invert";

  return (
    <MDXEditor
      {...props}
      ref={ref}
      className={cn(markDownClassNames, isDarkMode && "dark-theme", className)}
      suppressHtmlProcessing
      plugins={[
        headingsPlugin(),
        tablePlugin(),
        listsPlugin(),
        linkPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <BlockTypeSelect />
              <BoldItalicUnderlineToggles />
              <ListsToggle />
              <InsertThematicBreak />
              <InsertTable />
            </>
          ),
        }),
      ]}
    />
  );
}
