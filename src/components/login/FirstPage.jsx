import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import adaptLogo from "./../../assets/Images/adaptLogo.png";

function FirstPage() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navegate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    setUserEmail(email);
    setUserPassword(password);
  }, [userEmail, userPassword]);

  const logginBtnHandler = () => {
    if (!!userEmail & !!userPassword) {
      navegate("/conversation");
    } else {
      navegate("/loggin");
    }
  };
  return (
    <div className="bg-gradient-to-r from-[#D9D9D9] to-[#E7F9EA] w-full h-screen flex flex-col justify-center items-center gap-8">
      <Link to="/dataProtection">
        <img src={adaptLogo} className="w-20 opacity-70 cursor-pointer" />
      </Link>
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", fontFamily: "SourceSansPro" }}
      >
        Get started
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          onClick={logginBtnHandler}
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
