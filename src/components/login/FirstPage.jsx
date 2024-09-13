import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

function FirstPage() {
  return (
    <div className="bg-gradient-to-r from-[#D9D9D9] to-[#E7F9EA] w-full h-screen flex flex-col justify-center items-center gap-4">
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Get started
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Link to="/loggin">
          <Button
            style={{
              background: "blue",
              opacity: "65%",
              width: 180,
              color: "wheat",
              border: "rounded",
              borderRadius: 50,
            }}
          >
            Log in
          </Button>
        </Link>
        <Link to="singup">
          <Button
            style={{
              background: "blue",
              opacity: "65%",
              width: 180,
              color: "wheat",
              border: "rounded",
              borderRadius: 50,
            }}
          >
            Sign up
          </Button>
        </Link>
      </Box>
    </div>
  );
}

export default FirstPage;
