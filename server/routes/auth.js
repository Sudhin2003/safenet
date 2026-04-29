const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");



function isStrongPassword(password) {
  return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);
}
// LOGIN
router.post("/login", async (req, res) => {
  const { userId, password } = req.body;

  const user = await User.findOne({ userId });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  

let isMatch = false;

if (user.password.startsWith("$2")) {
    // hashed password
    isMatch = await bcrypt.compare(password, user.password);
} else {
    // fallback for plain text (your old users)
    isMatch = (password === user.password);
}

if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
}

  // 🔑 create token
  const token = jwt.sign(
    { userId: user.userId, role: user.role },
    process.env.JWT_SECRET,   // later we secure this
    { expiresIn: "1h" }
  );

  res.json({ message: "Login successful", token });
});



router.post("/create-user", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { userId, password, role } = req.body;

    if (!isStrongPassword(password)) {
      return res.status(400).json({
        message: "Password must be 8+ chars, include capital, number, special char"
      });
    }

    const existing = await User.findOne({ userId });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userId,
      password: hashedPassword,
      role: role || "user"
    });

    await newUser.save();

    res.json({ message: "User created successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating user" });
  }
});

router.put("/change-password", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { userId, newPassword } = req.body;

    if (!isStrongPassword(newPassword)) {
      return res.status(400).json({
        message: "Weak password"
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findOneAndUpdate(
      { userId },
      { password: hashedPassword }
    );

    res.json({ message: "Password updated successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating password" });
  }
});

router.get("/search", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const q = req.query.q;

    const users = await User.find({
      userId: { $regex: "^" + q, $options: "i" }
    }).limit(10);

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Search error" });
  }
});

router.put("/update-user", authMiddleware, async (req, res) => {
  try {
    let userId;

if (req.user.role === "admin") {
  userId = req.body.userId;
} else {
  userId = req.user.userId; // user can only update themselves
}
    const updates = req.body.updates;

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    await User.findOneAndUpdate({ userId }, updates);

    res.json({ message: "User updated" });

  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

router.delete("/delete-user/:userId", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await User.findOneAndDelete({ userId: req.params.userId });

    res.json({ message: "User deleted" });

  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.user.userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (err) {
    res.status(500).json({ message: "Error fetching profile" });
  }
});

module.exports = router;