import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { getAuth, signOut } from "firebase/auth";
import { message } from "antd";

function BasicMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        message.success("Sign-out successful");
        window.location.reload();
      })
      .catch((error) => {
        message.error("An error happened.");
        console.log("error", error);
      });
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ justifyContent: "center", display: "flex" }}>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{ color: "white" }}
      >
        <i className="fa-solid fa-circle-user" style={{ color: "white" }}></i>
        <div style={{ textTransform: "capitalize", marginLeft: "10px" }}>
          Profile
        </div>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        style={{ marginTop: "12px" }}
      >
        <MenuItem onClick={handleClose && handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default BasicMenu;
