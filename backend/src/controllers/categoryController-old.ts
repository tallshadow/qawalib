import { Request, Response } from 'express';
import { Category } from '../models/Category';

/**
 * Get all categories.
 */
export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to fetch categories', error: error.message });
    }
};

/**
 * Get a single category by ID.
 */
export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (category) {
            res.json(category);
        } else {
            res.status(404).send('Category not found');
        }
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to fetch category', error: error.message });
    }
};

/**
 * Create a new category.
 */
export const createCategory = async (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }

    try {
        const newCategory = await Category.create({ name });
        res.status(201).json(newCategory);
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to create category', error: error.message });
    }
};

/**
 * Update an existing category.
 */
export const updateCategory = async (req: Request, res: Response) => {
    const { name } = req.body;
    const { id } = req.params;

    try {
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        category.name = name || category.name;
        await category.save();
        res.json(category);
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to update category', error: error.message });
    }
};

/**
 * Delete a category.
 */
export const deleteCategory = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        await category.destroy();
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to delete category', error: error.message });
    }
};
