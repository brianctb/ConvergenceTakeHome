const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const dbconnect = async () => {
    try {
        // mongodb connection string
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        console.log(`MongoDB connected`);
    } catch (err) {
        console.log(err);
    }
}

module.exports = dbconnect;