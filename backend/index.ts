import express from 'express';
import { sequelize } from './src/config/db'; 
import categoryRoutes from './src/routes/categoryRoutes';
import templateRoutes from './src/routes/templateRoutes';
// import fileRoutes from './src/routes/fileRoutes';


// const app = express();

// app.use('/api', categoryRoutes, templateRoutes); 
// app.get("/", (req, res) => res.send("Qawalib Server on Vercel"));


// app.listen(8000, () => {console.log("Server ready on port 3000.")

// sequelize.authenticate()
//         .then(() => console.log('Database connected'))
//         .catch(err => console.error('Unable to connect to the database:', err));
// });

// module.exports = app;



const cors = require('cors');


const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
// Increase the limit for JSON data
app.use(bodyParser.json({ limit: '50mb' }));

// Increase the limit for URL-encoded data
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/api', categoryRoutes, templateRoutes); 


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    // Ensure that your database and Sequelize are initialized here if not already done elsewhere in your setup
    sequelize.authenticate()
        .then(() => console.log('Database connected'))
        .catch(err => console.error('Unable to connect to the database:', err));
});





