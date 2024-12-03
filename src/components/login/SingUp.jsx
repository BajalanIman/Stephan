import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReportIcon from "@mui/icons-material/Report";
import axios from "axios";
import adaptLogo from "./../../assets/Images/adaptLogo.png";

const SingUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lasrName, setLastName] = useState("");
  const [importedEmail, setImportedEmail] = useState("");

  const [password, setPassword] = useState("");

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorEmpty, setErrorEmpty] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const singupHandler = (event) => {
    if (importedEmail && !importedEmail.includes("@")) {
      setErrorEmail(true);
      setErrorMessage("Email must include '@' symbol!");
      setTimeout(() => {
        setErrorEmail(false);
        setErrorMessage("");
      }, 5000);
    } else if (password.length && password.length < 8) {
      setErrorPassword(true);
      setErrorMessage("Password must be more than 9 characters!");
      setTimeout(() => {
        setErrorPassword(false);
        setErrorMessage("");
      }, 5000);
    } else if (
      !firstName ||
      !lasrName ||
      !username ||
      !password ||
      !importedEmail
    ) {
      setErrorEmpty(true);
      setErrorMessage("At least one field is empty!");
      setTimeout(() => {
        setErrorEmpty(false);
        setErrorMessage("");
      }, 5000);
    } else {
      navigate("/conversation");
      window.location.reload();
    }

    const data = {
      user_config_id: 1,
      first_name: firstName,
      last_name: lasrName,
      password: password,
      username: username,
      email: importedEmail,
      date_of_birth: "2024-08-26T22:00:00.000Z",
      created_at: "2024-08-26T22:00:00.000Z",
      last_login_at: "2024-08-26T22:00:00.000Z",
    };
    axios.post(`http://localhost:8800/users`, data).then((res) => {
      localStorage.setItem("userId", res.data.user_id);
      if (res.data.message == "Record inserted successfully") {
        setUsername(""),
          setFirstName(""),
          setLastName(""),
          setImportedEmail(""),
          setPassword("");
      }
    });
  };

  return (
    <div className="bg-gradient-to-r from-[#D9D9D9] to-[#E7F9EA] w-full h-screen flex flex-col justify-center items-center">
      <Link to="/dataProtection">
        <img src={adaptLogo} className="w-20 opacity-70 cursor-pointer" />
      </Link>
      <div className="mt-6 h-30 flex flex-col justify-center items-center gap-3 ">
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Create an account
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", mt: 1 }}>
          {(errorEmail || errorPassword || errorEmpty) && (
            <Typography
              variant="caption"
              sx={{ color: "#E34234", fontSize: 10, mb: 1 }}
            >
              <ReportIcon fontSize="small" sx={{ mr: 1 }} /> {errorMessage}
            </Typography>
          )}
          <TextField
            id="outlined-username"
            label="Username*"
            variant="outlined"
            error={false}
            size="small"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            sx={{
              width: 240,
              bgcolor: "#DDFEF2",
              mb: "20px",
            }}
          />
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <TextField
              id="outlined-firstname"
              label="First Name*"
              variant="outlined"
              error={false}
              size="small"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              sx={{
                width: 118,
                bgcolor: "#DDFEF2",
                mb: "20px",
              }}
            />
            <TextField
              id="outlined-lastname"
              label="Last Name*"
              variant="outlined"
              error={false}
              size="small"
              onChange={(el) => {
                setLastName(el.target.value);
              }}
              sx={{
                width: 118,
                bgcolor: "#DDFEF2",
                mb: "20px",
              }}
            />
          </Box>
          <TextField
            id="outlined-email"
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
            label="Password*"
            type="password"
            error={errorPassword ? true : false}
            autoComplete="current-password"
            size="small"
            sx={{ width: 240, bgcolor: "#DDFEF2", mb: 2 }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <Button
            sx={{ color: "white", bgcolor: "#10a37f", textTransform: "none" }}
            onClick={singupHandler}
          >
            Sing up
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
            Already have an account?{" "}
            <Link to="/loggin" style={{ color: "#10a37f" }}>
              Login
            </Link>
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default SingUp;
