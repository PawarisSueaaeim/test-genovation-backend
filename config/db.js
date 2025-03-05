const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    const HOST = process.env.DATABASE_HOST;
    const PORT = process.env.DATABASE_PORT;
    const COLLECTION = process.env.DATABASE_COLLECTION;

    try {
        console.log(`Connect to mongodb://${HOST}:${PORT}/${COLLECTION}`);
        await mongoose.connect(`mongodb://${HOST}:${PORT}/${COLLECTION}`);
        console.log(`Connect successfuly! to mongodb://${HOST}:${PORT}/${COLLECTION}`)
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;