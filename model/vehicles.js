const mongoose = require("mongoose");

const vehiclesBrandSchema = mongoose.Schema(
    {
        _id: { type: String },
        brand: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("vehicles_brands", vehiclesBrandSchema);
