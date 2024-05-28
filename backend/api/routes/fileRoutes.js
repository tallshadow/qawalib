"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const fileController_1 = require("../controllers/fileController");
const fileConverter_1 = require("../tools/fileConverter");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
router.post('/convertFileToText', upload.single('file'), fileController_1.convertFileToText);
router.post('/createWordFile', fileConverter_1.createWordFile);
exports.default = router;
