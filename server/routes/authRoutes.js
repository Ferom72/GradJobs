const express = require("express");
const router = express.Router();
const multer = require("multer");
const cors = require("cors");
const {
  register,
  loginUser,
  userProfile,
  addUserInfo,
  getFiles,
  addjobs,
} = require("../controllers/authControllers");

router.use(
  cors({
    credentials: true,
    origin: 'https://gradjobs-de12a.web.app/',
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
  limits: {
    fileSize: 1048576,
  },
});

router.post("/register", register);
router.post("/login", loginUser);
router.get("/userInfo", userProfile);
router.post("/setup", uploads.any(), addUserInfo);
router.put("/addjobs",addjobs)

module.exports = router;
