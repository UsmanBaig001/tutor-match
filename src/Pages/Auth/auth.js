import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./login/Login";
import Signup from "./signup/Signup";
import ForgetPass from "./forgetPassword/ForgetPass";
import Verification from "./verification/Verification";
const Auth = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="forgetPass" element={<ForgetPass />} />
      <Route path="verification" element={<Verification />} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
};

export default Auth;
