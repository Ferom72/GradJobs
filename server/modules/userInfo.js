const mongoose = require("mongoose")
const {Schema} = mongoose

const userInfoSchema = new Schema({
    image: {
        data: Buffer,
        contentType: String
    },
    profession: String,
    address: String,
    resume: {
        data: Buffer,
        contentType: String
    },
    coverLetter: {
        data: Buffer,
        contentType: String
    },
    schoolName: String,
    startDate: String,
    endDate: String,
    highestEdu: String,
    degree: String,
    aboutU: String,
    lookingFor: String,
    broadArea: String,
    specializedArea: String,
    cant: String
})

const UserInfoModel = mongoose.model("UserInfo", userInfoSchema);

module.exports = UserInfoModel;