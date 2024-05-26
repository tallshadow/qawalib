// src/components/template/TemplatePreview.tsx
import React, { useState, useEffect } from "react";
import { Template } from "../../types";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import ReactQuill from "react-quill";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "react-quill/dist/quill.snow.css";

interface TemplatePreviewProps {
  template: Template;
  fileContent: string;
  onClose: () => void;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({
  template,
  fileContent,
  onClose,
}) => {
  const [content, setContent] = useState<string>(fileContent);
  const [isEditing, setIsEditing] = useState(false);
  const [isArabic, setIsArabic] = useState<boolean>(false);

  useEffect(() => {
    // Check if the content contains Arabic characters
    const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
    setIsArabic(arabicRegex.test(content));
  }, [content]);

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    setIsEditing(false);
    // Optionally, send the updated content to the server or update the state
  };

  const handleDownload = async () => {
    const doc = new jsPDF("p", "mm", "a4");
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = doc.internal.pageSize.getHeight();

    // Create a hidden div with the content
    const element = document.createElement("div");
    element.innerHTML = content;
    element.style.width = `${pdfWidth * 2}px`; // Adjusting the width for better scaling
    element.style.padding = "20px";
    element.style.boxSizing = "border-box";
    element.style.fontSize = "12px"; // Adjust the font size as needed
    if (isArabic) {
      element.style.direction = "rtl"; // Set text direction to right-to-left for Arabic
      element.style.textAlign = "right"; // Align text to the right for Arabic
    } else {
      element.style.direction = "ltr"; // Set text direction to left-to-right for other languages
      element.style.textAlign = "left"; // Align text to the left for other languages
    }
    document.body.appendChild(element);

    // Convert the div to a canvas
    const canvas = await html2canvas(element, { scale: 2 });
    document.body.removeChild(element);

    // Calculate the image dimensions
    const imgData = canvas.toDataURL("image/png");
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    // Add the canvas image to the PDF
    doc.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    doc.save(`${template.name}.pdf`);
  };

  return (
    <>
      <DialogTitle>{template.name}</DialogTitle>
      <DialogContent>
        {isEditing ? (
          <ReactQuill value={content} onChange={setContent} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: content }} />
        )}
      </DialogContent>
      <DialogActions>
        {isEditing ? (
          <Button onClick={handleSave} color="primary" variant="contained">
            Save
          </Button>
        ) : (
          <Button onClick={handleEdit} color="primary" variant="contained">
            Edit
          </Button>
        )}
        <Button onClick={handleDownload} color="primary" variant="contained">
          Download
        </Button>
        <Button onClick={onClose} color="secondary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </>
  );
};

export default TemplatePreview;
