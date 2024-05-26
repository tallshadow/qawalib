"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCategoryUpdate = exports.validateCategoryCreation = void 0;
// src/validations/categoryValidation.ts
const express_validator_1 = require("express-validator");
// Validation rules for creating a new category
exports.validateCategoryCreation = [
    (0, express_validator_1.body)('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
// Validation rules for updating a category
exports.validateCategoryUpdate = [
    (0, express_validator_1.body)('name')
        .optional()
        .trim()
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
