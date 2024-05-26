import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import mammoth from "mammoth";
import jsPDF from "jspdf";
import fontkit from "@pdf-lib/fontkit";
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
// import fs from "fs";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import * as mammoth from "mammoth";
import htmlDocx from "html-to-docx";

interface TemplateItemProps {
  id: string;
  name: string;
  category: string;
  description?: string;
  templateFile: string;
}

const corsAnywhereUrl = "https://cors-anywhere.herokuapp.com/";
const fontUrl =
  "https://raw.githack.com/MrRio/jsPDF/master/test/reference/Amiri-Regular.ttf";

const TemplateItem: React.FC<TemplateItemProps> = ({
  id,
  name,
  category,
  description,
  templateFile,
}) => {
  const [content, setContent] = useState<string>("");
  const quillRef = useRef<ReactQuill>(null);

  const handleDownloadPdf22 = async () => {
    if (quillRef.current) {
      const quillContent = quillRef.current?.editor?.root.innerHTML || "";

      const pdfDoc = new jsPDF();
      const fontSize = 12; // Adjust font size as needed
      const lineHeight = fontSize * 1.2; // Calculate line height based on font size

      try {
        // Fetch the font file and convert it to ArrayBuffer

        const fontResponse = await fetch(corsAnywhereUrl + fontUrl);
        if (!fontResponse.ok) {
          throw new Error("Failed to fetch font file");
        }
        const fontBuffer = await fontResponse.arrayBuffer();

        // Convert the font buffer to a base64-encoded string
        const fontBase64 = Buffer.from(fontBuffer).toString("base64");

        // Embed the font into the document
        pdfDoc.addFileToVFS("Amiri-Regular.ttf", fontBase64);
        pdfDoc.addFont("Amiri-Regular.ttf", "Amiri-Regular", "normal");
        pdfDoc.setFont("Amiri-Regular");

        // Get dimensions of the page
        const { width, height } = pdfDoc.internal.pageSize;

        // Calculate line width based on page width
        const lineWidth = width - 20; // Adjust margin as needed

        // Split text into lines
        const textLines = pdfDoc.splitTextToSize(quillContent, lineWidth);

        // Set font size
        pdfDoc.setFontSize(fontSize);

        // Add text lines to the PDF
        for (let i = 0; i < textLines.length; i++) {
          // Adjust coordinates based on line height and margin
          const x = 10; // Left margin
          const y = 10 + i * lineHeight; // Adjust y-coordinate based on line height
          pdfDoc.text(textLines[i], x, y);
        }

        // Save the PDF
        pdfDoc.save("content.pdf");
      } catch (error) {
        console.error("Error creating PDF:", error);
      }
    }
  };
  const handleDownloadPdf2 = async () => {
    if (quillRef.current) {
      let quillContent = quillRef.current?.editor?.root.innerHTML || "";

      // Remove <p> tags
      // quillContent = quillContent.replace(/<\/?p>/g, "");

      const pdf = new jsPDF();
      const fontSize = 12; // Adjust font size as needed
      const lineHeight = fontSize * 1.2; // Calculate line height based on font size

      const textLines = pdf.splitTextToSize(quillContent, 200); // Adjust line width as needed
      pdf.setFontSize(fontSize);
      // pdf.text(textLines);

      pdf.save("content.pdf");
    }
  };

  const handleDownloadPdf4 = async () => {
    if (quillRef.current) {
      const quillContent = quillRef.current?.editor?.root.innerHTML || ""; // Default to an empty string if quillContent is undefined

      const pdf = new jsPDF();
      const textLines = pdf.splitTextToSize(quillContent, 180); // Adjust line width as needed
      pdf.text(textLines, 10, 10);
      pdf.save("content.pdf");
    }
  };
  const handleDownloadPdf5 = () => {
    if (quillRef.current?.editor) {
      const quillContent = quillRef.current.editor.root; // Get the root element of the editor

      // Convert HTML content to canvas using html2canvas
      html2canvas(quillContent)
        .then((canvas) => {
          // Get the data URL of the canvas
          const dataUrl = canvas.toDataURL("image/jpeg;base64,verylongbase64;");

          // Create a new jsPDF instance
          const pdf = new jsPDF();

          // Set font size
          pdf.setFontSize(60); // Adjust font size as needed

          // Add the text "Octonyan loves jsPDF" to the PDF

          // pdf.text(content, 35, 25);

          // Add the image from the data URL to the PDF
          pdf.addImage(dataUrl, "JPEG", 10, 10, 200, 30); // Adjust position and size as needed

          // Save the PDF
          pdf.save("content.pdf");
        })
        .catch((error) => {
          console.error("Error converting HTML to canvas:", error);
        });
    }
  };

  // const handleDownloadPdf5 = () => {
  //   if (quillRef.current) {
  //     const quillContent = quillRef.current?.editor?.root.innerHTML || "";

  //     // Create a canvas element
  //     const canvas = document.createElement("canvas");
  //     const context = canvas.getContext("2d") as CanvasRenderingContext2D;

  //     // Set canvas dimensions
  //     canvas.width = 500; // Set canvas width as needed
  //     canvas.height = 500; // Set canvas height as needed

  //     // Draw the HTML content onto the canvas
  //     context.font = "12px Arial"; // Set font style and size
  //     context.fillStyle = "#000"; // Set text color
  //     context.fillText(quillContent, 10, 10); // Draw text onto the canvas

  //     // Get the data URL of the canvas
  //     const dataUrl = canvas.toDataURL("image/png");

  //     // Create a new jsPDF instance
  //     const pdf = new jsPDF();
  //     // pdf.text(context, 30, 20);
  //     // Add the image from the data URL to the PDF
  //     pdf.addImage(dataUrl, "png", 10, 78, 12, 15);

  //     // Save the PDF
  //     pdf.save("content.pdf");
  //   }
  // };

  // // Function to handle PDF download
  // const handleDownloadPdf2 = async () => {
  //   if (quillRef.current) {
  //     let quillContent = quillRef.current?.editor?.root.innerHTML || "";

  //     // Remove <p> tags
  //     quillContent = quillContent.replace(/<\/?p>/g, "");

  //     const pdf = new jsPDF();
  //     const fontSize = 12; // Adjust font size as needed
  //     const lineHeight = fontSize * 1.2; // Calculate line height based on font size

  //     // Embed an Arabic font that supports a wider range of characters
  //     const font = "Rubik"; // Use a font that supports Arabic characters
  //     pdf.setFont(font);

  //     // Set text direction to right-to-left (RTL) for Arabic
  //     // pdf.textDirection("rtl");

  //     const textLines = pdf.splitTextToSize(quillContent, 200); // Adjust line width as needed
  //     pdf.setFontSize(fontSize);
  //     for (let i = 0; i < textLines.length; i++) {
  //       pdf.text(textLines[i], 10, 10 + i * lineHeight); // Adjust coordinates based on line height
  //     }
  //     pdf.save("content.pdf");
  //   }
  // };

  // Function to reverse the order of characters in a string (for RTL text direction)
  function reverseText(text: string) {
    return text.split("").reverse().join("");
  }

  function formatText(text: string) {
    // Remove combining diacritical marks
    let cleanedText = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Check if the text contains Arabic characters
    const hasArabicCharacters = /[\u0600-\u06FF]/.test(cleanedText);

    // If the text contains Arabic characters, wrap it in a span with the "arabic-text" class
    if (hasArabicCharacters) {
      return `<span class="arabic-text">${cleanedText}</span>`;
    }

    // Otherwise, return the cleaned text as it is
    cleanedText = cleanedText.replace(/[\uE000-\uF8FF]/g, "?");
    cleanedText = cleanedText.replace(/[^\w\s!?{}()-;:"'*@#$%&+=]/g, "?");
    return cleanedText;
  }
  const handleDownloadPdf = async () => {
    if (quillRef.current) {
      const quillContent = quillRef.current?.editor?.root.innerHTML || "";

      try {
        const url2 = "https://pdf-lib.js.org/assets/ubuntu/Ubuntu-R.ttf";
        const fontBytes = await fetch(url2).then((res) => res.arrayBuffer());
        // Fetch the font file
        // const fontResponse = await fetch(
        //   "http://raw.githack.com/MrRio/jsPDF/master/test/reference/Amiri-Regular.ttf"
        // );
        // if (!fontResponse.ok) {
        //   throw new Error("Failed to fetch font file");
        // }
        // const fontBuffer = await fontResponse.arrayBuffer();

        // Create a new PDF document
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();

        // Register fontkit
        pdfDoc.registerFontkit(fontkit);

        // Embed the font into the document
        const font = await pdfDoc.embedFont(fontBytes);

        // Draw Arabic text on the page
        let arabicText = "مرحبا بالعالم"; // Replace with your Arabic text
        page.drawText(arabicText, {
          x: 50,
          y: height - 50, // Adjust as needed
          size: 12,
          font,
          color: rgb(0, 0, 0), // Black color
          lineHeight: 15, // Adjust line height as needed
          maxWidth: 500, // Adjust maximum width of text block as needed
        });

        // Save the PDF document
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        // Create a link element to trigger the download
        const link = document.createElement("a");
        link.href = url;
        link.download = "content.pdf";
        link.click();

        // Release the URL object
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error creating PDF:", error);
      }
    }
  };

  // const handleDownloadPdf = async () => {
  //   if (quillRef.current) {
  //     const quillContent = quillRef.current?.editor?.root.innerHTML || "";

  //     const pdfDoc = await PDFDocument.create();
  //     const page = pdfDoc.addPage();
  //     const { width, height } = page.getSize();

  //     // Embed a custom font that supports a wider range of characters
  //     // const fontBytes = ... // Load font file as ArrayBuffer
  //     const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  //     // const customFont = await pdfDoc.embedFont(fontBytes);
  //     // const textLines = pdfDoc.splitTextToSize(quillContent, 180);
  //     let test = formatText(quillContent);
  //     const fontSize = 30;
  //     page.drawText(test, {
  //       x: 50,
  //       y: height - 4 * fontSize,
  //       size: fontSize,
  //       font: timesRomanFont,
  //       color: rgb(0, 0.53, 0.71),
  //     });

  //     const pdfBytes = await pdfDoc.save();
  //     const blob = new Blob([pdfBytes], { type: "application/pdf" });
  //     const url = URL.createObjectURL(blob);

  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.download = "content.pdf";
  //     link.click();

  //     // Release the URL object
  //     URL.revokeObjectURL(url);
  //   }
  // };

  const textToFile = async (text: string, fileName: string): Promise<void> => {
    try {
      // Create a new PDF document
      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();

      // Embed the Times Roman font
      const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

      // Add a blank page to the document
      const page = pdfDoc.addPage();

      // Get the width and height of the page
      const { width, height } = page.getSize();

      // Draw a string of text toward the top of the page
      const fontSize = 30;
      const sanitizedText = text.replace(/[\u0625\u0300]/g, "");
      page.drawText(sanitizedText, {
        x: 50,
        y: height - 4 * fontSize,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0.53, 0.71),
      });

      // Serialize the PDFDocument to bytes (a Uint8Array)
      const pdfBytes = await pdfDoc.save();
      // Create a Blob object from the PDF bytes
      const blob = new Blob([pdfBytes], { type: "application/pdf" });

      // Create a temporary URL for the Blob object
      const url = URL.createObjectURL(blob);

      // Create a link element
      const link = document.createElement("a");

      // Set the href attribute to the temporary URL
      link.href = url;

      // Set the download attribute to specify the file name
      link.download = fileName;

      // Simulate a click on the link to trigger the download
      link.click();

      // Release the URL object
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error creating PDF:", error);
    }
  };

  // Example usage:
  const textContent = "This is the content of the file.";
  const fileName = "example.pdf";

  // Function to handle Word document download
  const handleDownloadWord_old = () => {
    if (quillRef.current) {
      const quillContent: string =
        quillRef.current?.editor?.root.innerHTML || ""; // Ensure quillContent is a string

      if (quillContent) {
        mammoth
          .convertToHtml({ arrayBuffer: Buffer.from(quillContent) })
          .then((result) => {
            const html = result.value; // The converted HTML
            console.log(html);
          })
          .catch((error) => {
            console.error("Error converting to HTML:", error);
          });
      } else {
        console.error("Error: Quill content is undefined or empty.");
      }
    }
  };
  const handleDownloadWord = async () => {
    if (quillRef.current) {
      const quillContent: string =
        quillRef.current?.editor?.root.innerHTML || ""; // Ensure quillContent is a string

      if (quillContent) {
        try {
          const arrayBuffer = new TextEncoder().encode(quillContent).buffer;
          // const result = await mammoth.convertToHtml({
          //   arrayBuffer: arrayBuffer,
          // });
          const result = await mammoth.convertToHtml({
            path: "path/to/document.docx", // in node.js
            arrayBuffer: arrayBuffer, // in browser
          });

          const html = result.value; // The converted HTML
          // Create a blob from the HTML content
          const blob = new Blob([html], { type: "text/html" });
          // Create a temporary URL for the Blob object
          const url = URL.createObjectURL(blob);
          // Create a link element
          const link = document.createElement("a");
          // Set the href attribute to the temporary URL
          link.href = url;
          // Set the download attribute to specify the file name
          link.download = "content.docx";
          // Simulate a click on the link to trigger the download
          link.click();
          // Release the URL object
          URL.revokeObjectURL(url);
        } catch (error) {
          console.error("Error converting to HTML:", error);
        }
      } else {
        console.error("Error: Quill content is undefined or empty.");
      }
    }
  };

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

  const handleDownloadTemplate = async (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    try {
      const file = await urlToFile(templateFile);
      if (!file) {
        console.error("No file selected");
        return;
      }
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/convertFileToText", {
        method: "POST",
        body: formData,
      });
      const data = await response.text();
      setContent(data);
    } catch (error) {
      console.error("Error downloading template:", error);
    }
  };

  const testPdf = () => {
    // handleDownloadTemplate({} as React.MouseEvent<HTMLAnchorElement>);
    textToFile(content, fileName);
  };

  function Export2Doc(elementId: string, filename: string = ""): void {
    const preHtml =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    const postHtml = "</body></html>";
    const html =
      preHtml + document.getElementById(elementId)?.innerHTML + postHtml;

    const blob = new Blob(["\ufeff", html], {
      type: "application/msword",
    });

    const url =
      "data:application/vnd.ms-word;charset=utf-8," + encodeURIComponent(html);

    filename = filename ? filename + ".doc" : "document.doc";

    const downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (
      navigator.userAgent.includes("MSIE") ||
      navigator.userAgent.includes("Trident/") ||
      navigator.userAgent.includes("Edge/")
    ) {
      // For Internet Explorer and Microsoft Edge
      // window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // For other browsers
      downloadLink.href = url;
      downloadLink.download = filename;
      downloadLink.click();
    }

    document.body.removeChild(downloadLink);
  }

  const createWordFile = async (content: string) => {
    try {
      const response = await fetch("/api/createWordFile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }), // Send the content as JSON string
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "document.docx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error creating word file:", error);
    }
  };

  const handleCreateWordFile = () => {
    const content = "This is a test document content.";
    createWordFile(content);
  };

  return (
    <div>
      <h3>{name}</h3>

      <p>Category: {category}</p>
      {description && <p>Description: {description}</p>}
      <a href={templateFile} onClick={handleDownloadTemplate}>
        Download Template
      </a>
      <ReactQuill
        ref={quillRef}
        value={content}
        onChange={setContent}
        style={{ width: "100%", height: "100%" }} // Set Quill component width and height to fill the container
      />
      {/* Buttons to download as PDF and Word */}
      <button onClick={handleDownloadPdf5}>Download Content as PDF</button>
      <button onClick={handleDownloadWord}>Download Content as Word</button>
      <button onClick={handleCreateWordFile}>Create Word File</button>
    </div>
  );
};

export default TemplateItem;
