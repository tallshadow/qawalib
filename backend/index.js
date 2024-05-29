import express from "express";
import { sequelize } from "./config/db";
import categoryRoutes from "./routes/categoryRoutes";
import templateRoutes from "./routes/templateRoutes";
import fileRoutes from "./routes/fileRoutes";
const cors = require("cors");

const bodyParser = require("body-parser");

const app = express();
app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
