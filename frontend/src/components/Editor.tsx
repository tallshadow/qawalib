// src/components/Editor.ts
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface EditorProps {
  content: string;
  onContentChange: (content: string) => void;
}

const Editor: React.FC<EditorProps> = ({ content, onContentChange }) => {
  return <ReactQuill theme="snow" value={content} onChange={onContentChange} />;
};

export default Editor;
