"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateRepository = void 0;
const Template_1 = require("../models/Template");
class TemplateRepository {
    async createTemplate(templateData) {
        try {
            const template = await Template_1.Template.create(templateData);
            return template;
        }
        catch (error) {
            throw new Error(`Error creating the template: ${error.message}`);
        }
    }
    async getAllTemplates() {
        try {
            const templates = await Template_1.Template.findAll();
            return templates;
        }
        catch (error) {
            throw new Error(`Error retrieving templates: ${error.message}`);
        }
    }
    async getTemplateById(id) {
        try {
            const template = await Template_1.Template.findByPk(id);
            return template;
        }
        catch (error) {
            throw new Error(`Error finding template with id ${id}: ${error.message}`);
        }
    }
    async updateTemplate(id, templateData) {
        try {
            const template = await Template_1.Template.findByPk(id);
            if (template) {
                const updatedTemplate = await template.update(templateData);
                return updatedTemplate;
            }
            return null;
        }
        catch (error) {
            throw new Error(`Error updating template with id ${id}: ${error.message}`);
        }
    }
    async deleteTemplate(id) {
        try {
            const template = await Template_1.Template.findByPk(id);
            if (template) {
                await template.destroy();
            }
        }
        catch (error) {
            throw new Error(`Error deleting template with id ${id}: ${error.message}`);
        }
    }
}
exports.TemplateRepository = TemplateRepository;
