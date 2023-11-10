const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const dbconnect = () => {
    try {
        // mongodb connection string masked with env file
        mongoose.connect(process.env.MONGO_URL, {
        });
        console.log(`MongoDB connected`);
    } catch (err) {
        console.log(err);
    }
}

module.exports = dbconnect;