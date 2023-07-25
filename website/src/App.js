import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./Pages/Home";
import JobInfo from "./Pages/JobInfo";
import LRS from "./Pages/LRS";
import { UserContext } from "./Context/UserContext";
import UserInfoSetup from "./Pages/UserInfoSetup";
import UserInfo from "./Pages/UserInfo";
import AboutUs from "./Pages/AboutUs";

axios.defaults.baseURL = 'https://gradjobs-de12a.web.app';
axios.defaults.withCredentials = true;

function App() {
  const [job, setJob] = useState(null);
  const [userStatus, setUserStatus] = useState(false);
  const [user, setUser] = useState("");
  const [search, setSearch] = useState("");
  const [jobfilters, setJobFilters] = useState([]);
  const [educationData, setEducationData] = useState({
    schoolName: "",
    startDate: "",
    endDate: "",
    highestEdu: "",
    degree: "",
  });
  

  useEffect(() => {
    axios.get("/userInfo").then(({ data }) => {
      if (data.error != null) {
        setUser("");
      } else {
        setUser(data);
      }
    });
  }, [userStatus]);

  function handleLoginNavStatus(value) {
    setUserStatus(value);
  }

  function handleSearch(value) {
    setSearch(value.toLowerCase());
  }

  function handleFilter(value){
    jobfilters.push(value)
  }

  function handleEducationData(name,value){
      setEducationData({...educationData,[name]:value})
  }

  function resetEducationData(){
    setEducationData({
      schoolName: "",
      startDate: "",
      endDate: "",
      highestEdu: "",
      degree: "",
    })
  }

  return (
    <UserContext.Provider
      value={{
        job,
        setJob,
        userStatus,
        handleLoginNavStatus,
        user,
        setUser,
        search,
        handleSearch,
        jobfilters,
        setJobFilters,
        handleFilter,
        educationData,
        handleEducationData,
        resetEducationData,
      }}>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/jobInfo" element={<JobInfo />} />
        <Route path="/login" element={<LRS />} />
        <Route path="/setup" element={<UserInfoSetup />} />
        <Route path="/userInfo" element={<UserInfo />} />
        <Route path="/aboutUs" element={<AboutUs/>}/>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
