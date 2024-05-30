import { Request, Response } from 'express';
import fs from 'fs';
import { extractTextFromPDF, extractTextFromDocx, extractTextFromDoc } from '../tools/fileConverter';

export const convertFileToText = async (req: Request, res: Response) => {
    
  if (!req.file) {

    return res.status(400).json({ error: 'No file uploaded' });
  }

  const filePath = req.file.path;
  const fileExtension = req.file.originalname.split('.').pop()?.toLowerCase();

  try {
   
    let textData = '';

    switch (fileExtension) {
        case 'pdf':
            textData = await extractTextFromPDF(filePath);
            break;
        case 'doc':
            textData = await extractTextFromDoc(filePath);
            break;
        case 'docx':
            textData = await extractTextFromDocx(filePath);
            break;
      default:
        throw new Error('Unsupported file type');
    }

    res.send(textData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to convert file to text' });
  } finally {
    // Delete the uploaded file after conversion
    // fs.unlinkSync(filePath);
  }
};