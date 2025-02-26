import { Box, Typography, Menu, MenuItem } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoutModal from "./LogoutModal";
import adaptLogo from "./../../assets/Images/adaptLogo.png";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const buttonRef = useRef(null); // Ref for the trigger element

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // When closing, move focus back to the trigger element.
  const handleClose = () => {
    setAnchorEl(null);
    if (buttonRef.current) {
      buttonRef.current.focus();
    }
  };

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const openLogoutModal = () => {
    setShowLogoutModal(true);
    handleClose();
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
    handleClose();
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("userId");
    localStorage.removeItem("first_name");
    localStorage.removeItem("last_name");
    navigate("/");
  };

  const userManagementHandler = () => {
    handleClose();
    navigate("/userManagement");
  };

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (localStorage.getItem("first_name")) {
      setName(localStorage.getItem("first_name"));
    }
    if (localStorage.getItem("last_name")) {
      setLastName(localStorage.getItem("last_name"));
    }
  }, []);

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        ref={buttonRef} // Attach ref here
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          marginTop: 0.3,
          marginLeft: 3,
          width: 30,
          height: 30,
          bgcolor: "#2E4053",
          border: "1px solid black",
          borderRadius: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          ":hover": { bgcolor: "#4C4C4C", color: "white" },
        }}
        tabIndex={0} // Ensure the element is focusable
      >
        {!!name && (
          <Typography
            sx={{
              fontWeight: "bold",
              fontFamily: "serif",
              color: "white",
              fontSize: "12px",
            }}
          >
            {name.at(0)}&#x2022;
          </Typography>
        )}
        {!!lastName && (
          <Typography
            sx={{
              fontWeight: "bold",
              fontFamily: "serif",
              color: "white",
              fontSize: "12px",
            }}
          >
            {lastName.at(0)}
          </Typography>
        )}
        {!name && !lastName && (
          <img src={adaptLogo} className="bg-white border rounded-full" />
        )}
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={userManagementHandler}>User management</MenuItem>
        <MenuItem onClick={openLogoutModal}>Logout</MenuItem>
      </Menu>
      <Box>
        <LogoutModal
          open={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onLogout={handleLogout}
        />
      </Box>
    </Box>
  );
};

export default AdminPanel;
