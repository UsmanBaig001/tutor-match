import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import useModal from "./useModal";
import { CITIES_NAMES } from "../../constants/Cities";

export default function BasicModal(props) {
  const { handleChange, handleSubmit, state } = useModal({ props });
  return (
    <Modal
      open={props?.open}
      onClose={props?.close}
      aria-labelledby="Edit Your Details"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="modal-box">
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className="modal-typograph"
        >
          Edit Your Details
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
          label="Last Degree"
          name="lastDegree"
          value={state.lastDegree}
          onChange={handleChange}
          variant="outlined"
          style={{
            width: "100%",
            margin: "10px 0",
          }}
        />
        <TextField
          id="outlined-basic"
          label="Address"
          name="address"
          value={state.address}
          onChange={handleChange}
          variant="outlined"
          style={{
            width: "100%",
            margin: "10px 0",
          }}
        />
        {props?.data?.role === "Student" && (
          <FormControl
            fullWidth
            sx={{
              mb: 1,
              mt: 2,
            }}
          >
            <InputLabel id="demo-simple-select-label">
              Select Your City
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Select Your Role"
              value={state.city}
              name="city"
              onChange={handleChange}
            >
              {CITIES_NAMES.map((item, i) => {
                return (
                  <MenuItem key={i} value={item.value}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}
        {props?.data?.role === "Teacher" && (
          <>
            <TextField
              id="outlined-basic"
              label="Department"
              name="department"
              value={state.department}
              onChange={handleChange}
              variant="outlined"
              style={{
                width: "100%",
                margin: "10px 0",
              }}
            />
            <TextField
              id="outlined-basic"
              label="Charges / hour"
              name="charges"
              value={state.charges}
              onChange={handleChange}
              variant="outlined"
              style={{
                width: "100%",
                margin: "10px 0",
              }}
            />
            <TextField
              id="outlined-basic"
              label="Experience"
              name="experience"
              value={state.experience}
              onChange={handleChange}
              variant="outlined"
              style={{
                width: "100%",
                margin: "10px 0",
              }}
            />
          </>
        )}
        <Button
          onSubmit={handleSubmit}
          variant="outlined"
          onClick={handleSubmit}
          style={{ margin: "10px 0 0 0" }}
        >
          Submit Details
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
