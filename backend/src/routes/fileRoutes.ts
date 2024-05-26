import { Router } from 'express';
import multer from 'multer';
import { convertFileToText,  } from '../controllers/fileController';

import * as TemplateController from '../controllers/TemplateController';
import { createWordFile } from '../tools/fileConverter';

const router = Router();
const upload = multer({ dest: 'uploads/' });


router.post('/convertFileToText', upload.single('file'), convertFileToText);

router.post('/createWordFile', createWordFile);

export default router;




