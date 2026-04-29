const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// SUBMIT COMPLAINT
router.post("/create", auth, async (req, res) => {
    try {

        console.log("BODY RECEIVED:", req.body);
        const userId = req.user.userId;
        const { type, description } = req.body;

        const newComplaint = new Complaint({ userId, type, description });
        await newComplaint.save();

        res.json({ message: "Complaint submitted!" });
    } catch (err) {
        console.log(err); 
        res.status(500).json({ message: "Error submitting complaint" });
    }
});

// GET USER'S OWN COMPLAINTS
router.get("/my", auth, async (req, res) => {
    try {
        const complaints = await Complaint.find({ userId: req.user.userId })
            .sort({ timestamp: -1 });

        res.json(complaints);
    } catch (err) {
        res.status(500).json({ message: "Error fetching complaints" });
    }
});

// GET ALL COMPLAINTS (Admin)
router.get("/all", auth, admin, async (req, res) => {
    const complaints = await Complaint.find().sort({ timestamp: -1 });
    res.json(complaints);
});

// MARK AS IN PROGRESS
router.put("/progress/:id", auth, admin, async (req, res) => {
    try {
        await Complaint.findByIdAndUpdate(req.params.id, {
            status: "In Progress"
        });

        res.json({ message: "Marked as in progress" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating status" });
    }
});

router.put("/resolve/:id", auth, admin, async (req, res) => {
    try {
        const { message } = req.body;

        const updated = await Complaint.findByIdAndUpdate(
            req.params.id,
            {
                status: "Resolved",
                response: message
            },
            { new: true }
        );

        res.json({ message: "Complaint resolved", updated });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error resolving complaint" });
    }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Not found" });
    }

    // 👤 USER deleting their own complaint
    if (req.user.role !== "admin") {
      if (complaint.userId !== req.user.userId) {
        return res.status(403).json({ message: "Not allowed" });
      }

      await complaint.deleteOne();
      return res.json({ message: "Complaint deleted" });
    }

    // 👑 ADMIN logic
    if (complaint.status !== "Resolved") {
      return res.status(400).json({
        message: "Only resolved complaints can be deleted"
      });
    }

    await complaint.deleteOne();
    res.json({ message: "Deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;