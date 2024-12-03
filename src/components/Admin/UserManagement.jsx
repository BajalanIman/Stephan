import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  Box,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";

const UserManagement = () => {
  const [usersFromDatabase, setUsersFromDatabase] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8800/users");
        setUsersFromDatabase(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex w-full h-screen justify-center bg-[#e4e9e4]">
      <Box sx={{ width: "1450px" }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Abril Fatface",
            fontWeight: 400,
            textAlign: "center",
            marginY: "10px",
          }}
        >
          List of users in the database
        </Typography>
        <TableContainer component={Paper} sx={{ maxHeight: "700px" }}>
          <Table aria-label="simple table" stickyHeader>
            <thead>
              <TableRow>
                <TableCell
                  sx={{
                    display: { xs: "none", sm: "flex", md: "flex" },
                    fontWeight: "bold",
                    backgroundColor: "#a1d6b2",
                  }}
                >
                  No.
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", backgroundColor: "#a1d6b2" }}
                >
                  First name
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", backgroundColor: "#a1d6b2" }}
                >
                  Last name
                </TableCell>
                <TableCell
                  sx={{
                    display: { xs: "none", sm: "none", md: "flex" },
                    fontWeight: "bold",
                    backgroundColor: "#a1d6b2",
                  }}
                >
                  username
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", backgroundColor: "#a1d6b2" }}
                >
                  Email
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", backgroundColor: "#a1d6b2" }}
                >
                  Role
                </TableCell>
                <TableCell
                  sx={{
                    display: { xs: "none", sm: "none", md: "flex" },
                    fontWeight: "bold",
                    backgroundColor: "#a1d6b2",
                  }}
                >
                  Password
                </TableCell>
              </TableRow>
            </thead>
            <tbody>
              {usersFromDatabase.map((e, index) => (
                <TableRow hover role="checkbox" key={e.user_id}>
                  <TableCell
                    component="th"
                    sx={{ display: { xs: "none", sm: "flex", md: "flex" } }}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell>{e.first_name}</TableCell>
                  <TableCell>{e.last_name}</TableCell>
                  <TableCell
                    sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
                  >
                    {e.username}
                  </TableCell>
                  <TableCell>{e.email}</TableCell>
                  <TableCell
                    sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
                  >
                    {e.role}Normal
                  </TableCell>
                  <TableCell>{e.password}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default UserManagement;
