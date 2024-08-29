import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider } from "@tiptap/react";
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

export default function Editor({
  content,
  onChange,
}: {
  content: string;
  onChange: (content: string) => void;
}) {
  return (
    <EditorProvider
      // slotBefore={<MenuBar />}
      extensions={extensions}
      editorProps={{
        attributes: {
          class:
            "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
        },
      }}
      content={content}
      onUpdate={() => {
        console.log(content);
        onChange(content);
      }}
    ></EditorProvider>
  );
}
