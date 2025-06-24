const PDFDocument = require("pdfkit");

const generateTimetablePDF = (timetable) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const buffers = [];

    // Collect data in PDF buffers
    doc.on("data", (chunk) => buffers.push(chunk));
    doc.on("end", () => {
      const pdfBuffer = Buffer.concat(buffers);
      resolve(pdfBuffer);
    });

    // Add title to the PDF
    doc.fontSize(20).text("Generated Timetable", { align: "center" });
    doc.moveDown(2);

    // Add each timetable entry to the PDF
    timetable.forEach((entry) => {
      doc.fontSize(12)
        .text(`Course: ${entry.courseCode}`)
        .text(`Classroom: ${entry.classroom}`)
        .text(`Professor: ${entry.professorName}`)
        .text(`Days: ${entry.days.join(", ")}`)
        .text(`Time: ${entry.startTime} - ${entry.endTime}`)
        .text(`Break Duration: ${entry.breakDuration || "None"}`)
        .moveDown();
    });

    // Finalize the document and generate PDF
    doc.end();
  });
};

module.exports = { generateTimetablePDF };
