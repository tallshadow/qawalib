import express from 'express';
import { sequelize } from './src/config/db'; 
import categoryRoutes from './src/routes/categoryRoutes';
import templateRoutes from './src/routes/templateRoutes';
import fileRoutes from './src/routes/fileRoutes';
const cors = require('cors');


const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;


app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;