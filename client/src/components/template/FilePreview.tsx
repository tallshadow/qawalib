import React, { useEffect, useState } from "react";
import mammoth from "mammoth";
import { Template } from "../../types";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
interface FilePreviewProps {
  fileUrl: string;
  template: Template;
  onClose: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({
  template,
  fileUrl,
  onClose,
}) => {
  const [htmlContent, setHtmlContent] = useState<string>("");

  useEffect(() => {
    fetch(fileUrl)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => {
        mammoth
          .convertToHtml({ arrayBuffer })
          .then((result) => {
            setHtmlContent(result.value);
          })
          .catch((error) => {
            console.error("Error converting .docx to HTML:", error);
          });
      });
  }, [fileUrl]);

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f0f0f0",
    },
    document: {
      //   maxWidth: "800px",
      width: "100%",
      padding: "3em",
      backgroundColor: "#ffffff",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      borderRadius: "5px",
      overflow: "auto",
    },
  };

  return (
    <>
      <DialogTitle>{template.name}</DialogTitle>
      <hr />
      <DialogContent>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        <DialogActions>
          <Button onClick={onClose} color="secondary" variant="contained">
            Close
          </Button>
        </DialogActions>
      </DialogContent>
    </>
  );
};

export default FilePreview;
