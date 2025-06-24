const Timetable = require("../models/Timetable");
const Course = require("../models/Course");
const Room = require("../models/Room");

const generateTimetable = async (req, res) => {
    try {
        // Fetch courses and rooms from the database
        const courses = await Course.find({});
        const rooms = await Room.find({});

        // Extract days array from the request body
        const { days, startTime, endTime, breakHours } = req.body;

        if (!days || days.length === 0) {
            return res.status(400).json({ message: "No days selected." });
        }

        // Sample timetable generation logic for each day
        const timetable = [];
        days.forEach((day) => {
            courses.forEach((course) => {
                timetable.push({
                    courseCode: course.code,
                    courseName: course.name,
                    room: rooms[Math.floor(Math.random() * rooms.length)].name,
                    day,
                    startTime,
                    endTime,
                    breakHours,
                });
            });
        });

        // Save the generated timetable to the database
        const newTimetable = new Timetable({ timetable });
        await newTimetable.save();

        // Send the generated timetable as a response
        res.status(200).json(timetable);
    } catch (error) {
        console.error("Error generating timetable:", error);
        res.status(500).json({ message: "Error generating timetable" });
    }
};
