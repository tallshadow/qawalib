import { Router, Request, Response } from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import { convertFileToText } from '../controllers/fileController';
import * as TemplateController from '../controllers/TemplateController';
import { createWordFile } from '../tools/fileConverter';
import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";

const router = Router();

// Configure AWS SDK

const s3Config = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });
const s3 = new aws.S3();

// Set up Multer to use S3 for storage
const upload = multer({
  storage: multerS3({
    s3: s3Config,
    bucket: process.env.AWS_S3_BUCKET_NAME!,
    acl: 'public-read',
    key: function (req: Request, file: Express.Multer.File, cb: (error: any, key?: string) => void) {
      cb(null, Date.now().toString() + '-' + file.originalname);
    },
  }),
});

// Define the request types explicitly
router.post('/convertFileToText', upload.single('file'), (req: Request, res: Response) => {
  convertFileToText(req, res);
});

router.post('/createWordFile', (req: Request, res: Response) => {
    const { content } = req.body; // Assuming the content is in the request body
  
    if (!content) {
      return res.status(400).json({ error: 'No content provided' });
    }
  
    createWordFile(content);
    
    res.send('Word file creation initiated');
  });
  
export default router;

