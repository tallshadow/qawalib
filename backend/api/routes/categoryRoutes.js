"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CategoryController_1 = require("../controllers/CategoryController");
const categoryValidation_1 = require("../validations/categoryValidation");
const router = express_1.default.Router();
const categoryController = new CategoryController_1.CategoryController();
router.post('/categories', categoryValidation_1.validateCategoryCreation, categoryController.createCategory);
router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:id', categoryController.getCategoryById);
router.put('/categories/:id', categoryValidation_1.validateCategoryUpdate, categoryController.updateCategory);
router.delete('/categories/:id', categoryController.deleteCategory);
exports.default = router;
