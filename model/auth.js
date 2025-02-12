const mongoose = require("mongoose");

const authSchema = mongoose.Schema(
    {
        username: String,
        password: {
            type: String,
        },
    },
    { timestamp: true }
);

module.exports = mongoose.model("auth", authSchema);
