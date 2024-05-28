"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertFileToText = void 0;
const fs_1 = __importDefault(require("fs"));
const fileConverter_1 = require("../tools/fileConverter");
const convertFileToText = async (req, res) => {
    var _a;
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const filePath = req.file.path;
    const fileExtension = (_a = req.file.originalname.split('.').pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    try {
        let textData = '';
        switch (fileExtension) {
            case 'pdf':
                textData = await (0, fileConverter_1.extractTextFromPDF)(filePath);
                break;
            case 'doc':
                textData = await (0, fileConverter_1.extractTextFromDoc)(filePath);
                break;
            case 'docx':
                textData = await (0, fileConverter_1.extractTextFromDocx)(filePath);
                break;
            default:
                throw new Error('Unsupported file type');
        }
        res.send(textData);
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to convert file to text' });
    }
    finally {
        // Delete the uploaded file after conversion
        fs_1.default.unlinkSync(filePath);
    }
};
exports.convertFileToText = convertFileToText;
