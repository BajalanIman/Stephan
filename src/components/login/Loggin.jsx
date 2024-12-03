import { Box, Button, Input, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReportIcon from "@mui/icons-material/Report";
import axios from "axios";
import adaptLogo from "./../../assets/Images/adaptLogo.png";

function Loggin() {
  const navigate = useNavigate();
  const [importedEmail, setImportedEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [userExists, setUserExists] = useState(null);
  const [userInDatabase, setUserInDatabase] = useState(false);

  const loginBtn = async () => {
    try {
      const response = await axios.post("http://localhost:8800/check-user", {
        email: importedEmail,
        password: inputPassword,
      });

      if (response.data.exists) {
        setUserExists(true);
        console.log("User exists:", response.data.user);
        localStorage.setItem("userId", response.data.user.user_id);
        localStorage.setItem("email", response.data.user.email);
        localStorage.setItem("password", response.data.user.password);
        navigate("/conversation");
        window.location.reload();
      } else {
        setUserInDatabase(true);
        setTimeout(() => {
          setUserInDatabase(false);
          setErrorMessage("User does not exist!");
        }, 4000);
      }
    } catch (error) {
      setUserInDatabase(true);
      setTimeout(() => {
        setUserInDatabase(false);
        setErrorMessage("User does not exist!");
      }, 4000);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <Link to="/dataProtection">
        <img src={adaptLogo} className="w-20 opacity-70 cursor-pointer" />
      </Link>{" "}
      <div className="mt-6 h-30 flex flex-col justify-center items-center gap-3 ">
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Welcome back
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", mt: 1 }}>
          {(errorPassword || errorEmail || userInDatabase) && (
            <Typography
              variant="caption"
              sx={{ color: "#E34234", fontSize: 10, mb: 1 }}
            >
              <ReportIcon fontSize="small" sx={{ mr: 1 }} /> {errorMessage}
            </Typography>
          )}
          <TextField
            id="outlined-required"
            label="Email address*"
            variant="outlined"
            error={errorEmail ? true : false}
            size="small"
            onChange={(e) => {
              setImportedEmail(e.target.value);
            }}
            sx={{
              width: 240,
              bgcolor: "#DDFEF2",
              mb: "20px",
            }}
          />

          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            size="small"
            error={errorPassword ? true : false}
            onChange={(e) => {
              setInputPassword(e.target.value);
            }}
            sx={{ width: 240, bgcolor: "#DDFEF2", mb: 2 }}
          />

          <Button
            sx={{ color: "white", bgcolor: "#10a37f", textTransform: "none" }}
            onClick={loginBtn}
          >
            Login
          </Button>

          <Typography
            variant="caption"
            sx={{
              fontSize: 10,
              mb: 2,
              mt: 1,
              ml: 1,
              textAlign: "center",
            }}
          >
            Don't have an account?{" "}
            <Link to="/singup" style={{ color: "#10a37f" }}>
              Sign up
            </Link>
          </Typography>
        </Box>
      </div>
    </div>
  );
}

export default Loggin;
