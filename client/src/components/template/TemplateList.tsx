import React, { useState, useEffect } from "react";
import { Template } from "../../types";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  Pagination,
} from "@mui/material";
import TemplatePreview from "./TemplatePreview";
import FilePreview from "./FilePreview";
import "./TemplateList.css";

interface TemplateListProps {
  templates: Template[];
}

const TemplateList: React.FC<TemplateListProps> = ({ templates }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [urlFile, setUrlFile] = useState("");
  const [isPdf, setIsPdf] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 7;

  const handlePreview = (template: Template) => {
    setSelectedTemplate(template);
    setUrlFile(template.templateFile);
    setIsPdf(template.templateFile.endsWith(".pdf"));
    setIsPreviewOpen(true);
  };

  const handleDownload = (fileUrl: string) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClose = () => {
    setIsPreviewOpen(false);
    setSelectedTemplate(null);
    setFileContent(null);
    setUrlFile("");
    setIsPdf(false);
  };

  useEffect(() => {
    if (isPreviewOpen && selectedTemplate && !isPdf) {
      const fetchFileContent = async () => {
        try {
          const response = await fetch(selectedTemplate.templateFile);
          const content = await response.text();
          setFileContent(content);
        } catch (error) {
          console.error("Error fetching file content:", error);
        }
      };

      fetchFileContent();
    }

    return () => {
      setFileContent(null);
    };
  }, [isPreviewOpen, selectedTemplate, isPdf]);

  // Calculate the templates to display for the current page
  const indexOfLastTemplate = currentPage * categoriesPerPage;
  const indexOfFirstTemplate = indexOfLastTemplate - categoriesPerPage;
  const currentTemplates = templates.slice(
    indexOfFirstTemplate,
    indexOfLastTemplate
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <>
      <List>
        {currentTemplates.map((template) => (
          <ListItem key={template.id} className="list-item">
            <ListItemText
              primary={template.name}
              secondary={template.description}
              className="list-item-text"
            />
            {(template.templateFile.endsWith(".pdf") ||
              template.templateFile.endsWith(".doc") ||
              template.templateFile.endsWith(".docx")) && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => handlePreview(template)}
                className="preview-button"
              >
                معاينة
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleDownload(template.templateFile)}
              className="download-button"
            >
              تحميل
            </Button>
          </ListItem>
        ))}
      </List>
      <Pagination
        count={Math.ceil(templates.length / categoriesPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
      />
      <Dialog
        open={isPreviewOpen}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        className="dialog"
      >
        {selectedTemplate && (
          <>
            {isPdf ? (
              <TemplatePreview
                template={selectedTemplate}
                fileContent={fileContent || ""}
                onClose={handleClose}
                urlToFile={urlFile}
              />
            ) : (
              <FilePreview
                fileUrl={urlFile}
                onClose={handleClose}
                template={selectedTemplate}
              />
            )}
          </>
        )}
      </Dialog>
    </>
  );
};

export default TemplateList;
