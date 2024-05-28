"use strict";
// tools/fileConverter.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWordFile = exports.extractTextFromDoc = exports.extractTextFromDocx = exports.extractTextFromPDF = void 0;
const fs_1 = __importDefault(require("fs"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
// import { extract } from 'word-extractor';
const WordExtractor = require("word-extractor");
const Docxtemplater = require("docxtemplater");
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
const extractTextFromPDF = async (filePath) => {
    return new Promise((resolve, reject) => {
        fs_1.default.readFile(filePath, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                (0, pdf_parse_1.default)(data).then((pdfData) => {
                    // Extracted text from PDF
                    let extractedText = pdfData.text;
                    // Apply formatting or encoding here
                    // For example, you can convert to uppercase
                    extractedText = extractedText.toUpperCase();
                    // Resolve with the formatted text
                    resolve(extractedText);
                }).catch((error) => {
                    reject(error);
                });
            }
        });
    });
};
exports.extractTextFromPDF = extractTextFromPDF;
const extractTextFromDocx = async (filePath) => {
    try {
        const extractor = new WordExtractor();
        // const extracted = extractor.extract("file.doc");
        const result = await extractor.extract(filePath);
        const text = result.getBody();
        return text;
    }
    catch (error) {
        console.error("Error extracting text from DOCX:", error);
        throw error;
    }
};
exports.extractTextFromDocx = extractTextFromDocx;
const extractTextFromDoc = async (filePath) => {
    try {
        const extractor = new WordExtractor();
        // const extracted = extractor.extract("file.doc");
        const result = await extractor.extract(filePath);
        const text = result.getBody();
        return text;
    }
    catch (error) {
        console.error("Error extracting text from DOCX:", error);
        throw error;
    }
};
exports.extractTextFromDoc = extractTextFromDoc;
const createWordFile = async (content) => {
    try {
        // Load the template
        const templateContent = fs_1.default.readFileSync('templates/template.docx', 'binary');
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
        fs_1.default.writeFileSync('path/to/generated.docx', buffer);
        console.log('Word file created successfully');
    }
    catch (error) {
        console.error('Error creating word file:', error);
    }
};
exports.createWordFile = createWordFile;
