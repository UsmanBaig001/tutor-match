import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "../../../assets/Logo1.jpg";
import uselogin from "./uselogin";
import {
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
} from "@mui/material";
import { Link } from "react-router-dom";

const defaultTheme = createTheme();

export default function Login() {
  const { handleSubmit, handleChange, loading, state, error } = uselogin();

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
            width={"200px"}
            style={{
              margin: "10px 0 20px 0",
            }}
          />

          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <FormControl
              fullWidth
              sx={{
                mb: 1,
                mt: 2,
              }}
            >
              <InputLabel id="demo-simple-select-label">
                Select Your Role
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Select Your Role"
                value={state.roll}
                name="roll"
                onChange={handleChange}
              >
                <MenuItem value={"Teacher"}>Teacher</MenuItem>
                <MenuItem value={"Student"}>Student</MenuItem>
                {/* <MenuItem value={"Admin"}>Admin</MenuItem> */}
              </Select>
            </FormControl>
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
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={handleChange}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            {error && <p style={{ color: "red" }}> {error} </p>}
            {loading ? (
              <>
                <Box sx={{ width: "100%" }}>
                  <LinearProgress />
                </Box>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>
              </>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
            )}
            <Grid container>
              <Grid item xs>
                <Link
                  to={"/auth/forgetPass"}
                  variant="body2"
                  sx={{ textDecoration: "none" }}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  to={"/auth/signup"}
                  // variant="body2"
                  sx={{ textDecoration: "none" }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
