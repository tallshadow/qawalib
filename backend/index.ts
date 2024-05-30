import express from 'express';
import { sequelize } from './src/config/db'; 
import categoryRoutes from './src/routes/categoryRoutes';
import templateRoutes from './src/routes/templateRoutes';
import fileRoutes from './src/routes/fileRoutes';


const app = express();
const PORT = 5000;
app.get("/", (req:any, res:any) => res.send("Express on Vercel"));

// app.listen(3000, () => console.log("Server ready on port 3000."));

app.use('/api', categoryRoutes, templateRoutes, fileRoutes); 

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    // Ensure that your database and Sequelize are initialized here if not already done elsewhere in your setup
    // sequelize.authenticate()
    //     .then(() => console.log('Database connected'))
    //     .catch(err => console.error('Unable to connect to the database:', err));
});

module.exports = app;



// const cors = require('cors');


// const bodyParser = require('body-parser');

// const app = express();
// const PORT = 8000;

// app.use(express.json());
// app.use(cors());
// // Increase the limit for JSON data
// app.use(bodyParser.json({ limit: '50mb' }));

// // Increase the limit for URL-encoded data
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// app.use('/api', categoryRoutes, templateRoutes, fileRoutes); 


// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//     // Ensure that your database and Sequelize are initialized here if not already done elsewhere in your setup
//     sequelize.authenticate()
//         .then(() => console.log('Database connected'))
//         .catch(err => console.error('Unable to connect to the database:', err));
// });





