import { Request, Response } from 'express';
import { Category } from '../models/Category'; // Ensure this path matches your model location

export class CategoryController {
    /**
     * Create a new category.
     * @param req - The request object.
     * @param res - The response object.
     */
    async createCategory(req: Request, res: Response): Promise<Response> {
        try {
            const { name } = req.body;
            if (!name) {
                return res.status(400).json({ message: 'Name is required' });
            }
            const newCategory = await Category.create({ name } as Category);

            return res.status(201).json(newCategory);
        } catch (error: any) {
            return res.status(500).json({ message: 'Failed to create category', error: error.message });
        }
    }

    /**
     * Retrieve all categories.
     * @param req - The request object.
     * @param res - The response object.
     */
    async getAllCategories(req: Request, res: Response): Promise<Response> {
        try {
            const categories = await Category.findAll();
            return res.status(200).json(categories);
        } catch (error: any) {
            return res.status(500).json({ message: 'Failed to retrieve categories', error: error.message });
        }
    }

    /**
     * Retrieve a single category by ID.
     * @param req - The request object.
     * @param res - The response object.
     */
    async getCategoryById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const category = await Category.findByPk(id);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            return res.status(200).json(category);
        } catch (error: any) {
            return res.status(500).json({ message: 'Failed to retrieve category', error: error.message });
        }
    }

    /**
     * Update a category.
     * @param req - The request object.
     * @param res - The response object.
     */
    async updateCategory(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const { name } = req.body;

            const category = await Category.findByPk(id);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }

            category.name = name;
            await category.save();
            return res.status(200).json(category);
        } catch (error: any) {
            return res.status(500).json({ message: 'Failed to update category', error: error.message });
        }
    }

    /**
     * Delete a category.
     * @param req - The request object.
     * @param res - The response object.
     */
    async deleteCategory(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const category = await Category.findByPk(id);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }

            await category.destroy();
            return res.status(204).json({ message: 'Category deleted' });
        } catch (error: any) {
            return res.status(500).json({ message: 'Failed to delete category', error: error.message });
        }
    }
}
