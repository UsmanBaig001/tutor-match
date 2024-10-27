import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Frontend from "./Frontend/index";
import Auth from "./Auth/auth";
import { useAuthContext } from "../contexts/AuthContext";
import PrivateRoute from "../components/PrivateRoute";
import { auth } from "../config/firebase";
export default function Index() {
  const { isAuth } = useAuthContext();
  const user = auth.currentUser;

  return (
    <Routes>
      <Route path="/*" element={<PrivateRoute Component={Frontend} />} />
      <Route
        path="/auth/*"
        element={
          !isAuth || !user.emailVerified ? <Auth /> : <Navigate to="/" />
        }
      />
    </Routes>
  );
}
