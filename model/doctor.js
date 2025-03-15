const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
    name: {type: String, required: true},
    special: {type: String, required: true},
    timeSlot: [{ id: Number, date: String, start: String, end: String }],
});

module.exports = mongoose.model("doctor", doctorSchema);
