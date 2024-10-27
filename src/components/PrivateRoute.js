import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { getAuth } from "firebase/auth";

export default function PrivateRoute({ Component }) {
  const { isAuth } = useAuthContext();
  const location = useLocation();
  const auth = getAuth();
  const emailVerified = auth?.currentUser?.emailVerified;

  if (!isAuth || !emailVerified)
    return (
      <Navigate to="/auth/login" state={{ from: location.pathname }} replace />
    );

  return <Component />;
}
