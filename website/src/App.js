import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import axios from 'axios'
import Home from './Pages/Home'
import JobInfo from './Pages/JobInfo'
import LRS from './Pages/LRS'
import {UserContext} from './Context/UserContext'
import UserInfoSetup from './Pages/UserInfoSetup'

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function App() {

  const [job, setJob] = useState(null)
  const [userStatus,setUserStatus] = useState(false)
  const [user,setUser] = useState(null)


  return (
    <UserContext.Provider value={{job,setJob,userStatus,setUserStatus,user,setUser}}>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/jobInfo' element={<JobInfo/>}/>
        <Route path='/login' element={<LRS/>}/>
        <Route path='/setup' element={<UserInfoSetup/>}/>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
