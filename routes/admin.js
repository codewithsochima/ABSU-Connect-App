const express = require('express');
const Student = require('../models/Student');
const protect = require('../middleware/auth');
const adminOnly = require('../middleware/admin');

const router = express.Router();

// Get all registered students
router.get('/students', protect, adminOnly, async (req, res) => {
    try {
        const students = await Student.find()
            .select('fullName email department level profilePicture role createdAt')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            totalStudents: students.length,
            students,
        });

    } catch (error) {
        console.error('Fetch students error:', error.message);

        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred while retrieving students.',
        });
    }
});

module.exports = router;