require('dotenv').config({ path: require('path').resolve(__dirname, './src/.env') });

const mongoose = require("mongoose");
const express = require('express');
const cors = require('cors');

const app = express();

console.log(process.env);

mongoose.connect(process.env.DB_URL).then(() => {
    console.log(`CORS-enabled web server listening on port: ${process.env.PORT}`)
}).catch((err) => console.error(err.message));

const db = mongoose.connection;

db.on('error', (err) => console.error(err));
db.once('open',() => console.log("Connected to Database"))

app.use(cors());
app.use(express.json());

//Test db
// const Category = require("./models/categoryModel");

// Category.find((data) => console.log(data));
