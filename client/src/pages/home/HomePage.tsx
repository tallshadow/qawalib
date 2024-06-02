import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTemplates } from "../../actions/templateActions";
import { RootState } from "../../reducers";
import { TemplatesByCategory } from "../../types";
import "./home.css";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Pagination,
  CircularProgress,
  Box,
} from "@mui/material";
import SearchBar from "../../components/searchBar/SearchBar";
import TemplateList from "../../components/template/TemplateList";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const { templatesByCategory, loading, error } = useSelector(
    (state: RootState) => state.templates
  );
  const [filteredTemplates, setFilteredTemplates] =
    useState<TemplatesByCategory>(templatesByCategory);
  const [page, setPage] = useState(1);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const categoriesPerPage = 6;

  useEffect(() => {
    dispatch<any>(fetchTemplates());
  }, [dispatch]);

  useEffect(() => {
    setFilteredTemplates(templatesByCategory);
  }, [templatesByCategory]);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredTemplates(templatesByCategory);
      setPage(1);
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
    setPage(1);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleAccordionChange = (category: string) => {
    setExpandedCategories((prevExpandedCategories) =>
      prevExpandedCategories.includes(category)
        ? prevExpandedCategories.filter((c) => c !== category)
        : [...prevExpandedCategories, category]
    );
  };

  const categories = Object.keys(filteredTemplates);
  const displayedCategories = categories.slice(
    (page - 1) * categoriesPerPage,
    page * categoriesPerPage
  );

  return (
    <div className="homepage-container">
      <Typography variant="h1" className="homepage-title">
        نماذج الخطابات والعقود
      </Typography>
      <Typography paragraph className="homepage-description">
        أكثر من 5000 نموذج من الرسائل و العقود للتحميل
      </Typography>
      <SearchBar onSearch={handleSearch} />
      <div className="templates-section">
        {loading ? (
          <Box className="loading-container">
            <CircularProgress />
            <Typography>جار التحميل...</Typography>
          </Box>
        ) : error ? (
          <Typography>Error: {error}</Typography>
        ) : (
          <>
            <Grid container spacing={3}>
              {displayedCategories.map((category) => (
                <Grid item xs={12} sm={6} md={4} key={category}>
                  <Card className="category-card">
                    <CardContent>
                      <Typography variant="h6" className="category-title">
                        {category}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => handleAccordionChange(category)}
                      >
                        عرض القوالب
                      </Button>
                    </CardActions>
                    {expandedCategories.includes(category) && (
                      <TemplateList templates={filteredTemplates[category]} />
                    )}
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Pagination
              count={Math.ceil(categories.length / categoriesPerPage)}
              page={page}
              onChange={handlePageChange}
              className="pagination"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
