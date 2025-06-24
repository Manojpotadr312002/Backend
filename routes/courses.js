const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// GET all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses); // Return all courses from the database
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error, unable to fetch courses' });
    }
});

// POST a new course
router.post('/', async (req, res) => {
    const { courseName, courseCode, professorName, classType, semester } = req.body;

    // Validate incoming data
    if (!courseName || !courseCode || !professorName || !classType || !semester) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the course code is unique
    const existingCourse = await Course.findOne({ courseCode });
    if (existingCourse) {
        return res.status(400).json({ message: 'Course code must be unique' });
    }

    // Create a new course instance
    const newCourse = new Course({
        courseName,
        courseCode,
        professorName,
        classType,
        semester
    });

    try {
        // Save the new course to the database
        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse); // Respond with the saved course
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error, unable to save the course' });
    }
});

// PUT (Update) a course by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { courseName, courseCode, professorName, classType, semester } = req.body;

        // Validate incoming data
        if (!courseName || !courseCode || !professorName || !classType || !semester) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if course code is unique (except for the current course)
        const existingCourse = await Course.findOne({ courseCode, _id: { $ne: id } });
        if (existingCourse) {
            return res.status(400).json({ message: 'Course code must be unique' });
        }

        // Update the course
        const updatedCourse = await Course.findByIdAndUpdate(
            id,
            { courseName, courseCode, professorName, classType, semester },
            { new: true } // Return the updated course
        );

        if (!updatedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.json(updatedCourse); // Respond with the updated course
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error, unable to update the course' });
    }
});

// DELETE a course by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find the course by its ID
        const courseToDelete = await Course.findById(id);

        if (!courseToDelete) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Delete the course from the database
        await Course.findByIdAndDelete(id);
        res.json({ message: 'Course deleted successfully', course: courseToDelete });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error, unable to delete the course' });
    }
});

module.exports = router;
