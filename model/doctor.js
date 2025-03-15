const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
    fname: String,
    lname: String,
    special: String,
    timeSlot: [{ day: String, start: Date, end: Date }],
});

module.exports = mongoose.model("doctor", doctorSchema);
