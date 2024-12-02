import { Box, Typography } from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const Navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const Logout = () => {
    setAnchorEl(null);
  };

  const CloseHandler = () => {
    setAnchorEl(null);
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("userId");
    Navigate("/");
  };

  const userManagementHandler = () => {
    setAnchorEl(null);
    Navigate("/userManagement");
  };

  return (
    <Box sx={{}}>
      <Box
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          marginTop: 0.3,
          marginLeft: 3,
          width: 22,
          height: 22,
          bgcolor: "#696969",
          border: "1px solid black",
          borderRadius: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          ":hover": { bgcolor: "#4C4C4C", color: "white" },
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontFamily: "senrif",
            color: "white",
            fontSize: "12px",
          }}
        >
          P.A
        </Typography>
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={Logout}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={userManagementHandler}>User management</MenuItem>
        <MenuItem onClick={CloseHandler}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default AdminPanel;
