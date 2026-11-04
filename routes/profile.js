const express = require('express');
const Student = require('../models/Student');
const protect = require('../middleware/auth');

const router = express.Router();



router.get('/', protect, async (req, res) => {
  try {
    const student = await Student.findById(req.studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Profile retrieved successfully.',
      student: {
        id: student._id,
        fullName: student.fullName,
        email: student.email,
        department: student.department,
        level: student.level,
        profilePicture: student.profilePicture,
      },
    });

  } catch (error) {
    console.error('Profile error:', error.message);

    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred while retrieving your profile.',
    });
  }
});

router.put('/', protect, async (req, res) => {
  try {
    const { fullName, department, level, profilePicture } = req.body;

    const student = await Student.findById(req.studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found.',
      });
    }

    if (fullName !== undefined) {
      student.fullName = fullName;
    }

    if (department !== undefined) {
      student.department = department;
    }

    if (level !== undefined) {
      student.level = level;
    }

    if (profilePicture !== undefined) {
      student.profilePicture = profilePicture;
    }

    await student.save();

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      student: {
        id: student._id,
        fullName: student.fullName,
        email: student.email,
        department: student.department,
        level: student.level,
        profilePicture: student.profilePicture,
      },
    });

  } catch (error) {
    console.error('Profile update error:', error.message);

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred while updating your profile.',
    });
  }
});

module.exports = router;