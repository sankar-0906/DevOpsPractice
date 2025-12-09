require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",      // local dev
    "http://16.16.207.225:5173",  // deployed frontend
    "http://16.16.207.225"        // if hosted on nginx
  ],
  credentials: true
}));


// DB Connection
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// REGISTER
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  try {
    await db.query("INSERT INTO users (email, password) VALUES (?, ?)", [
      email,
      hashed,
    ]);
    res.json({ message: "User registered" });
  } catch (err) {
    res.json({ error: "User already exists" });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  if (rows.length === 0) return res.json({ error: "Invalid email" });

  const user = rows[0];
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.json({ error: "Invalid password" });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  res.json({ token });
});

// GET ALL USERS
app.get("/users", async (req, res) => {
  const [rows] = await db.query("SELECT id, email FROM users");
  res.json(rows);
});

db.getConnection()
  .then(() => console.log("✅ MySQL Connected!"))
  .catch(err => console.error("❌ MySQL connection error:", err));

app.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`)
);
