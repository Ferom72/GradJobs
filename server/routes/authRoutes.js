const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  register, loginUser,userProfile,addUserInfo
} = require("../controllers/authControllers")

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

router.post('/register',register)
router.post('/login',loginUser)
router.get('/userInfo',userProfile)
router.post('/setup',addUserInfo)


module.exports = router;