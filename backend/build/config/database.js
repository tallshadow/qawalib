"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv = __importStar(require("dotenv"));
// import { Note } from "../model/Note";
dotenv.config();
class Database {
    constructor() {
        this.POSTGRES_DB = process.env.POSTGRES_DB || '';
        this.POSTGRES_USER = process.env.POSTGRES_USER || '';
        this.POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || '';
        this.POSTGRES_HOST = process.env.POSTGRES_HOST || '';
        this.POSTGRES_PORT = parseInt(process.env.POSTGRES_PORT || '5432', 10);
        this.connectToPostgreSQL();
    }
    async connectToPostgreSQL() {
        this.sequelize = new sequelize_typescript_1.Sequelize({
            database: this.POSTGRES_DB,
            username: this.POSTGRES_USER,
            password: this.POSTGRES_PASSWORD,
            host: this.POSTGRES_HOST,
            port: this.POSTGRES_PORT,
            dialect: "postgres",
            // models:[Note]
            dialectOptions: {
                ssl: {
                    require: true, // This will ensure SSL is used
                    rejectUnauthorized: false // If you are using self-signed certificates, this line may be necessary
                }
            }
        });
        await this.sequelize
            .authenticate()
            .then(() => {
            console.log("✅ PostgreSQL Connection has been established successfully.");
        })
            .catch((err) => {
            console.error("❌ Unable to connect to the PostgreSQL database:", err);
        });
    }
}
exports.default = Database;
