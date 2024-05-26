import { Router } from 'express';
import * as TemplateController from '../controllers/TemplateController';

const router = Router();

// Route to create a new template
router.post('/templates', TemplateController.createTemplate);

// Route to retrieve all templates
router.get('/templates', TemplateController.getAllTemplates);

// Route to retrieve a single template by id
router.get('templates/:id', TemplateController.getTemplateById);

// Route to update a template by id
router.put('templates/:id', TemplateController.updateTemplate);

// Route to delete a template by id
router.delete('templates/:id', TemplateController.deleteTemplate);

export default router;
