"use client";

import * as React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import CharacterCount from "@tiptap/extension-character-count";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  content?: string;
  placeholder?: string;
  onChange?: (content: string) => void;
  className?: string;
  title?: string;
  description?: string;
  readOnly?: boolean;
}

export function RichTextEditor({
  content = "",
  placeholder = "Start writing...",
  onChange,
  className,
  title = "Rich Text Editor",
  description = "Format your content with the toolbar below",
  readOnly = false,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-moloch-400 hover:text-moloch-300 underline",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      CharacterCount,
    ],
    content,
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = window.prompt("Enter the URL");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    const url = window.prompt("Enter the image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const ToolbarButton = ({
    onClick,
    isActive = false,
    icon: Icon,
    title,
  }: {
    onClick: () => void;
    isActive?: boolean;
    icon: React.ComponentType<{ className?: string }>;
    title: string;
  }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={cn(
        "h-8 w-8 p-0",
        isActive && "bg-moloch-500 text-white hover:bg-moloch-600"
      )}
      title={title}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );

  return (
    <div className={cn("space-y-4", className)}>
      <Card>
        <CardHeader>
          <CardTitle className="font-display">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Toolbar */}
          {!readOnly && (
            <div className="border rounded-lg p-2 bg-muted/50">
              <div className="flex flex-wrap items-center gap-1">
                {/* Text Formatting */}
                <div className="flex items-center gap-1">
                  <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive("bold")}
                    icon={Bold}
                    title="Bold"
                  />
                  <ToolbarButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive("italic")}
                    icon={Italic}
                    title="Italic"
                  />
                  <ToolbarButton
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    isActive={editor.isActive("strike")}
                    icon={Strikethrough}
                    title="Strikethrough"
                  />
                  <ToolbarButton
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    isActive={editor.isActive("code")}
                    icon={Code}
                    title="Code"
                  />
                </div>

                <Separator orientation="vertical" className="h-6" />

                {/* Headings */}
                <div className="flex items-center gap-1">
                  <ToolbarButton
                    onClick={() =>
                      editor.chain().focus().toggleHeading({ level: 1 }).run()
                    }
                    isActive={editor.isActive("heading", { level: 1 })}
                    icon={Heading1}
                    title="Heading 1"
                  />
                  <ToolbarButton
                    onClick={() =>
                      editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                    isActive={editor.isActive("heading", { level: 2 })}
                    icon={Heading2}
                    title="Heading 2"
                  />
                  <ToolbarButton
                    onClick={() =>
                      editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                    isActive={editor.isActive("heading", { level: 3 })}
                    icon={Heading3}
                    title="Heading 3"
                  />
                </div>

                <Separator orientation="vertical" className="h-6" />

                {/* Lists */}
                <div className="flex items-center gap-1">
                  <ToolbarButton
                    onClick={() =>
                      editor.chain().focus().toggleBulletList().run()
                    }
                    isActive={editor.isActive("bulletList")}
                    icon={List}
                    title="Bullet List"
                  />
                  <ToolbarButton
                    onClick={() =>
                      editor.chain().focus().toggleOrderedList().run()
                    }
                    isActive={editor.isActive("orderedList")}
                    icon={ListOrdered}
                    title="Numbered List"
                  />
                  <ToolbarButton
                    onClick={() =>
                      editor.chain().focus().toggleBlockquote().run()
                    }
                    isActive={editor.isActive("blockquote")}
                    icon={Quote}
                    title="Quote"
                  />
                </div>

                <Separator orientation="vertical" className="h-6" />

                {/* Alignment */}
                <div className="flex items-center gap-1">
                  <ToolbarButton
                    onClick={() =>
                      editor.chain().focus().setTextAlign("left").run()
                    }
                    isActive={editor.isActive({ textAlign: "left" })}
                    icon={AlignLeft}
                    title="Align Left"
                  />
                  <ToolbarButton
                    onClick={() =>
                      editor.chain().focus().setTextAlign("center").run()
                    }
                    isActive={editor.isActive({ textAlign: "center" })}
                    icon={AlignCenter}
                    title="Align Center"
                  />
                  <ToolbarButton
                    onClick={() =>
                      editor.chain().focus().setTextAlign("right").run()
                    }
                    isActive={editor.isActive({ textAlign: "right" })}
                    icon={AlignRight}
                    title="Align Right"
                  />
                  <ToolbarButton
                    onClick={() =>
                      editor.chain().focus().setTextAlign("justify").run()
                    }
                    isActive={editor.isActive({ textAlign: "justify" })}
                    icon={AlignJustify}
                    title="Justify"
                  />
                </div>

                <Separator orientation="vertical" className="h-6" />

                {/* Links and Images */}
                <div className="flex items-center gap-1">
                  <ToolbarButton
                    onClick={addLink}
                    isActive={editor.isActive("link")}
                    icon={LinkIcon}
                    title="Add Link"
                  />
                  <ToolbarButton
                    onClick={addImage}
                    icon={ImageIcon}
                    title="Add Image"
                  />
                </div>

                <Separator orientation="vertical" className="h-6" />

                {/* History */}
                <div className="flex items-center gap-1">
                  <ToolbarButton
                    onClick={() => editor.chain().focus().undo().run()}
                    icon={Undo}
                    title="Undo"
                  />
                  <ToolbarButton
                    onClick={() => editor.chain().focus().redo().run()}
                    icon={Redo}
                    title="Redo"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Editor Content */}
          <div className="border rounded-lg min-h-[200px] p-4 bg-background">
            <EditorContent
              editor={editor}
              className={cn(
                "prose prose-invert max-w-none",
                "prose-headings:font-display prose-headings:text-foreground",
                "prose-p:text-foreground prose-p:leading-relaxed",
                "prose-strong:text-moloch-400 prose-strong:font-semibold",
                "prose-em:text-scroll-400 prose-em:italic",
                "prose-code:text-moloch-300 prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded",
                "prose-blockquote:border-l-moloch-500 prose-blockquote:text-muted-foreground",
                "prose-a:text-moloch-400 prose-a:no-underline hover:prose-a:text-moloch-300",
                "prose-ul:list-disc prose-ol:list-decimal",
                "prose-li:text-foreground",
                "focus:outline-none"
              )}
            />
          </div>

          {/* Character Count */}
          <div className="text-xs text-muted-foreground text-right">
            {editor.storage.characterCount.characters()} characters
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
