// src/pages/CategoryPage.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import TemplateList from "../../components/template/TemplateList";
import { Template } from "../../types";

// Mock data: Replace this with your actual data fetching logic
const templates: Template[] = [
  {
    id: 1,
    name: "Template 1",
    category: "Category1",
    templateFile: "Content of Template 1",
  },
  {
    id: 2,
    name: "Template 2",
    category: "Category1",
    templateFile: "Content of Template 2",
  },
];

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();

  const filteredTemplates = templates.filter(
    (template) => template.category === category
  );

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4">{category}</Typography>
      <TemplateList templates={filteredTemplates} />
    </div>
  );
};

export default CategoryPage;
