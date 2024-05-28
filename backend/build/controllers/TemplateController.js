"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTemplate = exports.updateTemplate = exports.getTemplateById = exports.getAllTemplates = exports.createTemplate = void 0;
const TemplateRepository_1 = require("../repositories/TemplateRepository");
const templateRepository = new TemplateRepository_1.TemplateRepository();
async function createTemplate(req, res) {
    try {
        const template = await templateRepository.createTemplate(req.body);
        return res.status(201).json(template);
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to create template', error: error.message });
    }
}
exports.createTemplate = createTemplate;
async function getAllTemplates(req, res) {
    try {
        const templates = await templateRepository.getAllTemplates();
        return res.json(templates);
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to retrieve templates', error: error.message });
    }
}
exports.getAllTemplates = getAllTemplates;
async function getTemplateById(req, res) {
    try {
        const template = await templateRepository.getTemplateById(parseInt(req.params.id));
        if (template) {
            return res.json(template);
        }
        return res.status(404).json({ message: 'Template not found' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to find template', error: error.message });
    }
}
exports.getTemplateById = getTemplateById;
async function updateTemplate(req, res) {
    try {
        const updatedTemplate = await templateRepository.updateTemplate(parseInt(req.params.id), req.body);
        if (updatedTemplate) {
            return res.json(updatedTemplate);
        }
        return res.status(404).json({ message: 'Template not found' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to update template', error: error.message });
    }
}
exports.updateTemplate = updateTemplate;
async function deleteTemplate(req, res) {
    try {
        await templateRepository.deleteTemplate(parseInt(req.params.id));
        return res.status(204).send();
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to delete template', error: error.message });
    }
}
exports.deleteTemplate = deleteTemplate;
