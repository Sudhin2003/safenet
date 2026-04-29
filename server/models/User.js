const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: { type: String, unique: true },

    password: String,
    role: { type: String, default: "user" },

    // 👇 NEW FIELDS
    name: String,
    sex: String,
    age: Number,
    mobile: String,
    address: String,
    bloodGroup: String,
    description: String
});

module.exports = mongoose.model("User", userSchema);