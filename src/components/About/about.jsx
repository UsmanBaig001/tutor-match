import React from "react";
import "./about.css";

const About = () => {
  return (
    <>
      <div className="about" id="about">
        <div className="about-top">
          <p>About Teacher Finder Services</p>
        </div>
        <div className="about-bottom">
          <div className="bott-box">
            <div className="box">
              <div className="bar"></div>
              <span>About Us</span>
            </div>
            <div className="box">
              <h1>The Place Where You Can <span>Achieve</span></h1>
            </div>
            <div className="box">
              <p>Learn From Anywhere In World On Desktop, Mobile Or Tablet With An Internet Connection.</p>
            </div>
            <div className="column">
              <div className="arrow">
                <div className="left"></div>
                <div className="right">
                  <p>Trusted By 1k+ Teachers Arround The World!</p>
                </div>
              </div>
              <div className="arrow">
                <div className="left"></div>
                <div className="right">
                  <p>9/10 Average Satisfaction Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default About;
