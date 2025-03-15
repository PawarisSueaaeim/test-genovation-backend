const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    special: {type: String, required: true},
    timeSlot: [{ day: String, start: Date, end: Date }],
});

module.exports = mongoose.model("doctor", doctorSchema);
