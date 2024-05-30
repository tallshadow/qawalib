"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const fileController_1 = require("../controllers/fileController");
const fileConverter_1 = require("../tools/fileConverter");
const client_s3_1 = require("@aws-sdk/client-s3");
const router = (0, express_1.Router)();
// Configure AWS SDK
const s3Config = new client_s3_1.S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
const s3 = new aws_sdk_1.default.S3();
// Set up Multer to use S3 for storage
const upload = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3: s3Config,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        acl: 'public-read',
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + '-' + file.originalname);
        },
    }),
});
// Define the request types explicitly
router.post('/convertFileToText', upload.single('file'), (req, res) => {
    (0, fileController_1.convertFileToText)(req, res);
});
router.post('/createWordFile', (req, res) => {
    const { content } = req.body; // Assuming the content is in the request body
    if (!content) {
        return res.status(400).json({ error: 'No content provided' });
    }
    (0, fileConverter_1.createWordFile)(content);
    res.send('Word file creation initiated');
});
exports.default = router;
