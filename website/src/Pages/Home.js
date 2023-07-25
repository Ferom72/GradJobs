import React, { useContext, useEffect, useState } from "react";
import Nav from "../Components/Nav";
import Banner from "../Components/Banner";
import JobsFilter from "../Components/JobsFilter";
import JobContainer from "../Components/JobContainer";
import jsondata from "../Helper/Helper.json";
import { UserContext } from "../Context/UserContext";

function Home() {
  const { search, setJob, jobfilters } = useContext(UserContext);

  let jobSelection = (job) => {
    setJob(job);
  };

  function filterJobs(jobData, filters) {
    return jobData.filter(job => {
      return filters.every(filter => {
        return job[filter.type] === filter.value;
      });
    });
  }

  let JobList = () => {
    let data =
      search === ""
        ? jsondata?.jobs
        : jsondata?.jobs.filter(function (job, index) {
            let title = job.jobTitle.toLocaleLowerCase()
            return title.includes(search);
          });

    data = jobfilters.length == 0 ? data : filterJobs(data, jobfilters);

    return data?.map((item) => (
      <JobContainer key={item.id} jobs={item} select={jobSelection} />
    ));
  };

  return (
    <div>
      <Nav />
      <Banner />
      <JobsFilter />
      <JobList />
    </div>
  );
}

export default Home;
