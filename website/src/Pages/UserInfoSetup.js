import React, { useContext, useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import LRNav from "../Components/LRNav";
import axios from "axios";
import "../MyStyles/UserInfoSetup.css";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

function UserInfoSetup() {
  const [userInfo, setUserInfo] = useState(null);
  const { userStatus } = useContext(UserContext);
  const navigate = useNavigate();

  const [setupUserInfo, setSetUpUserInfo] = useState({
    image: null,
    profession: "",
    address: "",
    resume: null,
    coverLetter: null,
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
  });

  const handleUserSetup = async (e) => {

    try {

      let userInfo = await axios?.get("/userInfo")

      console.log(userInfo)

      const id = userInfo.data.id

      const {
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
      } = setupUserInfo;

      const { data } = await axios.post("/setup", {
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
      });

      if (data.error) {
        return <p>{data.error}</p>;
      } else {
        setSetUpUserInfo({
          image: null,
          profession: "",
          address: "",
          resume: null,
          coverLetter: null,
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
        });
        navigate("/");
      }
    } catch (e) {
      console.log(e.error);
    }
  };

  function handlePhoto(e) {
    setSetUpUserInfo({
      ...setupUserInfo,
      image: URL.createObjectURL(e.target.files[0]),
    });
  }

  function handleResume(e) {
    var element = document.getElementById("resume");
    var display = document.getElementById("resumeDisplay");

    setSetUpUserInfo({ ...setupUserInfo, resume: e.target.files[0] });

    if (setupUserInfo.resume != null) {
      element.classList.add("uploadHidden");
      display.classList.remove("uploadHidden");
    }
  }

  function handleCoverLetter(e) {
    var element = document.getElementById("coverletter");
    var display = document.getElementById("coverletterDisplay");

    setSetUpUserInfo({ ...setupUserInfo, coverLetter: e.target.files[0] });

    if (setupUserInfo.coverLetter != null) {
      element.classList.add("uploadHidden");
      display.classList.remove("uploadHidden");
    }
  }

  function addNewEducation(e) {}

  const ImageDisplay = () => {
    if (setupUserInfo.image === null) {
      return <span className="circle"></span>;
    } else {
      return (
        <img
          className="userPhoto"
          src={setupUserInfo?.image}
          alt="user photo"
        />
      );
    }
  };

  return (
    <div className="">
      <LRNav />
      <div className="userInfoSetupTitleContainer">
        <span className="userInfoSetupTitle">Lets get setup</span>
      </div>
      <div className="setupGridContainer">
        <div className="setupGrid">
          <div className="setupGridContainer">
            <div className="alignMiddle">
              <div className="setupImgContainer">
                <ImageDisplay />
              </div>
              <div className="addPhotoContainer">
                <input
                  required
                  id="userPhoto"
                  type="file"
                  style={{ display: "none", visibility: "hidden" }}
                  onChange={handlePhoto}
                />
                <label htmlFor="userPhoto">
                  <div className="photoContainer">
                    <span className="photo">Add Photo</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className="setUpUserInfoFormDiv">
            <div className="setUpUserInfoFormContainers">
              <label>Name:</label>
              <input
                required
                type="string"
                className="setUpUserInfoInput"
                value={setupUserInfo.name}
                onChange={(e) =>
                  setSetUpUserInfo({ ...setupUserInfo, name: e.target.value })
                }
              />
            </div>
            <div className="setUpUserInfoFormContainers">
              <label>Email:</label>
              <input
                required
                type="string"
                className="setUpUserInfoInput"
                value={setupUserInfo.email}
                onChange={(e) =>
                  setSetUpUserInfo({ ...setupUserInfo, email: e.target.value })
                }
              />
            </div>
            <div className="setUpUserInfoFormContainers">
              <label>Profession:</label>
              <input
                required
                type="string"
                className="setUpUserInfoInput"
                value={setupUserInfo.profession}
                onChange={(e) =>
                  setSetUpUserInfo({
                    ...setupUserInfo,
                    profession: e.target.value,
                  })
                }
              />
            </div>
            <div className="setUpUserInfoFormContainers">
              <label>Address:</label>
              <input
                required
                type="string"
                className="setUpUserInfoInput"
                value={setupUserInfo.address}
                onChange={(e) =>
                  setSetUpUserInfo({
                    ...setupUserInfo,
                    address: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="infoContainer">
        <div className="applicationInfoContainer">
          <div>
            <span className="userInfoSetupTitle applicationInfoTitle">
              Application Info
            </span>
          </div>
          <div className="applicationInfoGrid">
            <div className="resumeContainer">
              <div className="resume">
                <span>Resume:</span>
              </div>
              <div className="addFileContainer">
                <span id="uploadHidden">{setupUserInfo?.resume?.name}</span>
                <div>
                  <input
                    required
                    id="resume"
                    className=""
                    type="file"
                    style={{ display: "none", visibility: "hidden" }}
                    onChange={handleResume}
                  />
                  <label htmlFor="resume">
                    <FaPlus className="plus" />
                  </label>
                </div>
              </div>
            </div>
            <div className="coverletterContainer">
              <div className="coverletter">
                <span>Cover Letter:</span>
              </div>
              <div className="addFileContainer">
                <span id="uploadHidden">
                  {setupUserInfo?.coverLetter?.name}
                </span>
                <div>
                  <input
                    id="coverletter"
                    required
                    className=""
                    type="file"
                    style={{ display: "none", visibility: "hidden" }}
                    onChange={handleCoverLetter}
                  />
                  <label htmlFor="coverletter">
                    <FaPlus className="plus" />
                  </label>
                </div>
              </div>
            </div>
            <div className="shortDiscContainer">
              <div>
                <span>Short description about yourself:</span>
              </div>
              <div>
                <textarea
                  className="shortDisc"
                  required
                  onChange={(e) =>
                    setSetUpUserInfo({
                      ...setupUserInfo,
                      aboutU: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="educationContainer">
          <div>
            <span className="userInfoSetupTitle applicationInfoTitle">
              Education
            </span>
          </div>
          <div className="educationGrid">
            <div className="educationContainers">
              <div>
                <span>School Name:</span>
              </div>
              <input
                className="educationInputs"
                required
                type="string"
                value={setupUserInfo.schoolName}
                onChange={(e) =>
                  setSetUpUserInfo({
                    ...setupUserInfo,
                    schoolName: e.target.value,
                  })
                }
              />
            </div>
            <div className="educationContainers">
              <div>
                <span>Start Date:</span>
              </div>
              <input
                className="educationInputs"
                required
                type="string"
                value={setupUserInfo.startDate}
                onChange={(e) =>
                  setSetUpUserInfo({
                    ...setupUserInfo,
                    startDate: e.target.value,
                  })
                }
              />
            </div>
            <div className="educationContainers">
              <div>
                <span>End Date:</span>
              </div>
              <input
                className="educationInputs"
                required
                type="string"
                value={setupUserInfo.endDate}
                onChange={(e) =>
                  setSetUpUserInfo({
                    ...setupUserInfo,
                    endDate: e.target.value,
                  })
                }
              />
            </div>
            <div className="educationContainers">
              <div>
                <span>Highest Degree:</span>
              </div>
              <input
                className="educationInputs"
                required
                type="string"
                value={setupUserInfo.highestEdu}
                onChange={(e) =>
                  setSetUpUserInfo({
                    ...setupUserInfo,
                    highestEdu: e.target.value,
                  })
                }
              />
            </div>
            <div className="educationContainers">
              <div>
                <span>Name of Degree:</span>
              </div>
              <input
                className="educationInputs"
                required
                type="string"
                value={setupUserInfo.degree}
                onChange={(e) =>
                  setSetUpUserInfo({ ...setupUserInfo, degree: e.target.value })
                }
              />
            </div>
          </div>
          <div className="addEducationBtnContainer">
            <span className="addMoreEdText">Add more Education</span>
            <FaPlus className="addEducationBtn" onClick={addNewEducation} />
          </div>
        </div>
        <div className="lookingsForJobsContainer">
          <div>
            <span className="userInfoSetupTitle applicationInfoTitle">
              What jobs are you looking for?
            </span>
          </div>
          <div className="lookingForJobsGrid">
            <div className="educationContainers">
              <div>
                <span>Broad Area:</span>
              </div>
              <div>
                <select className="dropDown" name="None">
                  <option value="Computer Science">Computer Science</option>
                  <option value="Computer Engineer">Computer Engineer</option>
                  <option value="Mechanical Engineer">
                    Mechanical Engineer
                  </option>
                  <option value="Electrical Engineer">
                    Electrical Engineer
                  </option>
                  <option value="Mathmatician">Mathmatician</option>
                </select>
              </div>
            </div>
            <div className="educationContainers">
              <div>
                <span>Specialized Area:</span>
              </div>
              <div>
                <select
                  className="dropDown"
                  required
                  name="None"
                  onChange={(e) =>
                    setSetUpUserInfo({
                      ...setupUserInfo,
                      specializedArea: e.target.value,
                    })
                  }>
                  <option value="Artificial Intelligence">
                    Artificial Intelligence
                  </option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Web Dev">Web Dev</option>
                  <option value="Data bases">Data bases</option>
                  <option value="Software Developer">Software Developer</option>
                </select>
              </div>
            </div>
            <div className="educationContainers">
              <div>
                <span>
                  If you couldn't find what you were looking for type what jobs
                  you are looking for below:
                </span>
              </div>
              <textarea
                required
                className="shortDisc"
                onChange={(e) => {
                  setSetUpUserInfo({ ...setupUserInfo, cant: e.target.value });
                }}
              />
            </div>
          </div>
        </div>
        <div className="userInfoSetupDoneBtnContainer">
          <span className="userInfoSetupDoneBtn" onClick={()=>handleUserSetup()}>
            Done
          </span>
        </div>
      </div>
    </div>
  );
}

export default UserInfoSetup;
