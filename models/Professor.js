// src/models/Professor.js
const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({
    professorName: {
        type: String,
        required: true,
    },
    professorId: {
        type: String,
        required: true,
    },
});

const Professor = mongoose.model('Professor', professorSchema);
module.exports = Professor;

