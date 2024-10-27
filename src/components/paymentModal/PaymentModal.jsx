import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React from "react";
import UsePaymentModal from "./usePaymentModal";
import { Spin } from "antd";
import CardModal from "../cardModal/CardModal";
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

function PaymentModal(props) {
  const { state, handleChange, loading, handleEnrollNow } = UsePaymentModal({
    props,
  });
  return (
    <>
      <Modal
        open={props?.open}
        onClose={props?.close}
        aria-labelledby="Payment Gateway"
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
            Fill all the data !
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
            label="Address"
            name="address"
            variant="outlined"
            onChange={handleChange}
            value={state.address}
            style={{
              width: "100%",
              margin: "10px 0",
            }}
            type="text"
          />
          <TextField
            id="outlined-basic"
            label="Pin Code"
            name="pincode"
            variant="outlined"
            onChange={handleChange}
            value={state.pincode}
            style={{
              width: "100%",
              margin: "10px 0",
            }}
            type="text"
          />
          <TextField
            id="outlined-basic"
            label="Phone No."
            name="phoneNumber"
            variant="outlined"
            onChange={handleChange}
            value={state.phoneNumber}
            style={{
              width: "100%",
              margin: "10px 0",
            }}
            type="text"
          />
          {/* <CardModal
            name={name}
            address={address}
            pincode={pincode}
            phoneNumber={phoneNumber}
            setName={setName}
            setAddress={setAddress}
            setPincode={setPincode}
            setPhoneNumber={setPhoneNumber}
            buyNow={buyNow}
          /> */}
          <Button
            variant="outlined"
            onClick={handleEnrollNow}
            style={{ margin: "10px 0 0 0" }}
            disabled={loading}
          >
            {!loading ? <></> : <Spin />}
            Proceed Now
          </Button>
        </Box>
      </Modal>
    </>
  );
}
export default PaymentModal;
