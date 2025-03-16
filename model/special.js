const mongoose = require("mongoose");

const specialtySchema = mongoose.Schema({
    id: { type: String, required: true },
    special: { type: String, required: true },
});

module.exports = mongoose.model("special", specialtySchema);
