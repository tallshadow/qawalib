import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface TemplateItemProps {
  id: string;
  name: string;
  category: string;
  description?: string;
  templateFile: string;
}

const TemplateItem: React.FC<TemplateItemProps> = ({
  id,
  name,
  category,
  description,
  templateFile,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [textData, setTextData] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      console.log("*****file", selectedFile);
      setFile(selectedFile);
      // setFile("selectedFile");
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/convertFileToText", {
        method: "POST",
        body: formData,
      });
      const data = await response.text();
      setTextData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  async function urlToFile(url: any) {
    try {
      // Fetch the content of the URL
      const response = await fetch(url);
      const blob = await response.blob(); // Convert the response to a Blob object

      // Extract the filename from the URL
      const filename = url.substring(url.lastIndexOf("/") + 1);

      // Create a new File object from the Blob with the filename
      const file = new File([blob], filename);

      return file;
    } catch (error) {
      console.error("Error converting URL to file:", error);
      return null;
    }
  }

  const handleDownloadTemplate_ko = async (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault(); // Prevent default behavior of opening link in new tab

    try {
      const response = await fetch(templateFile); // Fetch template file content from server
      const data = await response.text(); // Extract text content from response
      setContent(data); // Set content as value of ReactQuill component
      console.log("***dddid", data);
      const formData = new FormData();
      formData.append("file", data);

      const convertedFile = await fetch("/api/convertFileToText", {
        method: "POST",
        body: formData,
      });
      const extractedText = await convertedFile.text();
      setContent(extractedText);
    } catch (error) {
      console.error("Error downloading template:", error);
    }
  };
  const handleDownloadTemplate = async (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault(); // Prevent default behavior of opening link in new tab

    try {
      // const file2 = await urlToFile(
      //   "https://tallshadowawsbucket.s3.eu-west-3.amazonaws.com/katibok/test_c.doc"
      // );
      const file2 = await urlToFile(templateFile);
      console.log("file****file2", file2);
      // const response = await fetch(templateFile); // Fetch template file content from server
      // const data = await response.text(); // Extract text content from response
      // setContent(data); // Set content as value of ReactQuill component
      setFile(file2);

      const formData = new FormData();

      console.log("file****", file2);
      if (file2) {
        formData.append("file", file2);
        console.log("file****formData", formData);
      } else {
        console.error("No file selected");
      }

      const response = await fetch("/api/convertFileToText", {
        method: "POST",
        body: formData,
      });
      const data = await response.text();
      setContent(data);
      console.log("***dddid", data);
    } catch (error) {
      console.error("Error downloading template:", error);
    }
  };
  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
  };
  return (
    <div>
      <h3>{name}</h3>
      <p>Category: {category}</p>
      {description && <p>Description: {description}</p>}{" "}
      <a href={templateFile} onClick={handleDownloadTemplate}>
        Download Template
      </a>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {/* Use dangerouslySetInnerHTML to render HTML content */}
      {/* <ReactQuill value={textData} onChange={setTextData} /> */}
      {/* <textarea value={content} onChange={handleContentChange} /> */}
      <ReactQuill value={content} onChange={setContent} />
    </div>
  );
};

export default TemplateItem;
