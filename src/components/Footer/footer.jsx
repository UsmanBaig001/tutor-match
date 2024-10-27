import React from "react";
import "./footer.css";
import Playstore from "../../assets/Playstore.png";
import Appstore from "../../assets/Appstore.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer id="footer">
        <div className="footer-top">
          <FooterAboutUs
            i2href="#home"
            i2="Home"
            i3href="https://www.youtube.com/"
          />
          <CompanyServises />
          <Newsletter />
        </div>
      </footer>
    </>
  );
};
export default Footer;

function FooterAboutUs() {
  return (
    <>
      <div className="footersec finance">
        <h3>Tutor Match</h3>
        <div className="bar-red"></div>
        <div className="footer-para">
          <p>
            Lorem ipsum is placeholder text commonly used to demonstrate the
            visual form of a document.
          </p>
        </div>
        <div className="footer-icon-container">
          <Link
            href="https://www.facebook.com/"
            className="link"
            target="blank"
          >
            <div className="footer-icon">
              <i className="fa-brands fa-facebook-f"></i>
            </div>
          </Link>
          <Link
            href="https://www.instagram.com/"
            className="link"
            target="blank"
          >
            <div className="footer-icon">
              <i className="fa-brands fa-instagram"></i>
            </div>
          </Link>
          <Link href="https://www.twitter.com/" className="link" target="blank">
            <div className="footer-icon">
              <i className="fa-brands fa-twitter"></i>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

function CompanyServises() {
  return (
    <>
      <div className={"footersec"}>
        <h3>Pages</h3>
        <div className="bar-red"></div>
        <ul>
          <Link className="link" to={"/home"} style={{ color: "white" }}>
            <li>Home</li>
          </Link>
          <Link className="link" to={"/courses"} style={{ color: "white" }}>
            <li>Courses</li>
          </Link>
          <Link className="link" to={"/teachers"} style={{ color: "white" }}>
            <li>Teachers</li>
          </Link>
        </ul>
      </div>
    </>
  );
}
function Newsletter(props) {
  return (
    <>
      <div className={"footersec"}>
        <h3>Newsletter</h3>
        <div className="bar-red"></div>
        <h4>{"Subscribe Our Newsletter"}</h4>
        <div className="news-input">
          <form>
            <input type="email" name="" id="" placeholder="Enter E-Mail" />
            <button type="submit">
              <i className="fa-solid fa-location-arrow"></i>
            </button>
          </form>
        </div>
        <div className="stores">
          <a href={"https://play.google.com"} target="blank">
            <img src={Playstore} alt="" />
          </a>
          <a href={"https://www.apple.com/"} target="blank">
            <img src={Appstore} alt="" />
          </a>
        </div>
      </div>
    </>
  );
}
