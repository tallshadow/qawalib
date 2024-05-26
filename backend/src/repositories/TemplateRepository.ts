import { Template } from '../models/Template';
import { ITemplateRepository } from '../interfaces/ITemplateRepository';
import s3 from '../config/awsConfig';

import { TemplateInput } from '../types'; // Adjust the path as necessary




export class TemplateRepository implements ITemplateRepository {
  public async createTemplate(templateData: TemplateInput): Promise<Template> {
    try {
      const template = await Template.create(templateData as any);
      return template;
    } catch (error: any) {
      throw new Error(`Error creating the template: ${error.message}`);
    }
  }

  
  public async getAllTemplates(): Promise<Template[]> {
    try {
      const templates = await Template.findAll();
      return templates;
    } catch (error: any) {
      throw new Error(`Error retrieving templates: ${error.message}`);
    }
  }

  public async getTemplateById(id: number): Promise<Template | null> {
    try {
      const template = await Template.findByPk(id);
      return template;
    } catch (error: any) {
      throw new Error(`Error finding template with id ${id}: ${error.message}`);
    }
  }

  public async updateTemplate(id: number, templateData: Partial<Template>): Promise<Template | null> {
    try {
      const template = await Template.findByPk(id);
      if (template) {
        const updatedTemplate = await template.update(templateData);
        return updatedTemplate;
      }
      return null;
    } catch (error: any) {
      throw new Error(`Error updating template with id ${id}: ${error.message}`);
    }
  }

  public async deleteTemplate(id: number): Promise<void> {
    try {
      const template = await Template.findByPk(id);
      if (template) {
        await template.destroy();
      }
    } catch (error: any) {
      throw new Error(`Error deleting template with id ${id}: ${error.message}`);
    }
  }
}
