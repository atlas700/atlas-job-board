"use client";

import { useIsDarkMode } from "@/hooks/useIsDarkMode";
import { cn } from "@/lib/utils";
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  headingsPlugin,
  InsertTable,
  InsertThematicBreak,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  type MDXEditorMethods,
  type MDXEditorProps,
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
