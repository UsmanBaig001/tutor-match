import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "../../../assets/Logo1.svg";
import useForgetPass from "./useForgetPass";
import { Link } from "react-router-dom";

const defaultTheme = createTheme();

export default function ForgetPass() {
  const { handleSubmit, handleChange, state } = useForgetPass();

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

          <Typography component="h1" variant="h5">
            Forget Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={handleChange}
              autoComplete="email"
              autoFocus
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onSubmit={handleSubmit}
            >
              Forget Password
            </Button>
            <Grid container>
              <Grid item>
                <Link to={"/auth/login"} style={{ textDecoration: "none" }}>
                  {"Remember Password?"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
