import React, { useState, useEffect } from "react";
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
import ReactQuill from "react-quill";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "react-quill/dist/quill.snow.css";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { isPdfFile } from "../../utils/fileUtils";

interface TemplatePreviewProps {
  template: Template;
  fileContent: string;
  onClose: () => void;
  urlToFile: string;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({
  template,
  fileContent,
  onClose,
  urlToFile,
}) => {
  const [content, setContent] = useState<string>(fileContent);
  const [isEditing, setIsEditing] = useState(false);
  const [isArabic, setIsArabic] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const isPdf = isPdfFile(template.templateFile);

  useEffect(() => {
    const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
    setIsArabic(arabicRegex.test(content));
    setLoading(false);
  }, [content]);

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    setIsEditing(false);
    // Optionally, send the updated content to the server or update the state
  };

  const handleDownload = async () => {
    const doc = new jsPDF("p", "mm", "a4");
    const pdfWidth = doc.internal.pageSize.getWidth();

    const element = document.createElement("div");
    element.innerHTML = content;
    element.style.width = `${pdfWidth * 2}px`;
    element.style.padding = "20px";
    element.style.boxSizing = "border-box";
    element.style.fontSize = "12px";
    if (isArabic) {
      element.style.direction = "rtl";
      element.style.textAlign = "right";
    } else {
      element.style.direction = "ltr";
      element.style.textAlign = "left";
    }
    document.body.appendChild(element);

    const canvas = await html2canvas(element, { scale: 2 });
    document.body.removeChild(element);

    const imgData = canvas.toDataURL("image/png");
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    doc.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    doc.save(`${template.name}.pdf`);
  };

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

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
          ) : isEditing && content.trim() ? (
            <ReactQuill
              value={content}
              onChange={setContent}
              style={{
                direction: isArabic ? "rtl" : "ltr",
                textAlign: isArabic ? "right" : "left",
              }}
            />
          ) : isPdf ? (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <Viewer
                fileUrl={urlToFile}
                plugins={[defaultLayoutPluginInstance]}
              />
            </Worker>
          ) : (
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
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        {isEditing ? (
          <>
            <Button onClick={handleSave} color="primary" variant="contained">
              Save
            </Button>
            <Button
              onClick={handleDownload}
              color="primary"
              variant="contained"
            >
              Download
            </Button>
          </>
        ) : (
          <Button onClick={handleEdit} color="primary" variant="contained">
            Edit
          </Button>
        )}
        <Button onClick={onClose} color="secondary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TemplatePreview;
