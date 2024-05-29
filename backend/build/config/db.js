"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Category_1 = require("../models/Category");
const Template_1 = require("../models/Template");
const dotenv_1 = __importDefault(require("dotenv"));
const SubCategory_1 = require("../models/SubCategory");
dotenv_1.default.config();
exports.sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'postgres', // Specify the dialect
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || '5432'), // Ensure port is a number
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    models: [Template_1.Template, Category_1.Category, SubCategory_1.SubCategory], // Include other models as needed
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // This may need to be adjusted based on your security requirements
        },
    },
    modelMatch: (filename, member) => {
        return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
    },
});
// Optionally, you can synchronize your models with the database
exports.sequelize.sync({ force: false })
    .then(() => console.log('Database & tables created!'))
    .catch(err => console.error('Failed to create db: ', err));
