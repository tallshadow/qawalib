import { Sequelize } from 'sequelize-typescript';
import { Category } from '../models/Category';
import { Template } from '../models/Template';
import dotenv from 'dotenv';
import { SubCategory } from '../models/SubCategory';

dotenv.config();

export const sequelize = new Sequelize({
  dialect: 'postgres',  // Specify the dialect
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '5432'),  // Ensure port is a number
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  models: [Template, Category, SubCategory], // Include other models as needed
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
sequelize.sync({ force: false })     
  .then(() => console.log('Database & tables created!'))
  .catch(err => console.error('Failed to create db: ', err));
