const express = require('express');
const router = express.Router();
const Class = require('../models/Class');

// GET all classes
router.get('/', async (req, res) => {
    try {
        const classes = await Class.find();
        res.json(classes); // Return all classes from the database
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error, unable to fetch classes' });
    }
});

// POST a new class
// POST a new class
router.post('/', async (req, res) => {
    // Destructure semester as well
    const { classType, classId, semester } = req.body;

    // Validate incoming data (include semester in check)
    if (!classType || !classId || !semester) {
        return res.status(400).json({ message: 'All fields are required (classType, classId, semester)' });
    }

    // Create a new class instance with all required fields
    const newClass = new Class({
        classType,
        classId,
        semester, // add semester
    });

    try {
        const savedClass = await newClass.save();
        res.status(201).json(savedClass);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error, unable to save the class' });
    }
});


// DELETE a class by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find the class by its ID
        const classToDelete = await Class.findById(id);

        if (!classToDelete) {
            return res.status(404).json({ message: 'Class not found' });
        }

        // Delete the class from the database
        await Class.findByIdAndDelete(id);
        res.json({ message: 'Class deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error, unable to delete the class' });
    }
});

module.exports = router;
