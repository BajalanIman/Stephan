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
import adaptLogo from "./../../assets/Images/adaptLogo.png";
import { Link } from "react-router-dom";

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
        <Link
          to="/conversation"
          style={{
            display: "flex",
            width: 150,
            justifyContent: "center",
          }}
        >
          <img src={adaptLogo} className="w-24 h-24 cursor-pointer" />
        </Link>
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
                {/* Hidden on xs and sm, visible on md and up */}
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#2E4053",
                    color: "white",
                    display: { xs: "none", sm: "none", md: "table-cell" },
                  }}
                >
                  No.
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#2E4053",
                    color: "white",
                  }}
                >
                  First name
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#2E4053",
                    color: "white",
                  }}
                >
                  Last name
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#2E4053",
                    color: "white",
                  }}
                >
                  Username
                </TableCell>
                {/* Hidden on xs and sm */}
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#2E4053",
                    color: "white",
                    display: { xs: "none", sm: "none", md: "table-cell" },
                  }}
                >
                  Email
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#2E4053",
                    color: "white",
                    display: { xs: "none", sm: "none", md: "table-cell" },
                  }}
                >
                  Role
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#2E4053",
                    color: "white",
                    display: { xs: "none", sm: "none", md: "table-cell" },
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
                  {/* Hidden on xs and sm */}
                  <TableCell
                    component="th"
                    sx={{
                      display: { xs: "none", sm: "none", md: "table-cell" },
                      padding: "8px 16px",
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
                  <TableCell sx={{ padding: "8px 16px" }}>
                    {e.username}
                  </TableCell>
                  {/* Hidden on xs and sm */}
                  <TableCell
                    sx={{
                      display: { xs: "none", sm: "none", md: "table-cell" },
                      padding: "8px 16px",
                    }}
                  >
                    {e.email}
                  </TableCell>
                  <TableCell
                    sx={{
                      display: { xs: "none", sm: "none", md: "table-cell" },
                      padding: "8px 16px",
                    }}
                  >
                    {e.role}
                  </TableCell>
                  <TableCell
                    sx={{
                      display: { xs: "none", sm: "none", md: "table-cell" },
                      padding: "8px 16px",
                    }}
                  >
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
