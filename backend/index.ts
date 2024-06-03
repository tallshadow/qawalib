import express, { Request, Response, NextFunction } from 'express';
import { sequelize } from './src/config/db'; 
import categoryRoutes from './src/routes/categoryRoutes';
import templateRoutes from './src/routes/templateRoutes';
import cors from 'cors';
import bodyParser from 'body-parser';

const allowedOrigins = [
  'https://qawalib-frontend.vercel.app',
  'https://namadej.com',
  'https://www.namadej.com',
  'http://localhost:3000'
];

const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

const app = express();
const PORT = process.env.PORT || 8000;

// Configure CORS globally
app.use(cors(corsOptions));

// Increase the limit for JSON data
app.use(bodyParser.json({ limit: '50mb' }));

// Increase the limit for URL-encoded data
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Default route for testing
app.get("/", (req: Request, res: Response) => {
  const d = new Date();
  res.send(d.toString());
});

// Apply routes
app.use('/api', categoryRoutes, templateRoutes); 

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
