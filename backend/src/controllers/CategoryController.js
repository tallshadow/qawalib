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
exports.CategoryController = void 0;
const Category_1 = require("../models/Category"); // Ensure this path matches your model location
class CategoryController {
    /**
     * Create a new category.
     * @param req - The request object.
     * @param res - The response object.
     */
    createCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.body;
                if (!name) {
                    return res.status(400).json({ message: 'Name is required' });
                }
                const newCategory = yield Category_1.Category.create({ name });
                return res.status(201).json(newCategory);
            }
            catch (error) {
                return res.status(500).json({ message: 'Failed to create category', error: error.message });
            }
        });
    }
    /**
     * Retrieve all categories.
     * @param req - The request object.
     * @param res - The response object.
     */
    getAllCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield Category_1.Category.findAll();
                return res.status(200).json(categories);
            }
            catch (error) {
                return res.status(500).json({ message: 'Failed to retrieve categories', error: error.message });
            }
        });
    }
    /**
     * Retrieve a single category by ID.
     * @param req - The request object.
     * @param res - The response object.
     */
    getCategoryById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const category = yield Category_1.Category.findByPk(id);
                if (!category) {
                    return res.status(404).json({ message: 'Category not found' });
                }
                return res.status(200).json(category);
            }
            catch (error) {
                return res.status(500).json({ message: 'Failed to retrieve category', error: error.message });
            }
        });
    }
    /**
     * Update a category.
     * @param req - The request object.
     * @param res - The response object.
     */
    updateCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { name } = req.body;
                const category = yield Category_1.Category.findByPk(id);
                if (!category) {
                    return res.status(404).json({ message: 'Category not found' });
                }
                category.name = name;
                yield category.save();
                return res.status(200).json(category);
            }
            catch (error) {
                return res.status(500).json({ message: 'Failed to update category', error: error.message });
            }
        });
    }
    /**
     * Delete a category.
     * @param req - The request object.
     * @param res - The response object.
     */
    deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const category = yield Category_1.Category.findByPk(id);
                if (!category) {
                    return res.status(404).json({ message: 'Category not found' });
                }
                yield category.destroy();
                return res.status(204).json({ message: 'Category deleted' });
            }
            catch (error) {
                return res.status(500).json({ message: 'Failed to delete category', error: error.message });
            }
        });
    }
}
exports.CategoryController = CategoryController;
