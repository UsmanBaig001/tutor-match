import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import {
  Box,
  Button,
  Typography,
  Input,
  CircularProgress,
  Snackbar,
} from "@mui/material";

function FileUpload(props) {
  const auth = getAuth();
  const uid = auth?.currentUser?.uid;
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const storage = getStorage();
  const db = getFirestore();
  const [courseData, setCourseData] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!props.courseId) return;

      const courseRef = doc(db, "Courses", props?.courseId);

      try {
        const docSnap = await getDoc(courseRef);
        if (docSnap.exists()) {
          setCourseData(docSnap.data());
          setUploadedFiles(docSnap.data()?.files || []);
        } else {
          setSnackMessage("Course not found.");
          setSnackOpen(true);
        }
      } catch (error) {
        setSnackMessage("Error fetching course.");
        setSnackOpen(true);
      }
    };

    fetchCourse();
  }, [props.courseId]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const storageRef = ref(storage, `uploads/${uid}/${file.name}`);
    setLoading(true);

    try {
      await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(storageRef);

      const courseRef = doc(db, "Courses", props?.courseId);
      await updateDoc(courseRef, {
        files: arrayUnion(downloadUrl),
      });

      setUploadedFiles((prev) => [...prev, downloadUrl]);
      setSnackMessage("File uploaded successfully!");
      setSnackOpen(true);
      setFile(null);
      setPreviewUrl(null);
    } catch (error) {
      setSnackMessage("Error uploading file.");
      setSnackOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  // Separate files into categories
  const getFilesByType = (fileUrl) => {
    if (
      fileUrl.includes(".mp4") ||
      fileUrl.includes(".webm") ||
      fileUrl.includes(".mkv")
    ) {
      return "video";
    } else if (fileUrl.includes(".pdf")) {
      return "pdf";
    } else {
      return "image";
    }
  };

  const categorizedFiles = {
    images: uploadedFiles.filter(
      (fileUrl) => getFilesByType(fileUrl) === "image"
    ),
    videos: uploadedFiles.filter(
      (fileUrl) => getFilesByType(fileUrl) === "video"
    ),
    pdfs: uploadedFiles.filter((fileUrl) => getFilesByType(fileUrl) === "pdf"),
  };

  return (
    <>
      <Box sx={{ marginBottom: 3, padding: 2 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          File Upload
        </Typography>
        <Input type="file" onChange={handleFileChange} />
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          sx={{ marginLeft: 2 }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Upload File"
          )}
        </Button>
        {previewUrl && (
          <Box sx={{ marginTop: 2, textAlign: "center" }}>
            <Typography variant="h6">Preview:</Typography>
            {file && file.type.startsWith("video/") ? (
              <video
                controls
                src={previewUrl}
                style={{ width: "100%", maxHeight: "400px", borderRadius: 2 }}
              />
            ) : file && file.type === "application/pdf" ? (
              <iframe
                src={previewUrl}
                style={{ width: "100%", height: "400px", border: "none" }}
                title="PDF Preview"
              />
            ) : (
              <img
                src={previewUrl}
                alt="Preview"
                style={{ width: "100%", maxHeight: "400px", borderRadius: 2 }}
              />
            )}
          </Box>
        )}
      </Box>
      <Box
        sx={{
          margin: "auto",
          padding: 2,
          border: "1px solid #ccc",
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}
        >
          {courseData && (
            <Typography variant="h4" gutterBottom>
              Course Title: {courseData?.name || "No title available"}
            </Typography>
          )}

          {/* Images Section */}
          {categorizedFiles?.images?.length > 0 && (
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="h6">Uploaded Images:</Typography>
              {categorizedFiles.images.map((fileUrl, index) => (
                <Box key={index} sx={{ marginBottom: 1, marginTop: 4 }}>
                  <Typography variant="body2">
                    <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                      Image {index + 1}
                    </a>
                  </Typography>
                  <img
                    src={fileUrl}
                    alt={`Uploaded Image ${index + 1}`}
                    style={{
                      width: "100%",
                      maxHeight: "400px",
                      borderRadius: 2,
                    }}
                  />
                </Box>
              ))}
            </Box>
          )}

          {/* Videos Section */}
          {categorizedFiles?.videos?.length > 0 && (
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="h6">Uploaded Videos:</Typography>
              {categorizedFiles?.videos?.map((fileUrl, index) => (
                <Box key={index} sx={{ marginBottom: 1, marginTop: 4 }}>
                  <Typography variant="body2">
                    <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                      Video {index + 1}
                    </a>
                  </Typography>
                  <video
                    controls
                    src={fileUrl}
                    style={{
                      width: "100%",
                      maxHeight: "400px",
                      borderRadius: 2,
                    }}
                  />
                </Box>
              ))}
            </Box>
          )}

          {/* PDFs Section */}
          {categorizedFiles?.pdfs?.length > 0 && (
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="h6">Uploaded PDFs:</Typography>
              {categorizedFiles?.pdfs?.map((fileUrl, index) => (
                <Box key={index} sx={{ marginBottom: 1, marginTop: 4 }}>
                  <Typography variant="body2">
                    <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                      PDF {index + 1}
                    </a>
                  </Typography>
                  <iframe
                    title="PDF Preview"
                    width="100%"
                    height="400px"
                    src={fileUrl}
                  />
                </Box>
              ))}
            </Box>
          )}
        </Box>

        <Snackbar
          open={snackOpen}
          autoHideDuration={6000}
          onClose={handleSnackClose}
          message={snackMessage}
        />
      </Box>
    </>
  );
}

export default FileUpload;
