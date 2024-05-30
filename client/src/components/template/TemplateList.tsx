import React, { useState } from "react";
import { Template } from "../../types";
import { List, ListItem, ListItemText, Button, Dialog } from "@mui/material";
import TemplatePreview from "./TemplatePreview";
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

  async function urlToFile(url: string) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const filename = url.substring(url.lastIndexOf("/") + 1);
      return new File([blob], filename);
    } catch (error) {
      console.error("Error converting URL to file:", error);
      return null;
    }
  }

  const handlePreview = async (template: Template) => {
    try {
      const file = await urlToFile(template.templateFile);

      console.log("file****111", file);

      if (file) setUrlFile(template.templateFile);

      if (!file) {
        console.error("No file selected");
        return;
      }

      if (file.type === "application/pdf") {
        const fileUrl = URL.createObjectURL(file);
        setFileContent(fileUrl);
        setIsPdf(true);

        console.log("file****222", isPdf);
      }
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/convertFileToText`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.text();

      setFileContent(data);
      setSelectedTemplate(template);
      setIsPreviewOpen(true);
    } catch (error) {
      console.error("Error fetching template file content", error);
    }
  };

  const handleDownload = async (url: string) => {
    const file = await urlToFile(url);
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = fileUrl;
      a.download = file.name;
      a.click();
    }
  };

  const handleClose = () => {
    setIsPreviewOpen(false);
    setSelectedTemplate(null);
    setFileContent(null);
  };

  return (
    <>
      <List>
        {templates.map((template) => (
          <ListItem key={template.id} className="list-item">
            <ListItemText
              primary={template.name}
              secondary={template.description}
              className="list-item-text"
            />

            {template.templateFile.endsWith(".pdf") && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => handlePreview(template)}
                className="preview-button"
              >
                Preview
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleDownload(template.templateFile)}
              className="download-button"
            >
              Download
            </Button>
          </ListItem>
        ))}
      </List>
      <Dialog
        open={isPreviewOpen}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        className="dialog"
      >
        {selectedTemplate && fileContent && urlFile && (
          <TemplatePreview
            template={selectedTemplate}
            fileContent={fileContent}
            onClose={handleClose}
            urlToFile={urlFile}
          />
        )}
      </Dialog>
    </>
  );
};

export default TemplateList;
