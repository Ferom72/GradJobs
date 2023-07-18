const mongoose = require("mongoose")
const {Schema} = mongoose
var Jobs = require("./jobs")
var UserInfo = require("./userInfo")

const userSchema = new Schema({
    name:String,
    email:{
        type: String,
        unique:true,
    },
    username:{
        type: String,
        unique:true,
    },
    password: String,
    jobs: [Jobs.schema],
    aboutUser: UserInfo.schema
})

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
