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

module.exports = router;