"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../config/db");
const categoryRoutes_1 = __importDefault(require("../routes/categoryRoutes"));
const templateRoutes_1 = __importDefault(require("../routes/templateRoutes"));
const fileRoutes_1 = __importDefault(require("../routes/fileRoutes"));
const cors = require('cors');
const bodyParser = require('body-parser');
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use(cors());
// Increase the limit for JSON data
app.use(bodyParser.json({ limit: '50mb' }));
// Increase the limit for URL-encoded data
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/api', categoryRoutes_1.default, templateRoutes_1.default, fileRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    // Ensure that your database and Sequelize are initialized here if not already done elsewhere in your setup
    db_1.sequelize.authenticate()
        .then(() => console.log('Database connected'))
        .catch(err => console.error('Unable to connect to the database:', err));
});
