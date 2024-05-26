import { TemplateInput } from '../types';
import { Template } from '../models/Template';

export interface ITemplateRepository {
  createTemplate(templateData: TemplateInput): Promise<Template>;
  getAllTemplates(): Promise<Template[]>;
  getTemplateById(id: number): Promise<Template | null>;
  updateTemplate(id: number, templateData: Partial<Template>): Promise<Template | null>;
  deleteTemplate(id: number): Promise<void>;
}
