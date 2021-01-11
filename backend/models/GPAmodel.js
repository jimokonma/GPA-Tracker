const mongoose = require("mongoose");

const scoresSchema = new mongoose.Schema({
  course: { type: String, required: true },
  hours: { type: String, required: true },
  grade: { type: String, required: true },
});
const courseGpaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  score: [scoresSchema],
  gpa: { type: Number, required: true },
});

const GPAmodel = mongoose.model("GPAmodel", courseGpaSchema);

module.exports = GPAmodel;
