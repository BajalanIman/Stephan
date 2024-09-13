import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
// Serve static files from the 'public' directory, including the 'images' directory
app.use(express.static("public"));
app.use(express.json());

// Create a connection to the "iman" database
//-------------------------------------------------------------------------
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "stephan_phd",
});
//-------------------------------------------------------------------------

app.get("/", (req, res) => {
  res.json("Hello, this is the backend!");
});

//get -------------------------------------------------------------------------
app.get("/users", (req, res) => {
  /* const q = "SELECT * FROM users where name = 'name'  "; */
  const q = "SELECT * FROM users";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});
//post -------------------------------------------------------------------------
// Create an API endpoint to insert a new record:
app.post("/users", (req, res) => {
  const {
    created_at,
    date_of_birth,
    email,
    first_name,
    last_login_at,
    last_name,
    password,
    user_config_id,
    user_id,
    username,
  } = req.body;

  const insertQuery =
    "INSERT INTO users (created_at, date_of_birth,email, first_name,last_login_at,last_name,password,user_config_id,user_id, username) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(
    insertQuery,
    [
      created_at,
      date_of_birth,
      email,
      first_name,
      last_login_at,
      last_name,
      password,
      user_config_id,
      user_id,
      username,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting record:", err);
        return res.status(500).json({ error: "Error inserting record" });
      }
      return res.status(201).json({ message: "Record inserted successfully" });
    }
  );
});
// another post for login
app.post("/check-user", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ error: "Database query error" });
    }
    if (results.length > 0) {
      return res.status(200).json({ exists: true, user: results[0] });
    } else {
      return res.status(404).json({ exists: false, message: "User not found" });
    }
  });
});

//Create an API endpoint to update a record:
app.put("/users/:id", (req, res) => {
  const {
    created_at,
    date_of_birth,
    email,
    first_name,
    last_login_at,
    last_name,
    password,
    user_config_id,
    user_id,
    username,
  } = req.body;
  const { id } = req.params;

  const updateQuery =
    "UPDATE users SET user_id=?, user_config_id=?, first_name=?, last_name=?, password=?, username=?, email=?, date_of_birth=?, created_at=?, last_login_at=?";

  db.query(
    updateQuery,
    [
      user_id,
      user_config_id,
      first_name,
      last_name,
      password,
      username,
      email,
      date_of_birth,
      created_at,
      last_login_at,
      id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Error updating record" });
      }
      return res.status(200).json({ message: "Record updated successfully" });
    }
  );
});

//Create an API endpoint to delete a record:
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  const deleteQuery = "DELETE FROM users WHERE user_id=?";

  db.query(deleteQuery, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Error deleting record" });
    }
    return res.status(200).json({ message: "Record deleted successfully" });
  });
});

//************************************************************* */

app.listen(8800, () => {
  console.log("Connected to backend.");
});
