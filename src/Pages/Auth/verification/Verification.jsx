import React from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import logo from "../../../assets/Logo1.svg";
import UseVerfication from "./useVerfication";
import { Link } from "react-router-dom";

const defaultTheme = createTheme();
function Verification() {
  const { handleVerify } = UseVerfication();
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={logo}
            alt=""
            width={"150px"}
            style={{
              margin: "10px 0 20px 0",
            }}
          />

          <Typography component="h1" variant="h5" color={"blueviolet"}>
            Email Verification
          </Typography>
          <Link
            to={"/auth/login"}
            style={{
              marginTop: "12px",
              textDecoration: "none",
              color: "green",
            }}
          >
            Proceed To Login
          </Link>
          <Box
            component="form"
            onSubmit={handleVerify}
            noValidate
            sx={{ mt: 1 }}
          >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onSubmit={handleVerify}
            >
              Send Verification Link
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Verification;
