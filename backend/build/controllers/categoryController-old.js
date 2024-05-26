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
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryById = exports.getAllCategories = void 0;
const Category_1 = require("../models/Category");
/**
 * Get all categories.
 */
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Category_1.Category.findAll();
        res.json(categories);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch categories', error: error.message });
    }
});
exports.getAllCategories = getAllCategories;
/**
 * Get a single category by ID.
 */
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category_1.Category.findByPk(req.params.id);
        if (category) {
            res.json(category);
        }
        else {
            res.status(404).send('Category not found');
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch category', error: error.message });
    }
});
exports.getCategoryById = getCategoryById;
/**
 * Create a new category.
 */
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }
    try {
        const newCategory = yield Category_1.Category.create({ name });
        res.status(201).json(newCategory);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create category', error: error.message });
    }
});
exports.createCategory = createCategory;
/**
 * Update an existing category.
 */
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const { id } = req.params;
    try {
        const category = yield Category_1.Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        category.name = name || category.name;
        yield category.save();
        res.json(category);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update category', error: error.message });
    }
});
exports.updateCategory = updateCategory;
/**
 * Delete a category.
 */
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const category = yield Category_1.Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        yield category.destroy();
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete category', error: error.message });
    }
});
exports.deleteCategory = deleteCategory;
