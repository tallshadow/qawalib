import React, { useState } from "react";
import TemplateSelector from "../../components/template/TemplateSelector";
import Editor from "../../components/Editor";

const TemplatePage: React.FC = () => {
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [editorContent, setEditorContent] = useState("");

  const templates = [
    { id: "1", name: "Business Letter" },
    { id: "2", name: "Formal Complaint" },
  ];

  return (
    <div>
      <TemplateSelector
        templates={templates}
        onTemplateSelect={setSelectedTemplateId}
      />
      <Editor content={editorContent} onContentChange={setEditorContent} />
    </div>
  );
};

export default TemplatePage;
