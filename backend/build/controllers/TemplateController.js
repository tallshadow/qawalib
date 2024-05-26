"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTemplate = exports.updateTemplate = exports.getTemplateById = exports.getAllTemplates = exports.createTemplate = void 0;
const TemplateRepository_1 = require("../repositories/TemplateRepository");
const templateRepository = new TemplateRepository_1.TemplateRepository();
function createTemplate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const template = yield templateRepository.createTemplate(req.body);
            return res.status(201).json(template);
        }
        catch (error) {
            return res.status(500).json({ message: 'Failed to create template', error: error.message });
        }
    });
}
exports.createTemplate = createTemplate;
function getAllTemplates(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const templates = yield templateRepository.getAllTemplates();
            return res.json(templates);
        }
        catch (error) {
            return res.status(500).json({ message: 'Failed to retrieve templates', error: error.message });
        }
    });
}
exports.getAllTemplates = getAllTemplates;
function getTemplateById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const template = yield templateRepository.getTemplateById(parseInt(req.params.id));
            if (template) {
                return res.json(template);
            }
            return res.status(404).json({ message: 'Template not found' });
        }
        catch (error) {
            return res.status(500).json({ message: 'Failed to find template', error: error.message });
        }
    });
}
exports.getTemplateById = getTemplateById;
function updateTemplate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedTemplate = yield templateRepository.updateTemplate(parseInt(req.params.id), req.body);
            if (updatedTemplate) {
                return res.json(updatedTemplate);
            }
            return res.status(404).json({ message: 'Template not found' });
        }
        catch (error) {
            return res.status(500).json({ message: 'Failed to update template', error: error.message });
        }
    });
}
exports.updateTemplate = updateTemplate;
function deleteTemplate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield templateRepository.deleteTemplate(parseInt(req.params.id));
            return res.status(204).send();
        }
        catch (error) {
            return res.status(500).json({ message: 'Failed to delete template', error: error.message });
        }
    });
}
exports.deleteTemplate = deleteTemplate;
