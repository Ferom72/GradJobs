const User = require("../modules/user");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../Helpers/auths");

const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name) {
      return res.json({
        error: "name is required",
      });
    }

    let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if(!email) {
      return res.json({
        error: "email is required",
      });
    }else if (!emailPattern.test(email)) {
      return res.json({
        error: "Invalid email format",
      })
    }

    if (!username) {
      return res.json({
        error: "username is required",
      });
    }

    if (!password) {
      return res.json({
        error: "password is required",
      });
    }

    const usernameExist = await User.findOne({ username });

    if (usernameExist) {
      return res.json({
        error: "username already exists",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      username,
      password: hashedPassword,
      jobs: [
        {
          jobName: "",
          applied: false,
        },
      ],
      aboutUser: {
        image: {},
        displayImg:"",
        profession: "",
        address: "",
        resume: {
          fieldname: "",
          originalname: "",
          encoding: "",
          mimetype: "",
          destination: "",
          filename: "",
          path: "",
          size: 0,
        },
        coverLetter: {
          fieldname: "",
          originalname: "",
          encoding: "",
          mimetype: "",
          destination: "",
          filename: "",
          path: "",
          size: 0,
        },
        education:[],
        aboutU: "",
        lookingFor: "",
        broadArea: "",
        specializedArea: "",
        cant: "",
      },
    });

    return res.json(user);
  } catch (e) {
    console.log(e);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if(!user) {
      return res.json({
        error: "Wrong Username or Password",
      });
    }

    const match = await comparePassword(password, user.password);

    if(match){
      jwt.sign(
        {
          id: user.id,
          username: user.username,
          name: user.name,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h"
        },
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        }
      );
    } else if (!match){
      return res.json({
        error: "Wrong Username or Password",
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const addjobs = async (req,res) => {

  const {usernames,jobApplied} = req.body

  try{
    
    const result = await User.findOneAndUpdate({username:usernames},{$push:{jobs:jobApplied}})
    res.json({updatedCount:result})
  }catch(e){
    res.status(500).json({error:"something went wrong"})
  }
}

const userProfile = async (req, res) => {
  const { token } = req.cookies;

  let decoded = jwt.decode(token);
  let username = decoded?.username;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.json({
        error: "Username could not be found",
      });
    } else {
      res.json(user);
    }
  } catch (e) {
    console.log(e.error);
  }
};

const appliedJobs = async (req, res) => {
  const { id, movie } = req.body;

  try {
    const result = await User.findOneAndUpdate(
      { _id: id },
      { $push: { movie: movie } }
    );
    res.json({ updatedCount: result });
  } catch (e) {
    res.status(500).json({ error: "something went wrong" });
  }
};

module.exports = {
  register,
  loginUser,
  appliedJobs,
  userProfile,
  addjobs,
};