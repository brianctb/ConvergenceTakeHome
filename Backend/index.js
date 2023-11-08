const express = require('express');
const session = require('express-session');
const dbconnect = require('./database/database');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));

const startApp = async () => {
    try {
        await dbconnect();
        const port = process.env.PORT || 5000;
        app.listen(port, () => console.log(`Server started on port ${port}`));
    } catch (err) {
        console.log(err);
    }
}

startApp();
