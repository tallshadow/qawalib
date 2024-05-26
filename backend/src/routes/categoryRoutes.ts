import express from 'express';
import { CategoryController } from '../controllers/CategoryController';
import { validateCategoryCreation, validateCategoryUpdate } from '../validations/categoryValidation';


const router = express.Router();
const categoryController = new CategoryController();
router.post('/categories', validateCategoryCreation, categoryController.createCategory);
router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:id', categoryController.getCategoryById);
router.put('/categories/:id', validateCategoryUpdate, categoryController.updateCategory);
router.delete('/categories/:id', categoryController.deleteCategory);

export default router;

