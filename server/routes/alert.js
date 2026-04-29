const express = require("express");
const router = express.Router();
const Alert = require("../models/Alert");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");




// SEND ALERT
router.post("/send", auth, async (req, res) => {
    try {
        const userId = req.user.userId;

        const newAlert = new Alert({ userId , type: "emergency" });
        await newAlert.save();

        res.json({ message: "Emergency alert sent!" });
    } catch (err) {
        res.status(500).json({ message: "Error sending alert" });
    }
});

// GET ALL ALERTS (Admin)
const User = require("../models/User");

router.get("/all", auth, admin, async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ timestamp: -1 });

    const enriched = await Promise.all(
      alerts.map(async (a) => {
        const user = await User.findOne({ userId: a.userId });

        return {
          ...a._doc,
          userProfile: user
            ? {
                name: user.name,
                age: user.age,
                mobile: user.mobile,
                address: user.address,
                bloodGroup: user.bloodGroup,
                description: user.description
              }
            : null
        };
      })
    );

    res.json(enriched);

  } catch (err) {
    res.status(500).json({ message: "Error fetching alerts" });
  }
});
router.get("/my", auth, async (req, res) => {
    const alerts = await Alert.find({ userId: req.user.userId })
        .sort({ timestamp: -1 });

    res.json(alerts);
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id);

    if (!alert) return res.status(404).json({ msg: "Alert not found" });

    // allow owner OR admin
    if (
      alert.userId !== req.user.userId &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    await alert.deleteOne();

    res.json({ msg: "Alert deleted" });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});
module.exports = router;