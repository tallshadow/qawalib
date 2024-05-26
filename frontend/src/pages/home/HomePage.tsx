import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTemplates } from "../../actions/templateActions";
import { RootState } from "../../reducers";
import { Template, TemplatesByCategory } from "../../types";
import "./home.css";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchBar from "../../components/searchBar/SearchBar";
import TemplateList from "../../components/template/TemplateList";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const { templatesByCategory, loading, error } = useSelector(
    (state: RootState) => state.templates
  );
  const [filteredTemplates, setFilteredTemplates] =
    useState<TemplatesByCategory>(templatesByCategory);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  useEffect(() => {
    dispatch<any>(fetchTemplates());
  }, [dispatch]);

  useEffect(() => {
    setFilteredTemplates(templatesByCategory);
    setExpandedCategories([]);
  }, [templatesByCategory]);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredTemplates(templatesByCategory);
      setExpandedCategories([]);
      return;
    }
    const filtered = Object.keys(templatesByCategory).reduce(
      (acc, category) => {
        const filteredTemplates = templatesByCategory[category].filter(
          (template) =>
            template.name.toLowerCase().includes(query.trim().toLowerCase()) ||
            template.category
              ?.toLowerCase()
              .includes(query.trim().toLowerCase()) ||
            template.description
              ?.toLowerCase()
              .includes(query.trim().toLowerCase())
        );
        if (filteredTemplates.length > 0) {
          acc[category] = filteredTemplates;
        }
        return acc;
      },
      {} as TemplatesByCategory
    );

    setFilteredTemplates(filtered);
    setExpandedCategories(Object.keys(filtered));
  };

  const handleAccordionChange = (category: string) => {
    setExpandedCategories((prevExpandedCategories) =>
      prevExpandedCategories.includes(category)
        ? prevExpandedCategories.filter((c) => c !== category)
        : [...prevExpandedCategories, category]
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="homepage-container">
      <Typography variant="h4" className="homepage-title">
        نماذج الخطابات والعقود
      </Typography>
      <Typography paragraph className="homepage-description">
        أكثر من 5000 نموذج من الرسائل و العقود للتحميل
      </Typography>
      <SearchBar onSearch={handleSearch} />
      <div className="templates-section">
        {Object.entries(filteredTemplates).map(([category, templates]) => (
          <Accordion
            key={category}
            className="template-category"
            expanded={expandedCategories.includes(category)}
            onChange={() => handleAccordionChange(category)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              className="template-category-list"
            >
              <Typography variant="h6" className="category-title">
                {category}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TemplateList templates={templates} />
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
