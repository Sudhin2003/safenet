const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
    userId: String,
    type: { type: String, default: "EMERGENCY" },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Alert", alertSchema);