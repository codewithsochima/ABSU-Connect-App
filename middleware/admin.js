const Student = require('../models/Student');

const adminOnly = async (req, res, next) => {
    try {
        const student = await Student.findById(req.studentId);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student account not found.',
            });
        }

        if (student.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin privileges required.',
            });
        }

        next();

    } catch (error) {
        console.error('Admin authorization error:', error.message);

        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred during authorization.',
        });
    }
};

module.exports = adminOnly;