import { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import { sequelize } from '../config/db';
import categoryRoutes from '../routes/categoryRoutes';
import templateRoutes from '../routes/templateRoutes';
import fileRoutes from '../routes/fileRoutes';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/api', categoryRoutes, templateRoutes, fileRoutes);

const handler = (req: VercelRequest, res: VercelResponse) => {
  app(req, res);
};

export default handler;
