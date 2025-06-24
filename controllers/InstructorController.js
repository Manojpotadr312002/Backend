// backend/controllers/InstructorController.js
const Instructor = require('../models/Instructor');

exports.createInstructor = async (req, res) => {
    try {
        const instructor = new Instructor(req.body);
        await instructor.save();
        res.status(201).json(instructor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getInstructors = async (req, res) => {
    try {
        const instructors = await Instructor.find();
        res.status(200).json(instructors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateInstructor = async (req, res) => {
    try {
        const instructor = await Instructor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(instructor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteInstructor = async (req, res) => {
    try {
        await Instructor.findByIdAndDelete(req.params.id);
        res.status(204).json({ message: 'Instructor deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
