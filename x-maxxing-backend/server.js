const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "xmaxxing_manager",
  password: "nickyyy", // BEISPIEL
  database: "xmaxxing_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Database");
});

// Create tables if they don't exist
db.query(`
  CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);
db.query(`
  CREATE TABLE IF NOT EXISTS Goals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
  )
`);
db.query(`
  CREATE TABLE IF NOT EXISTS Steps (
    id INT AUTO_INCREMENT PRIMARY KEY,
    goal_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (goal_id) REFERENCES Goals(id) ON DELETE CASCADE
  )
`);

// API Endpoints

// Create a user
app.post("/users", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Missing username, email or password" });
  }

  db.query(
    `INSERT INTO Users (username, email, password) VALUES (?, ?, ?)`,
    [username, email, password],
    (err, results) => {
      if (err) return res.status(400).json({ error: err.message });

      res.json({ id: results.insertId, resp: "User created successfully" });
    }
  );
});

// Authenticate user by username and password
app.post("/auth/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM Users WHERE username = ? AND password = ?",
    [username, password],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const user = results[0];
      res.json({ id: user.id, username: user.username, email: user.email });
    }
  );
});

app.post("/goals", (req, res) => {
  const { user_id, title, description } = req.body;

  if (!user_id || !title) {
    return res.status(400).json({ error: "user_id and title are required" });
  }

  db.query(
    `INSERT INTO Goals (user_id, title, description) VALUES (?, ?, ?)`,
    [user_id, title, description || null],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: results.insertId, message: "Goal created" });
    }
  );
});

app.get("/goals/:userId", (req, res) => {
  const userId = req.params.userId;

  db.query(
    "SELECT * FROM Goals WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    }
  );
});

// Create a step
app.post("/steps", (req, res) => {
  const { goal_id, title, description } = req.body;
  db.query(
    `INSERT INTO Steps (goal_id, title, description) VALUES (?, ?, ?)`,
    [goal_id, title, description],
    (err, results) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ id: results.insertId });
    }
  );
});

// Get goals and steps for a user
app.get("/users/:userId/goals", (req, res) => {
  const userId = req.params.userId;
  db.query(
    `
    SELECT Goals.id AS goalId, Goals.title AS goalTitle, Goals.description AS goalDescription,
           Steps.id AS stepId, Steps.title AS stepTitle, Steps.description AS stepDescription, Steps.is_completed
    FROM Goals
    LEFT JOIN Steps ON Goals.id = Steps.goal_id
    WHERE Goals.user_id = ?
  `,
    [userId],
    (err, rows) => {
      if (err) return res.status(400).json({ error: err.message });

      const goals = {};
      rows.forEach((row) => {
        if (!goals[row.goalId]) {
          goals[row.goalId] = {
            id: row.goalId,
            title: row.goalTitle,
            description: row.goalDescription,
            steps: [],
          };
        }
        if (row.stepId) {
          goals[row.goalId].steps.push({
            id: row.stepId,
            title: row.stepTitle,
            description: row.stepDescription,
            is_completed: !!row.is_completed,
          });
        }
      });

      res.json(Object.values(goals));
    }
  );
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
