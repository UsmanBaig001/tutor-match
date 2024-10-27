import React from "react";
import Nav from "../../components/Home/banner/navbar/nav";
import Main from "./main/Main";
import Courses from "./courses/Courses";
import Teachers from "./teachers/Teachers";
import Account from "./account/account";
import Footer from "../../components/Footer/footer";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Details from "./details/Details";
import ChangePassword from "../Auth/changePassword/ChangePassword";
import Students from "./students/Students";
import CourseDetails from "./courseDetails/CourseDetails";
import Requests from "./requests/Requests";
import MyProfile from "./myProfile/MyProfile";
import ChatRoom from "./chatRoom/ChatRoom";
import CourseDash from "./courseDash/CourseDash";
const Index = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="account" element={<Account />} />
        <Route path="courses" element={<Courses />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="students" element={<Students />} />
        <Route path="requests" element={<Requests />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="myProfile" element={<MyProfile />} />
        <Route path="courseDash" element={<CourseDash />} />
        <Route path="details/:id" element={<Details />} />
        <Route path="chatRoom/:id" element={<ChatRoom />} />
        <Route path="changePassword" element={<ChangePassword />} />
        <Route path="courseDetails/:id" element={<CourseDetails />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
      <Footer />
    </>
  );
};

export default Index;
