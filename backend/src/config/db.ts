import { Sequelize } from 'sequelize-typescript';
import { Category } from '../models/Category';
import { Template } from '../models/Template';
import dotenv from 'dotenv';
import { SubCategory } from '../models/SubCategory';

dotenv.config();

console.log('Initializing Sequelize connection...');
console.log('Database Host:', process.env.POSTGRES_HOST);
console.log('Database Port:', process.env.POSTGRES_PORT);
console.log('Database User:', process.env.POSTGRES_USER);
console.log('Database Name:', process.env.POSTGRES_DATABASE);
// Add this line to import 'pg'
import pg from 'pg';

// Use pg as the dialectModule
pg.defaults.ssl = true;


export const sequelize = new Sequelize({
  dialect: 'postgres',
  dialectModule: pg,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  models: [Template, Category, SubCategory],
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

sequelize.sync({ force: false })
  .then(() => console.log('Database & tables created!'))
  .catch(err => {
    console.error('Failed to create db: ', err);
  });
