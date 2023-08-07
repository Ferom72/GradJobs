import React, { useContext, useEffect, useState} from "react";
import { UserContext } from "../Context/UserContext";
import "../MyStyles/UserInfo.css";
import DocxImage from "../Images/docx.png";
import PDF from "../Images/PDF.png";
import axios from "axios";
import UserInfoNav from "../Components/UserInfoNav";
import DisplayEdicationUserInfo from "../Components/DisplayEdicationUserInfo";

function UserInfo() {
  const {user} = useContext(UserContext)
  const [image,setImage] = useState(null)

  const HandleDocuments = ({ file }) => {
    if (file?.originalname.includes("docx")) {
      return <img className='fileImages docx' src={DocxImage} alt="document Picture" />;
    } else if (file?.originalname.includes("pdf")) {
      return <img className='fileImages pdf' src={PDF} alt="document Picture" />;
    }
  };

  const DisplayEducationContainer = () => {
    
    const educationList = user ? JSON?.parse(user?.aboutUser.education) : ""
    const EduListCont = [];

    if(educationList !== ""){
      educationList?.map((education,index)=>{
        EduListCont.push(<DisplayEdicationUserInfo key={index} educationDatas={education}/>)
      })
    }
  
    return EduListCont;
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = ''
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const HandleImage = () =>{

    const value  = user?.aboutUser?.image?.name

      if(value !== 'none'){
        const ImgData = user?.aboutUser?.image?.img?.data?.data
        const unitArray = new Uint8Array(ImgData)
        const blob = new Blob([unitArray],{type:"image/png"})
        const reader = new FileReader();

        reader.onloadend= () => {
          const base64String = arrayBufferToBase64(reader.result)  

          const imgSrc = `data:image/png;base64,${base64String}`
          document.getElementById('img-container').src = imgSrc
        }

        reader.readAsArrayBuffer(blob)

        return <img id="img-container" className="userPhoto" alt="Generated Image"/>
      }else{
        return <span className="circle"></span>;
      }
  }

  return (
    <div className="">
      <UserInfoNav/>
      <div className="userInfoSetupTitleContainer">
        <span className="userInfoSetupTitle">Account Info</span>
      </div>
      <div className="setupGridContainer">
        <div className="setupGrid">
          <div className="setupGridContainer">
            <div className="alignMiddle">
              <div className="setupImgContainer">
                <HandleImage/>
              </div>
            </div>
          </div>
          <div className="UserInfoFormDiv">
            <div className="UserInfoFormContainers">
              <label className="whiteLetter">Name:</label>
              <p>{user?.name}</p>
            </div>
            <div className="UserInfoFormContainers">
              <label className="whiteLetter">Email:</label>
              <p>{user?.email}</p>
            </div>
            <div className="UserInfoFormContainers">
              <label className="whiteLetter">Profession:</label>
              <p>{user?.aboutUser?.profession}</p>
            </div>
            <div className="UserInfoFormContainers">
              <label className="whiteLetter">Address:</label>
              <p>{user?.aboutUser?.address}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="infoContainer">
        <div className="applicationInfoContainer">
          <div>
            <span className="userInfoTitle applicationInfoTitle">
              Application Info
            </span>
          </div>
          <div className="applicationInfoGrid">
            <div className="resumeContainer">
              <div className="resume">
                <span className="whiteLetter">Resume:</span>
              </div>
              <div className="userAddFileContainer">
                <HandleDocuments file={user?.aboutUser?.resume} />
              </div>
            </div>
            <div className="coverletterContainer">
              <div className="coverletter">
                <span className="whiteLetter">Cover Letter:</span>
              </div>
              <div className="userAddFileContainer">
                <HandleDocuments file={user?.aboutUser?.coverLetter} />
              </div>
            </div>
            <div className="shortDiscContainer">
              <div>
                <span className="whiteLetter">
                  Short description about yourself:
                </span>
              </div>
              <div>
                <p>{user?.aboutUser?.aboutU}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="educationContainer">
          <div>
            <span className="userInfoTitle applicationInfoTitle">
              Education
            </span>
          </div>
          <DisplayEducationContainer/>
        </div>
        <div className="lookingsForJobsContainer">
          <div>
            <span className="userInfoTitle applicationInfoTitle">
              What jobs are you looking for?
            </span>
          </div>
          <div className="lookingForJobsGrid">
            <div className="educationContainers">
              <div>
                <span className="whiteLetter">Broad Area:</span>
              </div>
              <div>
                <p>{user?.aboutUser?.broadArea}</p>
              </div>
            </div>
            <div className="educationContainers">
              <div>
                <span className="whiteLetter">Specialized Area:</span>
              </div>
              <div>
                <p>{user?.aboutUser?.specializedArea}</p>
              </div>
            </div>
            <div className="educationContainers">
              <div>
                <span className="whiteLetter">
                  If you couldn't find what you were looking for type what jobs
                  you are looking for below:
                </span>
              </div>
              <p>{user?.aboutUser?.cant}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
