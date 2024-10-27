import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField, Button, Rating } from "@mui/material";
import { Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import useReviewModal from "./useReviewModal";

export default function ReviewModal(props) {
  const { handleChange, handleSubmit, state, loading } = useReviewModal({
    props,
  });
  return (
    <Modal
      open={props?.open}
      onClose={props?.close}
      aria-labelledby="Add a review"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={style}
        bgcolor={"white"}
        style={{ display: "flex", flexDirection: "column", width: "50%" }}
        className="modal-box"
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className="modal-typograph"
        >
          Add Your Review Here !
        </Typography>
        <TextField
          id="outlined-basic"
          label="User Name"
          name="name"
          variant="outlined"
          onChange={handleChange}
          value={state.name}
          style={{
            width: "100%",
            margin: "10px 0",
          }}
          type="text"
        />
        <TextField
          id="outlined-basic"
          label="City"
          name="city"
          variant="outlined"
          onChange={handleChange}
          value={state.city}
          style={{
            width: "100%",
            margin: "10px 0",
          }}
          type="text"
        />
        <TextArea
          rows={5}
          name="description"
          value={state.description}
          onChange={handleChange}
          placeholder="Type your review here:"
        />
        <Rating
          style={{ margin: "10px 0" }}
          name="rating"
          value={state.rating}
          onChange={(e, newValue) => handleChange(e, newValue)}
        />
        <Button
          variant="outlined"
          onClick={handleSubmit}
          style={{ margin: "10px 0 0 0" }}
          disabled={loading}
        >
          {loading && <Spin />}
          Submit Review
        </Button>
      </Box>
    </Modal>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "full",
  boxShadow: 24,
  borderRadius: "10px",
  padding: "25px 50px",
};
