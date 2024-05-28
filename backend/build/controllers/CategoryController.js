"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const Category_1 = require("../models/Category"); // Ensure this path matches your model location
class CategoryController {
    /**
     * Create a new category.
     * @param req - The request object.
     * @param res - The response object.
     */
    async createCategory(req, res) {
        try {
            const { name } = req.body;
            if (!name) {
                return res.status(400).json({ message: 'Name is required' });
            }
            const newCategory = await Category_1.Category.create({ name });
            return res.status(201).json(newCategory);
        }
        catch (error) {
            return res.status(500).json({ message: 'Failed to create category', error: error.message });
        }
    }
    /**
     * Retrieve all categories.
     * @param req - The request object.
     * @param res - The response object.
     */
    async getAllCategories(req, res) {
        try {
            const categories = await Category_1.Category.findAll();
            return res.status(200).json(categories);
        }
        catch (error) {
            return res.status(500).json({ message: 'Failed to retrieve categories', error: error.message });
        }
    }
    /**
     * Retrieve a single category by ID.
     * @param req - The request object.
     * @param res - The response object.
     */
    async getCategoryById(req, res) {
        try {
            const { id } = req.params;
            const category = await Category_1.Category.findByPk(id);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            return res.status(200).json(category);
        }
        catch (error) {
            return res.status(500).json({ message: 'Failed to retrieve category', error: error.message });
        }
    }
    /**
     * Update a category.
     * @param req - The request object.
     * @param res - The response object.
     */
    async updateCategory(req, res) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const category = await Category_1.Category.findByPk(id);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            category.name = name;
            await category.save();
            return res.status(200).json(category);
        }
        catch (error) {
            return res.status(500).json({ message: 'Failed to update category', error: error.message });
        }
    }
    /**
     * Delete a category.
     * @param req - The request object.
     * @param res - The response object.
     */
    async deleteCategory(req, res) {
        try {
            const { id } = req.params;
            const category = await Category_1.Category.findByPk(id);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            await category.destroy();
            return res.status(204).json({ message: 'Category deleted' });
        }
        catch (error) {
            return res.status(500).json({ message: 'Failed to delete category', error: error.message });
        }
    }
}
exports.CategoryController = CategoryController;
