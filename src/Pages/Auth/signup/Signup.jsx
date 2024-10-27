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
import {
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
} from "@mui/material";
import logo from "../../../assets/Logo1.jpg";
import useSignup from "./useSignup";
import { Link } from "react-router-dom";

const defaultTheme = createTheme();

export default function Signup() {
  const { handleChange, handleSubmit, formData, error, loading } = useSignup();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        maxWidth="xs"
        style={{ marginBottom: "30px" }}
      >
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
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {/* Role Selector  */}

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
                value={formData.role}
                name="role"
                onChange={handleChange}
              >
                <MenuItem value={"Teacher"}>Teacher</MenuItem>
                <MenuItem value={"Student"}>Student</MenuItem>
              </Select>
            </FormControl>

            {/* Role Selector End  */}

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
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
            />
            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {loading && <LinearProgress />}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  to={"/auth/login"}
                  // variant="body2"
                  sx={{ textDecoration: "none" }}
                >
                  {"Already have an account? Login"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
