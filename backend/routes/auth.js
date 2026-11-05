const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const protect = require("../middleware/auth");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password, department, level } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Full name, email, and password are required.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters.",
      });
    }

    const existingStudent = await Student.findOne({
      email: email.trim().toLowerCase(),
    });

    if (existingStudent) {
      return res.status(409).json({
        success: false,
        message: "This email is already registered.",
      });
    }

    const student = await Student.create({
      fullName,
      email,
      password,
      department,
      level,
    });

    const token = jwt.sign({ studentId: student._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(201).json({
      success: true,
      message: "Student registered successfully.",
      token,
      student: {
        id: student._id,
        fullName: student.fullName,
        email: student.email,
        department: student.department,
        level: student.level,
      },
    });
  } catch (error) {
    console.error("Registration error:", error.message);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "This email is already registered.",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred during registration.",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const student = await Student.findOne({
      email: email.trim().toLowerCase(),
    }).select("+password");

    if (!student) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, student.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign({ studentId: student._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      student: {
        id: student._id,
        fullName: student.fullName,
        email: student.email,
        department: student.department,
        level: student.level,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred during login.",
    });
  }
});

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ABSU Connect authentication routes are working!",
  });
});

router.put("/change-password", protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required.",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 8 characters.",
      });
    }

    const student = await Student.findById(req.studentId).select("+password");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      student.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    const isSamePassword = await bcrypt.compare(
      newPassword,
      student.password
    );

    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from your current password.",
      });
    }

    student.password = newPassword;

    await student.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully.",
    });

  } catch (error) {
    console.error("Password change error:", error.message);

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while changing your password.",
    });
  }
});

module.exports = router;
