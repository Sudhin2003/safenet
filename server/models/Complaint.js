const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
    userId: String,
    type: String,
    description: String,
    status: { 
  type: String, 
  enum: ["Pending", "In Progress", "Resolved"], 
  default: "Pending" 
},
    timestamp: { type: Date, default: Date.now },
    response: { type: String, default: "" }
});

module.exports = mongoose.model("Complaint", complaintSchema);