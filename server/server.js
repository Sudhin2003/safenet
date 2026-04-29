require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));

// Test route
app.get("/", (req, res) => {
    res.send("Server Running");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});

const alertRoutes = require("./routes/alert");
app.use("/api/alert", alertRoutes);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const complaintRoutes = require("./routes/complaint");
app.use("/api/complaint", complaintRoutes);

console.log("MONGO URI:", process.env.MONGO_URI);
