const express = require("express");
const router = express.Router();
const multer = require("multer");
const User = require("../modules/user");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const {
  register,
  loginUser,
  userProfile,
  addUserInfo,
  addjobs,
} = require("../controllers/authControllers");

router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname + "/uploads");
  },
  filename: function (req, file, callback) {
    const filename = `${file.originalname}`;
    callback(null, filename);
  },
});

const uploads = multer({
  storage: storage,
});

router.post("/register", register);
router.post("/login", loginUser);
router.get("/userInfo", userProfile);
router.post("/setup", uploads.any(), async (req, res) => {
    const {
      username,
      profession,
      displayImage,
      address,
      education,
      aboutU,
      lookingfor,
      broadArea,
      specializedArea,
      cant,
    } = req.body;

    let images = "";
    let resume = "";
    let coverLetter = "";
    let image = {
      name: "none",
      img: {
        data: "",
        contentType: "image/png",
      },
    };

    var length = req?.files?.length;

    if (length > 0) {

      req?.files.map((file) => {
        if (file?.fieldname === "serverImage") {
          console.log("image");
          images = file;
        } else if (file?.fieldname === "resume") {
          console.log("resume");
          resume = file;
        } else if (file?.fieldname === "coverLetter") {
          console.log("coverLetter");
          coverLetter = file;
        }
      });

      if (images !== "" && images.mimetype === 'image/png') {
        image = {
          name: images.filename,
          img: {
            data: fs.readFileSync(path.join(__dirname + "/uploads/" + images.filename)),
            contentType: "image/png",
          },
        };
      }else{
        return res.json({
          error: "we only support 'png' images ",
        })
      }

      if (resume === "") {
        resume = {
          fieldname: "",
          originalname: "",
          encoding: "",
          mimetype: "",
          destination: "",
          filename: "",
          path: "",
          size: 0,
        };
      }

      if(resume.mimetype !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || resume.mimetype !== 'application/pdf'){
        return res.json({
          error: "we only support 'docx or pdf' for Resume files ",
        })
      }

      if(coverLetter.mimetype !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || coverLetter.mimetype !== 'application/pdf'){
        return res.json({
          error: "we only support 'docx or pdf' for CoverLetter files ",
        })
      }

      if (coverLetter === "" ) {
        coverLetter = {
          fieldname: "",
          originalname: "",
          encoding: "",
          mimetype: "",
          destination: "",
          filename: "",
          path: "",
          size: 0,
        };
      }

      const newInfo = {
        image: image,
        displayImg: displayImage,
        profession: profession,
        address: address,
        resume: resume,
        coverLetter: coverLetter,
        education: education,
        aboutU: aboutU,
        broadArea: broadArea,
        specializedArea: specializedArea,
        cant: cant,
      };

      const result = await User.findOneAndUpdate(
        { username: username },
        { $set: { aboutUser: newInfo } }
      );

      return res.json({result}) 
    } else {

      const none = {
        fieldname: "",
        originalname: "",
        encoding: "",
        mimetype: "",
        destination: "",
        filename: "",
        path: "",
        size: 0,
      };

      const newInfo = {
        image: image,
        displayImg: displayImage,
        resume: none,
        coverLetter: none,
        profession: profession,
        address: address,
        education: education,
        aboutU: aboutU,
        lookingFor: lookingfor,
        broadArea: broadArea,
        specializedArea: specializedArea,
        cant: cant,
      };

      const result = await User.findOneAndUpdate(
        { username: username },
        { $set: { aboutUser: newInfo } }
      );

      return res.json({result}) 
    }
});

router.put("/addjobs", addjobs);


module.exports = router;
