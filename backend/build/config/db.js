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
console.log('Initializing Sequelize connection...');
console.log('Database Host:', process.env.POSTGRES_HOST);
console.log('Database Port:', process.env.POSTGRES_PORT);
console.log('Database User:', process.env.POSTGRES_USER);
console.log('Database Name:', process.env.POSTGRES_DATABASE);
// Add this line to import 'pg'
const pg_1 = __importDefault(require("pg"));
// Use pg as the dialectModule
pg_1.default.defaults.ssl = true;
exports.sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'postgres',
    dialectModule: pg_1.default,
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    models: [Template_1.Template, Category_1.Category, SubCategory_1.SubCategory],
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    modelMatch: (filename, member) => {
        return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
    },
});
exports.sequelize.sync({ force: false })
    .then(() => console.log('Database & tables created!'))
    .catch(err => {
    console.error('Failed to create db: ', err);
});
