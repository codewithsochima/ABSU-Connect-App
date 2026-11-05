const express = require('express');
const Student = require('../models/Student');
const protect = require('../middleware/auth');
const adminOnly = require('../middleware/admin');
const mongoose = require('mongoose');

const router = express.Router();

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

router.get('/students/:id', protect, adminOnly, async (req, res) => {
    try {
        const studentId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(studentId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid student ID.',
            });
        }

        const student = await Student.findById(studentId)
            .select('fullName email department level profilePicture role createdAt');

        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found.',
            });
        }

        return res.status(200).json({
            success: true,
            student,
        });

    } catch (error) {
        console.error('Fetch student error:', error.message);

        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred while retrieving the student.',
        });
    }
});

module.exports = router;