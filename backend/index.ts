import express from 'express';
import { sequelize } from './api/config/db'; 
import categoryRoutes from './api/routes/categoryRoutes';
import templateRoutes from './api/routes/templateRoutes';
import fileRoutes from './api/routes/fileRoutes';
const cors = require('cors');


const bodyParser = require('body-parser');

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());
// Increase the limit for JSON data
app.use(bodyParser.json({ limit: '50mb' }));

// Increase the limit for URL-encoded data
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/api', categoryRoutes, templateRoutes, fileRoutes); 


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    // Ensure that your database and Sequelize are initialized here if not already done elsewhere in your setup
    sequelize.authenticate()
        .then(() => console.log('Database connected'))
        .catch(err => console.error('Unable to connect to the database:', err));
});


