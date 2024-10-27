import React, { useState } from "react";
import NavImg from "../../../../assets/Logo1.jpg";
import "./nav.css";
import { Link } from "react-router-dom";
import BasicMenu from "../../../DropDown/DropDown";

const Nav = () => {
  const user = localStorage.getItem("user");
  const role = JSON.parse(user).role;
  const [Nav, setNav] = useState(false);
  console.log("role", role);
  return (
    <nav className="nav-container">
      <div className="nav-main" id="navmain">
        <Link to={"/"} className="nav-logo">
          <img src={NavImg} style={{ height: "60px", width: "170px" }} alt="" />
          {/* <div className="">Tutor Match</div> */}
        </Link>
        <div className="list" id="list">
          <ul>
            <li>
              <Link to={"/"} className="NavLink">
                Home
              </Link>
            </li>
            <li>
              <Link to={"/courses"} className="NavLink">
                Courses
              </Link>
            </li>
            <li>
              <Link to={"/teachers"} className="NavLink">
                Teachers
              </Link>
            </li>
            <li>
              <Link to={"/students"} className="NavLink">
                Students
              </Link>
            </li>
            {role !== "Admin" && (
              <li>
                <Link to={"/account"} className="NavLink">
                  Account
                </Link>
              </li>
            )}
            {role === "Admin" && (
              <>
                <li>
                  <Link to={"/dashboard"} className="NavLink">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to={"/requests"} className="NavLink">
                    Requests
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <Link className="primary-btn account">
          {/* <i className="fa-solid fa-circle-user"></i> */}
          <BasicMenu />
        </Link>

        {/* hamburger */}

        <div className="hamburger">
          <input type="checkbox" id="checkbox" onClick={() => setNav(!Nav)} />
          <label htmlFor="checkbox" className="toggle">
            <div className="bars" id="bar1"></div>
            <div className="bars" id="bar2"></div>
            <div className="bars" id="bar3"></div>
          </label>
        </div>
      </div>
      <div className={Nav ? "nav-manu" : "nav-hide"}>
        <ul>
          <Link
            className="link"
            to="/"
            onClick={() => {
              setNav(!Nav);
            }}
          >
            <li>Home</li>
          </Link>
          <Link
            className="link"
            to="/courses"
            onClick={() => {
              setNav(!Nav);
            }}
          >
            <li>Courses</li>
          </Link>
          <Link
            className="link"
            to="/teachers"
            onClick={() => {
              setNav(!Nav);
            }}
          >
            <li>Teachers</li>
          </Link>
          <Link
            className="link"
            to="/students"
            onClick={() => {
              setNav(!Nav);
            }}
          >
            <li>Students</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
