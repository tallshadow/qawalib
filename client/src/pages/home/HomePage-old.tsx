// src/pages/HomePage.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTemplates } from "../../actions/templateActions";
import { RootState } from "../../reducers";
import { Template, TemplatesByCategory } from "../../types"; // Ensure this type is correctly defined to map categories to their templates
import { Link } from "react-router-dom";
import "./home.css";
import { Typography } from "@mui/material";
import SearchBar from "../../components/searchBar/SearchBar";
import TemplateList from "../../components/template/TemplateList";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const { templatesByCategory, loading, error } = useSelector(
    (state: RootState) => state.templates
  );
  const [filteredTemplates, setFilteredTemplates] =
    useState<TemplatesByCategory>(templatesByCategory);

  useEffect(() => {
    dispatch<any>(fetchTemplates());
  }, [dispatch]);

  useEffect(() => {
    setFilteredTemplates(templatesByCategory);
  }, [templatesByCategory]);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      // If the query is empty, reset the filtered templates to show all
      setFilteredTemplates(templatesByCategory);
      return;
    }
    const filtered = Object.keys(templatesByCategory).reduce(
      (acc, category) => {
        const filteredTemplates = templatesByCategory[category].filter(
          (template) =>
            template.name.toLowerCase().includes(query.trim().toLowerCase())
        );
        if (filteredTemplates.length > 0) {
          acc[category] = filteredTemplates;
        }
        return acc;
      },
      {} as TemplatesByCategory
    );

    setFilteredTemplates(filtered);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4">Welcome to My App</Typography>
      <Typography paragraph>
        This is a simple example of a clean and accessible homepage.
      </Typography>
      <div>
        <SearchBar onSearch={handleSearch} />
        {Object.entries(filteredTemplates).map(([category, templates]) => (
          <div key={category}>
            <Typography variant="h6">{category}</Typography>
            <TemplateList templates={templates} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
