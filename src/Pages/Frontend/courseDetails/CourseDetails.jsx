import React from "react";
import UseCourseDetails from "./useCourseDetails";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ReviewModal from "../../../components/ReviewModal/ReviewModal";
import { CircularProgress } from "@mui/material";
import PaymentModal from "../../../components/paymentModal/PaymentModal";

function CourseDetails() {
  const {
    data,
    handlePaymentModal,
    handleClose,
    handleOpen,
    open,
    role,
    handleEnrollNow,
    loading,
    openPayment,
    handleReview,
    handlePaymentClose,
  } = UseCourseDetails();
  if (!data) {
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
  }
  return (
    <div style={styles.container}>
      <ReviewModal open={open} data={data} close={handleClose} />
      <PaymentModal open={openPayment} data={data} close={handlePaymentClose} />
      {data && (
        <div style={styles.card}>
          <div style={styles.imageContainer}>
            <img src={data?.photoURL} alt="Course" style={styles.image} />
          </div>
          <div style={styles.detailsContainer}>
            <h2 style={styles.name}>
              {data?.name}
              {role === "Admin" && (
                <Button onClick={handleOpen}>
                  <i className="fa-solid fa-edit"></i>
                </Button>
              )}
            </h2>
            <p style={styles.info}>
              <strong>Duration:</strong> {data?.duration}
            </p>
            <p style={styles.info}>
              <strong>Date:</strong> {data?.date}
            </p>
            <p style={styles.info}>
              <strong>Price:</strong> ${data?.price}
            </p>
            {/* Additional data */}
            <p style={styles.info}>
              <strong>Description:</strong> {data?.description}
            </p>
            {data?.days && (
              <p style={styles.info}>
                <strong>Days:</strong> {data?.days?.join(", ")}
              </p>
            )}
            {data?.times && (
              <p style={styles.info}>
                <strong>Times:</strong> {data?.times?.join(", ")}
              </p>
            )}
            {data?.teacher && (
              <p style={styles.info}>
                <strong>Teacher's Name:</strong> {data?.teacher?.name}
              </p>
            )}
            <p style={styles.info}>
              <strong>Number of Students:</strong>
              {data?.students?.length || "0"}
            </p>
            {role.role === "Teacher" ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleEnrollNow}
                style={styles.button}
              >
                Enroll Now
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handlePaymentModal}
                style={styles.button}
              >
                Pay Now
              </Button>
            )}
            <Button
              variant="contained"
              color="success"
              onClick={handleOpen}
              style={styles.button}
            >
              Add a Review
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f4f4f4",
  },
  card: {
    display: "flex",
    maxWidth: "800px",
    width: "90%",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  imageContainer: {
    flex: "0 0 40%",
    minWidth: "200px",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "10px 0 0 10px",
  },
  detailsContainer: {
    flex: "1",
    padding: "20px",
  },
  name: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "28px",
    marginBottom: "20px",
    color: "#333",
  },
  info: {
    fontSize: "18px",
    marginBottom: "10px",
    color: "#666",
  },
  button: {
    marginTop: "20px",
    width: "100%",
  },
};

export default CourseDetails;
