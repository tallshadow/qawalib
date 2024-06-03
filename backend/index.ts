import express, { Request, Response, NextFunction } from 'express';
import { sequelize } from './src/config/db'; 
import categoryRoutes from './src/routes/categoryRoutes';
import templateRoutes from './src/routes/templateRoutes';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 8000;

// Configure CORS
app.use(cors({
  origin: ['https://qawalib-frontend.vercel.app', 'https://namadej.com', 'https://www.namadej.com', 'http://localhost:3000'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
}));

// Increase the limit for JSON data
app.use(bodyParser.json({ limit: '50mb' }));

// Increase the limit for URL-encoded data
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/api', categoryRoutes, templateRoutes); 

// Default route for testing
app.get("/", (req: Request, res: Response) => res.send("Qawalib Server on Vercel"));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    // Ensure that your database and Sequelize are initialized here if not already done elsewhere in your setup
    sequelize.authenticate()
        .then(() => console.log('Database connected'))
        .catch(err => console.error('Unable to connect to the database:', err));
});

// Handle 404 errors
app.use((req: Request, res: Response) => {
  res.status(404).send('API endpoint not found');
});

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

export default app;
