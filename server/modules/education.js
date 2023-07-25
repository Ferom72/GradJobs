const mongoose = require("mongoose");
const { Schema } = mongoose;

const educationSchema = new Schema({
    schoolName: String,
    startDate: String,
    endDate: String,
    highestEdu: String,
    degree: String,
})

const EducationModel = mongoose.model("Education",educationSchema)

module.exports = EducationModel