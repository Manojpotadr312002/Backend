const express = require('express');
const router = express.Router();
const Professor = require('../models/Professor');

// GET all professors
router.get('/', async (req, res) => {
    try {
        const professors = await Professor.find();
        res.json(professors); // Return all professors from the database
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error, unable to fetch professors' });
    }
});

// POST a new professor
router.post('/', async (req, res) => {
    const { professorName, professorId } = req.body;

    // Validate incoming data
    if (!professorName || !professorId) {
        return res.status(400).json({ message: 'Both professorName and professorId are required' });
    }

    // Create a new professor instance
    const newProfessor = new Professor({
        professorName,
        professorId,
    });

    try {
        // Save the new professor to the database
        const savedProfessor = await newProfessor.save();
        res.status(201).json(savedProfessor); // Respond with the saved professor
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error, unable to save the professor' });
    }
});

// DELETE a professor by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find the professor by their ID
        const professorToDelete = await Professor.findById(id);

        if (!professorToDelete) {
            return res.status(404).json({ message: 'Professor not found' });
        }

        // Delete the professor from the database
        await Professor.findByIdAndDelete(id);
        res.json({ message: 'Professor deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error, unable to delete the professor' });
    }
});

module.exports = router;
