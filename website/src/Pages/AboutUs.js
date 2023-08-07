import React from "react";
import Nav from "../Components/Nav";
import "../MyStyles/AboutUs.css";
import IMG from "../Images/aboutUs.jpg";

function AboutUs() {
  return (
    <div>
      <Nav />
      <div className="aboutUsOuterContainer">
        <div className="test">
          <div className="aboutUsGrid">
            <div className="aboutUsFlow aboutUsImgCont">
              <img className="aboutUsImg" src={IMG} alt="business people" />
            </div>
            <div>
              <div>
                <div className="aboutUsInfoContainers">
                  <span className="aboutUsHeaders">About Us</span>
                  <p className="infoBodies">
                    Welcome to GradJobs, your ultimate destination for launching
                    a successful career journey. At GradJobs, we understand the
                    unique challenges that graduates face when entering the job
                    market, and we are dedicated to providing a comprehensive
                    platform that connects talented graduates with top-tier
                    employers.
                  </p>
                </div>

                <div className="aboutUsInfoContainers">
                  <span className="aboutUsHeaders">Our Vision</span>
                  <p className="infoBodies">
                    Our vision at GradJobs is to empower graduates worldwide by
                    simplifying the job searching process and facilitating
                    meaningful connections between talented individuals and
                    leading companies. We envision a world where every graduate
                    has access to exciting career opportunities that align with
                    their passions and aspirations.
                  </p>
                </div>

                <div className="aboutUsInfoContainers">
                  <span className="aboutUsHeaders">Our Mission</span>
                  <p className="infoBodies">
                    Our mission is to bridge the gap between graduates and
                    employers, offering an efficient and user-friendly platform
                    that enables seamless job exploration and application
                    processes. We strive to support graduates at every stage of
                    their job search, from discovering various career paths to
                    securing their dream job.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
