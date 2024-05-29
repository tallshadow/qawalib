// tools/fileConverter.ts

import fs from 'fs';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';
// import { extract } from 'word-extractor';
const WordExtractor = require("word-extractor");
// var extract = require("@types/word-extractor")
import { PDFDocument } from 'pdf-lib';
import Docxtemplater = require("docxtemplater")
import * as path from 'path';

// export const extractTextFromPDF = async (filePath: fs.PathOrFileDescriptor): Promise<string> => {
//   return new Promise<string>((resolve, reject) => {
//     fs.readFile(filePath, (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         pdf(data).then((pdfData: any) => {
//           resolve(pdfData.text);
//         }).catch((error: any) => {
//           reject(error);
//         });
//       }
//     });
//   });
// };


export const extractTextFromPDF = async (filePath: fs.PathOrFileDescriptor): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          reject(err);
        } else {
          pdf(data).then((pdfData: any) => {
            // Extracted text from PDF
            let extractedText = pdfData.text;
  
            // Apply formatting or encoding here
            // For example, you can convert to uppercase
            extractedText = extractedText.toUpperCase();
  
            // Resolve with the formatted text
            resolve(extractedText);
          }).catch((error: any) => {
            reject(error);
          });
        }
      });
    });
  };


export const extractTextFromDocx = async (filePath: fs.PathOrFileDescriptor): Promise<string> => {
    try {
        const extractor = new WordExtractor();
        // const extracted = extractor.extract("file.doc");
        const result = await extractor.extract(filePath);
        const text = result.getBody();
        return text;
    } catch (error) {
        console.error("Error extracting text from DOCX:", error);
        throw error;
    }
};

export const extractTextFromDoc = async (filePath: fs.PathOrFileDescriptor): Promise<string> => {
    try {
        const extractor = new WordExtractor();
        // const extracted = extractor.extract("file.doc");
        const result = await extractor.extract(filePath);
        const text = result.getBody();
        return text;
    } catch (error) {
        console.error("Error extracting text from DOCX:", error);
        throw error;
    }
};



export const createWordFile = async (content: string) => {
  try {
    // Load the template
    const templateContent = fs.readFileSync('templates/template.docx', 'binary');
    const doc = new Docxtemplater();
    doc.loadZip(templateContent);

    // Set the data to be filled in the template
    const data = {
      content: content,
    };

    // Replace the placeholders in the template with actual data
    doc.setData(data);

    // Render the document
    doc.render();

    // Get the generated document as a Buffer
    const buffer = doc.getZip().generate({ type: 'nodebuffer' });

    // Send the buffer as response or save it to a file
    // For example, saving it to a file
    fs.writeFileSync('path/to/generated.docx', buffer);

    console.log('Word file created successfully');
  } catch (error) {
    console.error('Error creating word file:', error);
  }
};
