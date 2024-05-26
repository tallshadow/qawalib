// src/components/TemplateSelector.ts
import React from "react";

interface TemplateSelectorProps {
  onTemplateSelect: (templateId: string) => void;
  templates: { id: string; name: string }[];
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  onTemplateSelect,
  templates,
}) => {
  return (
    <div>
      <h2>Select a Template</h2>
      <select onChange={(e) => onTemplateSelect(e.target.value)}>
        {templates.map((template) => (
          <option key={template.id} value={template.id}>
            {template.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TemplateSelector;
