const User = require('../modules/user')
const jwt = require('jsonwebtoken')
const {hashPassword,comparePassword} = require("../Helpers/auths")

const register = async (req,res) =>{
    try{
      
      const {name,username,email,password} = req.body

      if(!name){
          return res.json({
            error: "name is required",
          });
      }
    
      if(!username){
        return res.json({
           error: "username is required",
        });
      }

      if(!email){
        return res.json({
            error: "email is required",
         });
      }
    
      if(!password || password.length < 6){
        return res.json({
          error: "password is required",
        });
      }

      const usernameExist = await User.findOne({ username });

      if(usernameExist){
        return res.json({
          error: "username already exists",
        });
      }

      const hashedPassword = await hashPassword(password);

      const user = await User.create({
        name,
        email,
        username,
        password:hashedPassword,
        jobs: [{
            jobName: '',
            applied: false
        }],
        aboutUser: {
          image: "",
          name: "",
          email: "",
          profession: "",
          address: "",
          resume: "",
          coverLetter: "",
          schoolName: "",
          startDate: "",
          endDate: "",
          highestEdu: "",
          degree: "",
          aboutU: "",
          lookingFor: "",
          broadArea: "",
          specializedArea: "",
          cant: "",
        }
      });

      return res.json(user)

    }catch(e){
        console.log(e)
    }
}

const loginUser = async (req, res) => {

    try {
      const { username, password } = req.body;
  
      const user = await User.findOne({ username });

      if (!user) {
        return res.json({
          error: "Username could not be found",
        });
      }

      user.aboutUser
  
      const match = await comparePassword(password, user.password);
  
      if (match) {
        jwt.sign(
          {id: user.id, username: user.username, name: user.name, email: user.email },
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
}

const addUserInfo = async (req,res) => {
   try{
    const {
      id,
      image,
      profession,
      address,
      resume,
      coverLetter,
      schoolName,
      startDate,
      endDatehighestEdu,
      degree,
      aboutU,
      lookingFor,
      broadArea,
      specializedArea,
      cant,
    } = req.body

    const newInfo = {
      image : image,
      profession: profession,
      address : address,
      resume : resume,
      coverLetter : coverLetter,
      schoolName : schoolName,
      startDate : startDate,
      endDatehighestEdu : endDatehighestEdu,
      degree: degree,
      aboutU: aboutU,
      lookingFor: lookingFor,
      broadArea: broadArea,
      specializedArea: specializedArea,
      cant: cant,
    }

    const result = await User.findOneAndUpdate({_id : id},{$set:{aboutUser: newInfo}})

   }catch(e){
    console.log(e.error)
   }
}

const getJobs = async (req,res) =>{
  
    const { token } = req.cookies;
    
    let decoded = jwt.decode(token)
      
    try{
      const user = await User.findById(decoded.id)
  
      if (!user) {
        return res.json({
          error: "Username could not be found",
        });
      }else{
        res.json(user)
      }
  
    }catch(e){
      console.log(e.error)
    } 
}

const userProfile = async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

const appliedJobs = async (req, res) => {

    const {id,movie} = req.body
  
    try{
      const result = await User.findOneAndUpdate({_id:id},{$push:{movie:movie}})
      res.json({updatedCount:result})
    }catch(e){
      res.status(500).json({error:"something went wrong"})
    }
}

module.exports = {
    register,
    loginUser,
    appliedJobs,
    userProfile,
    addUserInfo
}