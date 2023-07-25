const User = require("../modules/user");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { hashPassword, comparePassword } = require("../Helpers/auths");

const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name) {
      return res.json({
        error: "name is required",
      });
    }

    if (!username) {
      return res.json({
        error: "username is required",
      });
    }

    if (!email) {
      return res.json({
        error: "email is required",
      });
    }

    if (!password || password.length < 6) {
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

    if (!user) {
      return res.json({
        error: "Username could not be found",
      });
    }

    user.aboutUser;

    const match = await comparePassword(password, user.password);

    if (match) {
      jwt.sign(
        {
          id: user.id,
          username: user.username,
          name: user.name,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        }
      );
    } else if (!match) {
      res.json({
        error: "passwords didnt match",
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const addUserInfo = async (req, res) => {

  try {
    const {
      username,
      profession,
      address,
      education,
      aboutU,
      lookingfor,
      broadArea,
      specializedArea,
      cant,
    } = req.body;

    let images = '';
    let resume = '';
    let coverLetter = '';
    let imageData = ''
    let image = {
      name: "none",
      img: {
        data: "",
        contentType: "image/png",
      },
    };

    var length = req?.files?.length

    console.log( req?.files[0])
    console.log( req?.files[1])
    console.log( req?.files[2])


    if(length > 0){
      req?.files.map((file)=>{
          if(file?.fieldname === "image"){
              console.log("image")
              images = file
          }else if(file?.fieldname === "resume"){
              console.log("resume")
              resume = file
          }else if(file?.fieldname === "coverLetter"){
              console.log("coverLetter")
              coverLetter = file
          }
      })

      if(images !== ''){
          imageData = fs.readFileSync(
          `C:/Users/Felipe/Documents/GradJobs/gradjobs/server/routes/uploads/${images?.filename}`,
          (err, data) => {
            return data;
          }
        );
  
         image = {
          name: images.filename,
          img: {
            data: imageData,
            contentType: "image/png",
          },
        };
      }

      if(resume === ''){
        resume = {
          fieldname: "",
          originalname: "",
          encoding: "",
          mimetype: "",
          destination: "",
          filename: "",
          path: "",
          size: 0,
        }
      }

      if(coverLetter === ''){
        coverLetter = {
          fieldname: "",
          originalname: "",
          encoding: "",
          mimetype: "",
          destination: "",
          filename: "",
          path: "",
          size: 0,
        }
      } 
      
      const newInfo = {
        image: image,
        profession: profession,
        address: address,
        resume: resume,
        coverLetter: coverLetter,
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
    }else{


      const none = {
        fieldname: "",
        originalname: "",
        encoding: "",
        mimetype: "",
        destination: "",
        filename: "",
        path: "",
        size: 0,
      }

      const newInfo = {
        image:image,
        resume:none,
        coverLetter:none,
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
  } catch (e) {
    console.log(e.error);
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
  addUserInfo,
  addjobs,
};
