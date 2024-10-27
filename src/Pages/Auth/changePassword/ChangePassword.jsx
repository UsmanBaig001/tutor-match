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
import { Link } from "react-router-dom";
import UseChangePass from "./useChangePass";

const defaultTheme = createTheme();

export default function ChangePassword() {
  const { handleChange, handleSubmit, state, error, loading } = UseChangePass();

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
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Change Password
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
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              id="currentPass"
              name="currentPass"
              label="Current Password"
              type="password"
              value={state.currentPass}
              onChange={handleChange}
              required
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="newPass"
              label="New Password"
              type="password"
              value={state.newPass}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmNewPass"
              label="Confirm Password"
              type="password"
              value={state.confirmNewPass}
              onChange={handleChange}
            />
            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}
            {loading && <LinearProgress />}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Change Password
            </Button>
            {/* <Grid container>
              <Grid item>
                <Link to={"/account"} sx={{ textDecoration: "none" }}>
                  {"Go Back"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
