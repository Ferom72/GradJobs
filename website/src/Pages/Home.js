import React, { useContext, useState } from 'react'
import Nav from '../Components/Nav'
import Banner from '../Components/Banner'
import JobsFilter from '../Components/JobsFilter'
import JobContainer from '../Components/JobContainer'
import data from '../Helper/Helper.json'
import { UserContext } from '../Context/UserContext'

function Home() {
  
  const {setJob} = useContext(UserContext)  
  

  let jobSelection = (job) => {
    setJob(job)
  }

  let JobList = () =>{
    return data.jobs.map((item) => (
      <JobContainer key={item.id} jobs={item}  select={jobSelection} />
    ))
  }

  return (
    <div>
      <Nav/>
      <Banner/>
      <JobsFilter/>
      <JobList/>
    </div>
  )
}

export default Home