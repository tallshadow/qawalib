import { Request, Response } from 'express';
import { TemplateRepository } from '../repositories/TemplateRepository';

const templateRepository = new TemplateRepository();

export async function createTemplate(req: Request, res: Response): Promise<Response> {
  try {
    const template = await templateRepository.createTemplate(req.body);
    return res.status(201).json(template);
  } catch (error: any) {
    return res.status(500).json({ message: 'Failed to create template', error: error.message });
  }
}

export async function getAllTemplates(req: Request, res: Response): Promise<Response> {
  try {
    const templates = await templateRepository.getAllTemplates();
    return res.json(templates);
  } catch (error: any) {
    return res.status(500).json({ message: 'Failed to retrieve templates', error: error.message });
  }
}

export async function getTemplateById(req: Request, res: Response): Promise<Response> {
  try {
    const template = await templateRepository.getTemplateById(parseInt(req.params.id));
    if (template) {
      return res.json(template);
    }
    return res.status(404).json({ message: 'Template not found' });
  } catch (error: any) {
    return res.status(500).json({ message: 'Failed to find template', error: error.message });
  }
}

export async function updateTemplate(req: Request, res: Response): Promise<Response> {
  try {
    const updatedTemplate = await templateRepository.updateTemplate(parseInt(req.params.id), req.body);
    if (updatedTemplate) {
      return res.json(updatedTemplate);
    }
    return res.status(404).json({ message: 'Template not found' });
  } catch (error: any) {
    return res.status(500).json({ message: 'Failed to update template', error: error.message });
  }
}

export async function deleteTemplate(req: Request, res: Response): Promise<Response> {
  try {
    await templateRepository.deleteTemplate(parseInt(req.params.id));
    return res.status(204).send();
  } catch (error: any) {
    return res.status(500).json({ message: 'Failed to delete template', error: error.message });
  }
}
