const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/code-sanbox-project');
        console.log("Connected to mongodb://localhost:27017/code-sanbox-project")
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;