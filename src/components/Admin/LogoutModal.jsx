import React from "react";
import { Box, Modal, Typography, Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "lightgray",
  boxShadow: 24,
  p: 4,
};

const LogoutModal = ({ open, onClose, onLogout }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="logout-modal-title"
      aria-describedby="logout-modal-description"
    >
      <Box sx={style}>
        <Typography id="logout-modal-title" variant="h6" component="h2">
          Logout Confirmation
        </Typography>
        <Typography id="logout-modal-description" sx={{ mt: 2 }}>
          Are you sure you want to logout?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button onClick={onClose} variant="outlined" sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button onClick={onLogout} variant="contained" color="error">
            Logout
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default LogoutModal;
