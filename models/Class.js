// src/models/Class.js
const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    classId: {
        type: String,
        required: true,
    },
    classType: {
        type: String,
        required: true,
    },
    semester: { // Changed from classId to semester
        type: String,
        required: true,
    },
});

const Class = mongoose.model('Class', classSchema);
module.exports = Class;
