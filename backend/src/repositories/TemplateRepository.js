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
exports.TemplateRepository = void 0;
const Template_1 = require("../models/Template");
class TemplateRepository {
    createTemplate(templateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const template = yield Template_1.Template.create(templateData);
                return template;
            }
            catch (error) {
                throw new Error(`Error creating the template: ${error.message}`);
            }
        });
    }
    getAllTemplates() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const templates = yield Template_1.Template.findAll();
                return templates;
            }
            catch (error) {
                throw new Error(`Error retrieving templates: ${error.message}`);
            }
        });
    }
    getTemplateById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const template = yield Template_1.Template.findByPk(id);
                return template;
            }
            catch (error) {
                throw new Error(`Error finding template with id ${id}: ${error.message}`);
            }
        });
    }
    updateTemplate(id, templateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const template = yield Template_1.Template.findByPk(id);
                if (template) {
                    const updatedTemplate = yield template.update(templateData);
                    return updatedTemplate;
                }
                return null;
            }
            catch (error) {
                throw new Error(`Error updating template with id ${id}: ${error.message}`);
            }
        });
    }
    deleteTemplate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const template = yield Template_1.Template.findByPk(id);
                if (template) {
                    yield template.destroy();
                }
            }
            catch (error) {
                throw new Error(`Error deleting template with id ${id}: ${error.message}`);
            }
        });
    }
}
exports.TemplateRepository = TemplateRepository;
