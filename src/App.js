import React from "react";
import "./App.css";
import Routes from "./Pages/Routes";
import { useAuthContext } from "./contexts/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const App = () => {
  const { isAppLoading } = useAuthContext();
  if (isAppLoading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  return (
    <>
      <Routes />
    </>
  );
};
export default App;
