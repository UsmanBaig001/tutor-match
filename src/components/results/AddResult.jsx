import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useAuthContext } from "../../contexts/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../../config/firebase";
import { message } from "antd";
const AddResults = ({ studentsData }) => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [subjects, setSubjects] = useState({
    math: "",
    science: "",
    english: "",
    history: "",
  });

  const handleInputChange = (subject, value) => {
    setSubjects({ ...subjects, [subject]: value });
  };

  const handleAddResult = async () => {
    setLoading(true);
    try {
      if (
        !selectedStudent ||
        !selectedSemester ||
        Object.values(subjects).some((val) => val === "")
      ) {
        message.info("Please fill all fields");
        return;
      }
      const resultData = {
        studentData: studentsData.find((data) => data.uid === selectedStudent),
        semester: selectedSemester,
        ...subjects,
        addedBy: user.uid,
      };
      await addDoc(collection(firestore, "Results"), resultData);
      message.success("Result added successfully");
      setSelectedStudent("");
      setSelectedSemester("");
      setSubjects({ math: "", science: "", english: "", history: "" });
      setLoading(false);
    } catch (error) {
      console.error("Error adding result:", error);
      message.error("Failed to add result");
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: "16px" }}>
      <Typography variant="h6" sx={{ marginBottom: "16px" }}>
        Add Results
      </Typography>
      <Select
        value={selectedStudent}
        onChange={(e) => {
          console.log("Selected Student ID:", e.target.value);
          setSelectedStudent(e.target.value);
        }}
        displayEmpty
        fullWidth
        sx={{ marginBottom: "16px" }}
      >
        <MenuItem value="" disabled>
          Select Student
        </MenuItem>
        {studentsData &&
          studentsData.map((student, index) => (
            <MenuItem key={index} value={student.uid}>
              {student.name}
            </MenuItem>
          ))}
      </Select>
      <Select
        value={selectedSemester}
        onChange={(e) => {
          console.log("Selected Semester:", e.target.value);
          setSelectedSemester(e.target.value);
        }}
        displayEmpty
        fullWidth
        sx={{ marginBottom: "16px" }}
      >
        <MenuItem value="" disabled>
          Select Semester
        </MenuItem>
        {[...Array(8).keys()].map((i) => (
          <MenuItem key={i + 1} value={i + 1}>
            Semester {i + 1}
          </MenuItem>
        ))}
      </Select>
      <TextField
        label="Math"
        value={subjects.math}
        onChange={(e) => handleInputChange("math", e.target.value)}
        fullWidth
        sx={{ marginBottom: "16px" }}
      />
      <TextField
        label="Science"
        value={subjects.science}
        onChange={(e) => handleInputChange("science", e.target.value)}
        fullWidth
        sx={{ marginBottom: "16px" }}
      />
      <TextField
        label="English"
        value={subjects.english}
        onChange={(e) => handleInputChange("english", e.target.value)}
        fullWidth
        sx={{ marginBottom: "16px" }}
      />
      <TextField
        label="History"
        value={subjects.history}
        onChange={(e) => handleInputChange("history", e.target.value)}
        fullWidth
        sx={{ marginBottom: "16px" }}
      />
      <Button variant="contained" onClick={handleAddResult} fullWidth>
        Add Result
      </Button>
    </Box>
  );
};

export default AddResults;
