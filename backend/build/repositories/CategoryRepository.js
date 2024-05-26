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
exports.CategoryRepository = void 0;
const Category_1 = require("../models/Category");
class CategoryRepository {
    constructor() {
        this.repository = Category_1.Category;
    }
    // Create a new category
    createCategory(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Directly pass an object with properties that match the Category model attributes.
                const category = yield Category_1.Category.create({ name });
                return category;
            }
            catch (error) {
                throw new Error(`Error creating category: ${error.message}`);
            }
        });
    }
    // Get a category by ID
    getCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.repository.findByPk(id);
            return category;
        });
    }
    // Update a category by ID
    updateCategory(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.repository.findByPk(id);
            if (category) {
                category.name = name;
                yield category.save();
            }
            return category;
        });
    }
    // Delete a category by ID
    deleteCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.repository.findByPk(id);
            if (category) {
                yield category.destroy();
            }
        });
    }
    // List all categories
    listCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield this.repository.findAll();
            return categories;
        });
    }
}
exports.CategoryRepository = CategoryRepository;
