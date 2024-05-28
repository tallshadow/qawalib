// import express from 'express';
const express = require("express");
const cors = require('cors');


const bodyParser = require('body-parser');

const app = express();
const PORT = 8000;

app.use("/", (req:any, res:any) => res.send("Express on Vercel"));

app.listen(3000, () => console.log("Server ready on port 3000."));


