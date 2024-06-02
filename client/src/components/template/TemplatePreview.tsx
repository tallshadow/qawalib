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
  const [workerUrl, setWorkerUrl] = useState<string>("");
  const isPdf = isPdfFile(template.templateFile);

  useEffect(() => {
    const loadPdfJsWorker = async () => {
      const pdfjsWorker = (await import("pdfjs-dist/build/pdf.worker.entry"))
        .default;
      setWorkerUrl(pdfjsWorker);
    };

    if (isPdf) {
      loadPdfJsWorker();
    }

    console.log("**content empty****", content);
    const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
    setIsArabic(arabicRegex.test(content));
  }, [content, isPdf]);

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
    <>
      <DialogTitle>{template.name}</DialogTitle>

      <DialogContent>
        {isEditing && content.trim() ? (
          <ReactQuill
            value={content}
            onChange={setContent}
            style={{
              direction: isArabic ? "rtl" : "ltr",
              textAlign: isArabic ? "right" : "left",
            }}
          />
        ) : (
          <>
            {isPdf && workerUrl ? (
              <Worker workerUrl={workerUrl}>
                <Viewer
                  fileUrl={urlToFile}
                  plugins={[defaultLayoutPluginInstance]}
                />
              </Worker>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </>
  );
};

export default TemplatePreview;
