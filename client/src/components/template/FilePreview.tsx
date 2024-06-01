import React, { useEffect, useState } from "react";
import mammoth from "mammoth";
import { Template } from "../../types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";

import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (fileUrl.endsWith(".docx")) {
      fetch(fileUrl)
        .then((response) => response.arrayBuffer())
        .then((arrayBuffer) => {
          return mammoth.convertToHtml({ arrayBuffer });
        })
        .then((result) => {
          setHtmlContent(result.value);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error converting .docx to HTML:", error);
          setError("Failed to load .docx file.");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [fileUrl]);

  return (
    <Dialog open onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{template.name}</DialogTitle>
      <DialogContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="400px"
          p={2}
          sx={{ backgroundColor: "#f0f0f0", borderRadius: 2 }}
        >
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : fileUrl.endsWith(".docx") ? (
            <Box
              sx={{
                width: "100%",
                maxHeight: "500px",
                overflowY: "auto",
                backgroundColor: "#ffffff",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "5px",
                p: 3,
              }}
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          ) : (
            <DocViewer
              pluginRenderers={DocViewerRenderers}
              documents={[{ uri: fileUrl, fileType: "doc" }]}
              style={{ width: "100%", height: "500px", borderRadius: "5px" }}
            />
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilePreview;
