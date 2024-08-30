import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./editor.css";

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="control-group">
      <div className="button-group">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={
            editor.isActive("bold")
              ? "p-2 bg-slate-300 rounded-md m-1"
              : "p-2 bg-slate-200 rounded-md m-1"
          }
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={
            editor.isActive("italic")
              ? "p-2 bg-slate-300 rounded-md m-1"
              : "p-2 bg-slate-200 rounded-md m-1"
          }
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={
            editor.isActive("strike")
              ? "p-2 bg-slate-300 rounded-md m-1"
              : "p-2 bg-slate-200 rounded-md m-1"
          }
        >
          Strike
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={
            editor.isActive("code")
              ? "p-2 bg-slate-300 rounded-md m-1"
              : "p-2 bg-slate-200 rounded-md m-1"
          }
        >
          Code
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={
            editor.isActive("paragraph")
              ? "p-2 bg-slate-300 rounded-md m-1"
              : "p-2 bg-slate-200 rounded-md m-1"
          }
        >
          Paragraph
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 })
              ? "p-2 bg-slate-300 rounded-md m-1"
              : "p-2 bg-slate-200 rounded-md m-1"
          }
        >
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 })
              ? "p-2 bg-slate-300 rounded-md m-1"
              : "p-2 bg-slate-200 rounded-md m-1"
          }
        >
          H2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 })
              ? "p-2 bg-slate-300 rounded-md m-1"
              : "p-2 bg-slate-200 rounded-md m-1"
          }
        >
          H3
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive("heading", { level: 4 })
              ? "p-2 bg-slate-300 rounded-md m-1"
              : "p-2 bg-slate-200 rounded-md m-1"
          }
        >
          H4
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive("bulletList")
              ? "p-2 bg-slate-300 rounded-md m-1"
              : "p-2 bg-slate-200 rounded-md m-1"
          }
        >
          Bullet list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive("orderedList")
              ? "p-2 bg-slate-300 rounded-md m-1"
              : "p-2 bg-slate-200 rounded-md m-1"
          }
        >
          Ordered list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={
            editor.isActive("codeBlock")
              ? "p-2 bg-slate-300 rounded-md m-1"
              : "p-2 bg-slate-200 rounded-md m-1"
          }
        >
          Code block
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={
            editor.isActive("blockquote")
              ? "p-2 bg-slate-300 rounded-md m-1"
              : "p-2 bg-slate-200 rounded-md m-1"
          }
        >
          Blockquote
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-2 bg-slate-200 rounded-md m-1"
        >
          Horizontal rule
        </button>
        <button
          onClick={() => editor.chain().focus().setHardBreak().run()}
          className="p-2 bg-slate-200 rounded-md m-1"
        >
          Hard break
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="p-2 bg-slate-200 rounded-md m-1"
        >
          Undo
        </button>
      </div>
    </div>
  );
};

export default function Editor({
  content,
  onChange,
}: {
  content: string;
  onChange: (content: string) => void;
}) {
  return (
    <EditorProvider
      slotBefore={<MenuBar />}
      extensions={extensions}
      editorProps={{
        attributes: {
          class: "prose prose-base m-5 focus:outline-none",
        },
      }}
      content={content}
      onUpdate={(props) => {
        onChange(props.editor.getHTML());
      }}
    ></EditorProvider>
  );
}
