import React from "react";
import UseDashboard from "./useDashboard";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
const defaultTheme = createTheme();

function Dashboard() {
  const {
    file,
    days,
    time,
    state,
    setFile,
    loading,
    progress,
    handleSubmit,
    handleChange,
    handleTimeChange,
    handleCheckboxChange,
  } = UseDashboard();
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        {/* <CssBaseline /> */}
        <Box
          sx={{
            paddingTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            style={{ fontWeight: "normal", fontStyle: "italic" }}
          >
            Add a new Course
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
              id="name"
              label="Course Name"
              name="name"
              value={state.name}
              onChange={handleChange}
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={state.duration}
              id="duration"
              label="Course Duration"
              name="duration"
              onChange={handleChange}
              autoComplete="duration"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={state.price}
              id="price"
              label="Course Price"
              name="price"
              onChange={handleChange}
              autoComplete="price"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={state.description}
              id="description"
              label="Course Description"
              name="description"
              onChange={handleChange}
              autoComplete="description"
              autoFocus
            />

            <input
              type="date"
              value={state.date}
              style={{
                paddingRight: "10px",
                paddingLeft: "10px",
                paddingTop: "16px",
                paddingBottom: "16px",
                borderRadius: "4px",
                width: "100%",
                borderColor: "lightGrey",
                borderWidth: "1px",
                borderStyle: "solid",
                outlineColor: "blue",
                outlineWidth: "0.25px",
                marginTop: "12px",
              }}
              id="date"
              name="date"
              onChange={handleChange}
              required
            />
            <div style={{ display: "flex" }}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox color="secondary" />}
                  label="Monday"
                  name="Monday"
                  checked={days.Monday}
                  onChange={handleCheckboxChange}
                />
                <FormControlLabel
                  control={<Checkbox color="secondary" />}
                  label="Tuesday"
                  name="Tuesday"
                  checked={days.Tuesday}
                  onChange={handleCheckboxChange}
                />
                <FormControlLabel
                  control={<Checkbox color="secondary" />}
                  label="Wednesday"
                  name="Wednesday"
                  checked={days.Wednesday}
                  onChange={handleCheckboxChange}
                />
                <FormControlLabel
                  control={<Checkbox color="secondary" />}
                  label="Thursday"
                  name="Thursday"
                  checked={days.Thursday}
                  onChange={handleCheckboxChange}
                />
                <FormControlLabel
                  control={<Checkbox color="secondary" />}
                  label="Friday"
                  name="Friday"
                  checked={days.Friday}
                  onChange={handleCheckboxChange}
                />
                <FormControlLabel
                  control={<Checkbox color="secondary" />}
                  label="Saturday"
                  name="Saturday"
                  checked={days.Saturday}
                  onChange={handleCheckboxChange}
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox color="secondary" />}
                  label="08:00AM To 10:00AM"
                  name="time1"
                  checked={time.time1}
                  onChange={handleTimeChange}
                />
                <FormControlLabel
                  control={<Checkbox color="secondary" />}
                  label="12:00PM To 02:00PM"
                  name="time2"
                  checked={time.time2}
                  onChange={handleTimeChange}
                />
                <FormControlLabel
                  control={<Checkbox color="secondary" />}
                  label="04:00PM To 06:00PM"
                  name="time3"
                  checked={time.time3}
                  onChange={handleTimeChange}
                />
              </FormGroup>
            </div>

            <div
              className=""
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <input
                type="file"
                placeholder="Upload picture"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
                required
              />
              {file && typeof file === "object" && (
                <img
                  src={URL.createObjectURL(file)}
                  style={{ width: 100, height: 70 }}
                  alt="Uploaded Course"
                />
              )}
              {progress > "0" && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress size={34} />
                  {progress > "0" && (
                    <div
                      style={{
                        color: "green",
                        fontWeight: "bold",
                        marginLeft: "10px",
                      }}
                    >
                      {progress}%
                    </div>
                  )}
                </div>
              )}
            </div>
            {loading ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 8 }}
                onSubmit={handleSubmit}
                color="success"
              >
                <CircularProgress size={24} />
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 8 }}
                onSubmit={handleSubmit}
                color="success"
              >
                Add Course
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Dashboard;
