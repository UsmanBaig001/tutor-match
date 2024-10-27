import React from "react";
import useMyProfile from "./useMyProfile";
import TeacherProfile from "../../../components/profiles/TeacherProfile/TeacherProfile";
import StudentProfile from "../../../components/profiles/StudentProfile/StudentProfile";

function MyProfile() {
  const { role } = useMyProfile();
  return <>{role === "Teacher" ? <TeacherProfile /> : <StudentProfile />}</>;
}

export default MyProfile;
