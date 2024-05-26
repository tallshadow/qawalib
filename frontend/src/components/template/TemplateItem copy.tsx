// import React, { useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// interface TemplateItemProps {
//   id: string;
//   name: string;
//   category: string;
//   description?: string;
//   templateFile: string;
// }

// const TemplateItem: React.FC<TemplateItemProps> = ({
//   id,
//   name,
//   category,
//   description,
//   templateFile,
// }) => {
//   const [content, setContent] = useState<string>("");
//   const [fileName, setFileName] = useState<string>(name);
//   const [fileContent, setFileContent] = useState<string>("");

//   const handleDownloadTemplate = async (
//     e: React.MouseEvent<HTMLAnchorElement>
//   ) => {
//     e.preventDefault(); // Prevent default behavior of opening link in new tab

//     try {
//       const response = await fetch(templateFile); // Fetch template file content from server
//       const data = await response.text(); // Extract text content from response
//       setContent(data); // Set content as value of ReactQuill component
//       console.log("***dddid", data);
//     } catch (error) {
//       console.error("Error downloading template:", error);
//     }
//   };

//   const handleSaveTemplate = () => {
//     // Create a Blob object with the content
//     const blob = new Blob([content], { type: "text/plain" });
//     // Generate a URL for the Blob object
//     const url = window.URL.createObjectURL(blob);
//     // Create a link element
//     const link = document.createElement("a");
//     // Set the href attribute to the URL of the Blob object
//     link.href = url;
//     // Set the download attribute to specify the file name
//     link.download = fileName;
//     // Simulate a click on the link to trigger the download
//     link.click();
//     // Release the URL object
//     window.URL.revokeObjectURL(url);
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const content = e.target?.result as string;
//         setFileContent(content);
//       };
//       reader.readAsText(file);
//     }
//   };

//   const handleContentChange = (
//     event: React.ChangeEvent<HTMLTextAreaElement>
//   ) => {
//     setFileContent(event.target.value);
//   };

//   return (
//     <div className="template-item">
//       <h3>{name}</h3>
//       <p>Category: {category}</p>
//       {description && <p>Description: {description}</p>}
//       <a href={templateFile} onClick={handleDownloadTemplate}>
//         Download Template
//       </a>
//       <ReactQuill value={content} onChange={setContent} />
//       <input type="file" onChange={handleFileChange} />
//       {/* <textarea value={fileContent} onChange={handleContentChange} /> */}
//       <ReactQuill value={fileContent} onChange={setFileContent} />
//       <input
//         type="text"
//         value={fileName}
//         onChange={(e) => setFileName(e.target.value)}
//       />
//       <button onClick={handleSaveTemplate}>Save Template</button>
//     </div>
//   );
// };

// export default TemplateItem;

import React, { useState } from "react";

const TemplateItem: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [textData, setTextData] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
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

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {textData && <pre>{textData}</pre>}
    </div>
  );
};
