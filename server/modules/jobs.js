const mongoose = require("mongoose");
const { Schema } = mongoose;

const jobSchema = new Schema({
    jobName:String,
    applied:Boolean
})

const JobModel = mongoose.model("Jobs",jobSchema)

module.exports = JobModel