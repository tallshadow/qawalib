import express from 'express';
import { sequelize } from './src/config/db';
import categoryRoutes from './src/routes/categoryRoutes';
import templateRoutes from './src/routes/templateRoutes';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 8000;

// Define the allowed origins
const allowedOrigins = ['https://namadej.com', 'https://www.namadej.com'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
}));

app.use(express.json());

// Increase the limit for JSON data
app.use(bodyParser.json({ limit: '50mb' }));

// Increase the limit for URL-encoded data
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/api', categoryRoutes, templateRoutes);

app.get("/", (req, res) => res.send("Namadej Server on Vercel"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  // Ensure that your database and Sequelize are initialized here if not already done elsewhere in your setup
  sequelize.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Unable to connect to the database:', err));
});

export default app;
