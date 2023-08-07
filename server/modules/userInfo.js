const mongoose = require("mongoose");
const { Schema } = mongoose;
var Image = require("./image");
var Education = require("./education");

const userInfoSchema = new Schema({
  image: Image.schema,
  displayImg: String,
  profession: String,
  address: String,
  resume: {
    fieldname: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: Number,
  },
  coverLetter: {
    fieldname: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: Number,
  },
  education: { type: Array, default: [] },
  aboutU: String,
  lookingFor: String,
  broadArea: String,
  specializedArea: String,
  cant: String,
});

const UserInfoModel = mongoose.model("UserInfo", userInfoSchema);

module.exports = UserInfoModel;
