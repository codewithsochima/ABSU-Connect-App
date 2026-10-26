const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
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

    const existingStudent = await Student.findOne({
      email: email.trim().toLowerCase(),
    });

    if (existingStudent) {
      return res.status(409).json({
        success: false,
        message: "This email is already registered",
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
      message: "Student registered sucessfully.",
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
      return res.stutus(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "An unexpected error occured during registration",
    });
  }
});

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ABSU Connect authentication routes are working!",
  });
});

module.exports = router;
