// src/models/Course.js
const mongoose = require('mongoose');

// Define the course schema
const courseSchema = new mongoose.Schema({
    courseCode: {
        type: String,
        required: true, // Make sure courseCode is provided
    },
    courseName: {
        type: String,
        required: true, // Make sure courseName is provided
    },
    professorName: {
        type: String, // Use String or ObjectId depending on your use case
        required: true, // Mark as required if necessary
    },
    classType: {
        type: String, // Use String or ObjectId depending on your use case
        required: true, // Mark as required if necessary
    },
    semester: {
        type: String, // Use String or ObjectId depending on your use case
        required: true, // Mark as required if necessary
    }
});

// Create the model for the course
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
