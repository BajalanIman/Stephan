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
app.use(express.static("public"));
app.use(express.json());

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
// Fetch all conversations and their messages
// API to fetch all conversations and their messages
app.get("/conversations", (req, res) => {
  const query = `
    SELECT c.conversation_id, c.title, c.created_at AS conversation_created_at,
           m.message_id, m.question, m.answer, m.created_at AS message_created_at
    FROM conversations c
    LEFT JOIN messages m ON c.conversation_id = m.conversation_id
    ORDER BY c.created_at DESC, m.created_at ASC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching conversations:", err);
      return res.status(500).json({ error: "Error fetching conversations" });
    }

    // Group messages by conversation_id
    const conversations = results.reduce((acc, row) => {
      const {
        conversation_id,
        title,
        conversation_created_at,
        message_id,
        question,
        answer,
        message_created_at,
      } = row;

      // Find or create a conversation object
      let conversation = acc.find(
        (conv) => conv.conversation_id === conversation_id
      );
      if (!conversation) {
        conversation = {
          conversation_id,
          title,
          created_at: conversation_created_at,
          messages: [],
        };
        acc.push(conversation);
      }

      // If there are messages, push them into the conversation's message array
      if (message_id) {
        conversation.messages.push({
          message_id,
          question,
          answer,
          created_at: message_created_at,
        });
      }

      return acc;
    }, []);

    return res.status(200).json(conversations);
  });
});

// POST /conversations - Create a new conversation
app.post("/conversations", (req, res) => {
  const { user_id, title } = req.body;

  if (!user_id || !title) {
    return res.status(400).json({ error: "user_id and title are required" });
  }

  const insertQuery = `
    INSERT INTO conversations (user_id, title) 
    VALUES (?, ?)
  `;

  db.query(insertQuery, [user_id, title], (err, result) => {
    if (err) {
      console.error("Error creating conversation:", err);
      return res.status(500).json({ error: "Error creating conversation" });
    }
    return res.status(201).json({
      message: "Conversation created successfully",
      id: result.insertId, // Return the id of the newly created conversation
    });
  });
});

// POST /messages - Save a message
app.post("/messages", (req, res) => {
  const { conversation_id, user_id, question, answer } = req.body;
  const query = `
    INSERT INTO messages (conversation_id, user_id, question, answer)
    VALUES (?, ?, ?, ?)
  `;
  db.query(
    query,
    [conversation_id, user_id, question, answer],
    (err, result) => {
      if (err) {
        console.error("Error saving message:", err);
        return res.status(500).json({ error: "Error saving message" });
      }
      return res.status(201).json({
        message: "Message saved successfully",
        message_id: result.insertId,
      });
    }
  );
});
// GET /messages - Save a message
app.get("/messages", (req, res) => {
  const query = "SELECT * FROM messages";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching messages:", err);
      res.status(500).json({ error: "Error fetching messages" });
    } else {
      res.status(200).json(results);
    }
  });
});

app.listen(8800, () => {
  console.log("Backend is running on port 8800.");
});
