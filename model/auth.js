const mongoose = require("mongoose");

const authSchema = mongoose.Schema(
    {
        isAdmin: { type: Boolean, required: false },
        username: { type: String, required: true },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamp: true }
);

module.exports = mongoose.model("auth", authSchema);
