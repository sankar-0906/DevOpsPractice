const express = require("express");
const cors = require("cors");
const fs = require("fs");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// init db schema
const schema = fs.readFileSync("./schema.sql", "utf8");
db.exec(schema);

// Register
app.post("/register", (req, res) => {
  const { email, password } = req.body;
  db.run(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, password],
    (err) => {
      if (err) return res.json({ success: false, error: err.message });
      res.json({ success: true });
    }
  );
});

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.get(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, row) => {
      if (row) return res.json({ success: true });
      res.json({ success: false });
    }
  );
});

// Logout (simple redirect)
app.get("/logout", (req, res) => {
  res.redirect("http://localhost:5173");
});

app.listen(5000, () => console.log("Server running on port 5000"));
