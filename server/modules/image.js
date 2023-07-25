const mongoose = require("mongoose");
const { Schema } = mongoose;

const imgSchema = new Schema({
    name:String,
    img:{
        data:Buffer,
        contentType: String
    }
})

const ImageModel = mongoose.model("Image",imgSchema)

module.exports = ImageModel