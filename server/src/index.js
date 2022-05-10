const mongoose = require("mongoose");
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_URL).then(() => {
    console.log(`Server is running on port: ${process.env.PORT}`)
}).catch((err) => console.error(err.message));

//Test db
const Category = require("./models/categoryModel");

Category.create({
    name: 'Test'
}).then((data) => console.log(data));
