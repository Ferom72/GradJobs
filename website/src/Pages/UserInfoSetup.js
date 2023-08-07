import React, { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa";
import LRNav from "../Components/LRNav";
import BroadAreaInfo from "../Helper/BroadHelper.json";
import SpecificFieldInfo from "../Helper/SpecificFields.json";
import axios from "axios";
import "../MyStyles/UserInfoSetup.css";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Education from "../Components/Education";
import DisplayEducation from "../Components/DisplayEducation";
import BroadAreas from "../Components/BroadAreas";

function UserInfoSetup() {
  const { user, educationData, resetEducationData } = useContext(UserContext);
  const navigate = useNavigate();

  const EduListCont = [];
  const [update, setUpdate] = useState(false);
  const [educationList, setEducationList] = useState([]);
  const [setupUserInfo, setSetUpUserInfo] = useState({
    images: {
      displayImage: "",
      serverImage:""
    },
    profession: "",
    address: "",
    resume: "",
    coverLetter: "",
    education: [],
    aboutU: "",
    broadArea: "Computer Science",
    specializedArea: "",
    cant: "",
  });
  const [displayError,setDisplayError] = useState(false)
  const [errorMessage,setErrorMessage] = useState()

  const handleUserSetup = async (e) => {
    e.preventDefault();

    try {
      let formData = new FormData();
      formData.append("displayImage", setupUserInfo?.images.displayImage);
      formData.append("serverImage", setupUserInfo?.images.serverImage);
      educationList.push(educationData);
      formData.append("username", user?.username);
      formData.append("profession", setupUserInfo?.profession);
      formData.append("address", setupUserInfo?.address);
      formData.append("resume", setupUserInfo?.resume);
      formData.append("coverLetter", setupUserInfo?.coverLetter);
      formData.append("education", JSON.stringify(educationList));
      formData.append("aboutU", setupUserInfo?.aboutU);
      formData.append("broadArea", setupUserInfo?.broadArea);
      formData.append("specializedArea", setupUserInfo?.specializedArea);
      formData.append("cant", setupUserInfo?.cant);

      const { data } = await axios({
        method: "post",
        url: "/setup",
        data: formData,
      });

      if (data.error) {
        setDisplayError(true)
        setErrorMessage(data.error)
      } else {
        navigate("/");
      }

    } catch (e) {
      console.log(e);
    }
  };

  function handleUpDate() {
    setUpdate(!update);
  }

  function handlePhoto(){

    let value = document.getElementById("userPhoto")

    setSetUpUserInfo({...setupUserInfo,images:{
      serverImage: value.files[0],
      displayImage: URL.createObjectURL(value.files[0])
    }})
  }

  function handleResume(e) {
    var element = document.getElementById("resume");
    // var display = document.getElementById("resumeDisplay");

    setSetUpUserInfo({ ...setupUserInfo, resume: e.target.files[0] });

    if (setupUserInfo.resume != null) {
      element.classList.add("uploadHidden");
      // display.classList.remove("uploadHidden");
    }
  }

  function handleCoverLetter(e) {
    var element = document.getElementById("coverletter");
    // var display = document.getElementById("coverletterDisplay");

    setSetUpUserInfo({ ...setupUserInfo, coverLetter: e.target.files[0] });

    if (setupUserInfo.coverLetter != null) {
      element.classList.add("uploadHidden");
      // display.classList.remove("uploadHidden");
    }
  }

  function handleBroadArea(e) {
    setSetUpUserInfo({ ...setupUserInfo, broadArea: e.target.value });
  }

  function handleSpecializedArea(e) {
    setSetUpUserInfo({ ...setupUserInfo, specializedArea: e.target.value });
  }

  function handleEducationList() {
    educationList.push(educationData);
    resetEducationData();
  }

  const handleRemoveEducation = (index) => {
    educationList.splice(index, 1);
    handleUpDate();
  };

  const DisplayEducationContainer = () => {
    educationList?.forEach((education, index) => {
      if (EduListCont.length < educationList.length) {
        EduListCont.push(
          <DisplayEducation
            key={index}
            id={index}
            handleRemoveEducation={handleRemoveEducation}
            educationDatas={education}
          />
        );
      }
    });

    return EduListCont;
  };

  const ImageDisplay = () => {
    if (setupUserInfo?.images.displayImage === "") {
      return <span className="circle"></span>;
    } else {
      return (
        <img
          className="userPhoto"
          src={setupUserInfo?.images.displayImage}
          alt="user photo"
        />
      );
    }
  };

  const BroadAreaOptions = () => {
    const areaCont = [];

    BroadAreaInfo?.BroadArea.map((areas, index) => {
      areaCont.push(<BroadAreas areas={areas?.subject} key={index} />);
    });

    return areaCont;
  };

  const SpecializedAreaOptions = () => {
    const areaCont = [];
    const broadArea = setupUserInfo?.broadArea;

    SpecificFieldInfo?.[broadArea].map((areas, index) => {
      areaCont.push(
        <BroadAreas areas={areas?.subject} key={index} id={index} />
      );
    });

    return areaCont;
  };

  const ErrorMessage = () =>{
    return (
     <div className="errorMessageContainer">
       <span className="errorMessage">{errorMessage}</span>
     </div>
    )
 }

  return (
    <div className="">
      <LRNav />
      <div className="userInfoSetupTitleContainer">
        <span className="userInfoSetupTitle">Lets get setup</span>
      </div>
      {displayError ? <ErrorMessage/> : <span></span>}
      <form onSubmit={(e) => handleUserSetup(e)}>
        <div className="setupGridContainer">
          <div className="setupGrid">
            <div className="setupGridContainer">
              <div className="alignMiddle">
                <div className="setupImgContainer">
                  <ImageDisplay />
                </div>
                <div className="addPhotoContainer">
                  <div>
                    <input id="userPhoto" name="images" type="file" className="hidden" onChange={handlePhoto} />
                    <label htmlFor="userPhoto" className="addPhotoText">
                      <div className="photoContainer">
                        <span className="photo">Add Photo</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="setUpUserInfoFormDiv">
              <div className="setUpUserInfoFormContainers">
                <label>Name:</label>
                <input
                  disabled
                  type="string"
                  className="setUpUserInfoInput"
                  defaultValue={user?.name}
                />
              </div>
              <div className="setUpUserInfoFormContainers">
                <label>Email:</label>
                <input
                  disabled
                  type="string"
                  className="setUpUserInfoInput"
                  defaultValue={user?.email}
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
                      id="resume"
                      name="resumer"
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
                      name="coverletter"
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
            <DisplayEducationContainer />
            <Education />
            <div className="addEducationBtnContainer">
              <span className="addMoreEdText">Add more Education</span>
              <FaPlus
                className="addEducationBtn"
                onClick={handleEducationList}
              />
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
                  <select
                    className="dropDown"
                    required
                    defaultValue={"Computer Science"}
                    value={setupUserInfo.broadArea}
                    name="None"
                    onChange={(e) => handleBroadArea(e)}>
                    <BroadAreaOptions />
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
                    defaultValue={"Machine Learning"}
                    value={setupUserInfo.specializedArea}
                    name="None"
                    onChange={(e) => handleSpecializedArea(e)}>
                    <SpecializedAreaOptions />
                  </select>
                </div>
              </div>
              <div className="educationContainers">
                <div>
                  <span>
                    If you couldn't find what you were looking for type what
                    jobs you are looking for below:
                  </span>
                </div>
                <textarea
                  required
                  className="shortDisc"
                  onChange={(e) => {
                    setSetUpUserInfo({
                      ...setupUserInfo,
                      cant: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="userInfoSetupDoneBtnContainer">
            <button className="userInfoSetupDoneBtn" type="submit">
              Done
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UserInfoSetup;
