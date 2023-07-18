const mongoose = require("mongoose");
const { Schema } = mongoose;

const jobSchema = new Schema({
    jobName:String,
    applied:Boolean
})

const MovieModel = mongoose.model("Jobs",jobSchema)

module.exports = MovieModel