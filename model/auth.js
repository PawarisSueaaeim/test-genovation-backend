const mongoose = require("mongoose");
const special = require("./special");

const authSchema = mongoose.Schema(
    {
        isAdmin: { type: Boolean, required: false },
        username: { type: String, required: true },
        password: {
            type: String,
            required: true,
        },
        booking: [
            {
                doctor: String,
                special: String,
                id: Number,
                date: String,
                start: String,
                end: String,
            },
        ],
    },
    { timestamp: true }
);

module.exports = mongoose.model("auth", authSchema);
