import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
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
    <div className="flex w-full h-screen justify-center">
      <Box sx={{ maxWidth: "1450px" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            textAlign: "center",
            marginY: "10px",
          }}
        >
          List of users in the database
        </Typography>
        <TableContainer component={Paper} sx={{ maxHeight: "450px" }}>
          <Table aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
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
                    fontWeight: "bold",
                    backgroundColor: "#a1d6b2",
                  }}
                >
                  Password
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersFromDatabase.map((e, index) => (
                <TableRow
                  hover
                  role="checkbox"
                  key={e.user_id}
                  sx={{ height: "35px" }}
                >
                  <TableCell
                    component="th"
                    sx={{
                      display: { xs: "none", sm: "flex", md: "flex" },
                      padding: "8px 16px", // Adjust padding for smaller rows
                    }}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell sx={{ padding: "8px 16px" }}>
                    {e.first_name}
                  </TableCell>
                  <TableCell sx={{ padding: "8px 16px" }}>
                    {e.last_name}
                  </TableCell>
                  <TableCell
                    sx={{
                      display: { xs: "none", sm: "none", md: "flex" },
                      padding: "8px 16px",
                    }}
                  >
                    {e.username}
                  </TableCell>
                  <TableCell sx={{ padding: "8px 16px" }}>{e.email}</TableCell>
                  <TableCell
                    sx={{
                      display: { xs: "none", sm: "none", md: "flex" },
                      padding: "8px 16px",
                    }}
                  >
                    {e.role}Normal
                  </TableCell>
                  <TableCell sx={{ padding: "8px 16px" }}>
                    {e.password}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default UserManagement;
