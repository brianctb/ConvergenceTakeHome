const express = require('express');
const dbconnect = require('./database/database');
require('dotenv').config();

const app = express();

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
