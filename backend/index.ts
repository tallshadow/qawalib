import express, { Request, Response, NextFunction } from 'express';
import { sequelize } from './src/config/db'; 
import categoryRoutes from './src/routes/categoryRoutes';
import templateRoutes from './src/routes/templateRoutes';
import bodyParser from 'body-parser';

const allowedOrigins = [
  'https://qawalib-frontend.vercel.app',
  'https://namadej.com',
  'https://www.namadej.com',
  'http://localhost:3000'
];

// Define allowCors function
const allowCors = (fn: any) => async (req: Request, res: Response) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

const app = express();
const PORT = process.env.PORT || 8000;

// Increase the limit for JSON data
app.use(bodyParser.json({ limit: '50mb' }));

// Increase the limit for URL-encoded data
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Default route for testing
const handler = (req: Request, res: Response) => {
  const d = new Date();
  res.end(d.toString());
};

// Wrap handler with allowCors
app.get("/", allowCors(handler));

// Apply allowCors middleware to all routes
app.use('/api', allowCors(categoryRoutes), allowCors(templateRoutes)); 

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
