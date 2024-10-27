import React from "react";
import UseRequests from "./useRequests";
import { Button } from "antd";
import { Box, LinearProgress } from "@mui/material";

function Requests() {
  const { requests, handleAccept, handleReject, loading } = UseRequests();

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        minHeight: "50vh",
      }}
    >
      <h2>Requests</h2>
      <div style={{ display: "grid", gap: "20px", marginTop: "12px" }}>
        {requests &&
          requests.map((request) => (
            <div
              key={request?.id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                borderRadius: "5px",
                display: "grid",
                gap: "8px",
              }}
            >
              <h3 style={{ marginTop: "0" }}>{request?.applicant?.name}</h3>
              <p>
                <strong>Course:</strong> {request?.courseData?.name}
              </p>
              <p>
                <strong>Starting Date:</strong> {request?.courseData?.date}
              </p>
              <p>
                <strong>Duration:</strong> {request?.courseData?.duration}
              </p>
              <p>
                <strong>Description:</strong> {request?.courseData?.description}
              </p>
              <div style={{ marginTop: "12px" }}>
                {loading && (
                  <Box
                    sx={{
                      width: "100%",
                      marginTop: "8px",
                      marginBottom: "16px",
                    }}
                  >
                    <LinearProgress />
                  </Box>
                )}
                <Button
                  type="primary"
                  onClick={() => handleAccept(request)}
                  style={{ marginRight: "10px" }}
                >
                  Accept
                </Button>
                <Button danger onClick={() => handleReject(request?.id)}>
                  Reject
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Requests;
