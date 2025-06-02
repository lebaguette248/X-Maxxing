require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = process.env.DB_PORT;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
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
      console.log(
        `User created: ${username}, ID: ${results.insertId}, Email: ${email}`
      );
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
      console.log(
        `Goal created: ${title}, ID: ${results.insertId}, User ID: ${user_id}`
      );
    }
  );
});

app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const { username, email, password } = req.body;
  if (!username && !email && !password) {
    return res.status(400).json({ error: "No fields provided for update" });
  }

  let updateQuery = "UPDATE Users SET ";
  let updateValues = [];
  let updateFields = [];

  // Dynamically add fields to update based on what is provided in the request body
  if (username) {
    updateFields.push("username = ?");
    updateValues.push(username);
  }
  if (email) {
    updateFields.push("email = ?");
    updateValues.push(email);
  }
  if (password) {
    updateFields.push("password = ?");
    updateValues.push(password);
  }

  updateQuery += updateFields.join(", ") + " WHERE id = ?";
  updateValues.push(userId);

  // Execute the query
  db.query(updateQuery, updateValues, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully" });
    console.log(
      `User updated: ID ${userId}, Fields: ${updateFields.join(", ")}`
    );
  });
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const deleteStepsQuery =
    "DELETE FROM Steps WHERE goal_id IN (SELECT id FROM Goals WHERE user_id = ?)";
  const deleteGoalsQuery = "DELETE FROM Goals WHERE user_id = ?";
  const deleteUserQuery = "DELETE FROM Users WHERE id = ?";

  try {
    db.query(deleteStepsQuery, [userId], (stepErr) => {
      if (stepErr) return res.status(500).json({ error: stepErr.message });

      db.query(deleteGoalsQuery, [userId], (goalErr) => {
        if (goalErr) return res.status(500).json({ error: goalErr.message });

        db.query(deleteUserQuery, [userId], (userErr, result) => {
          if (userErr) return res.status(500).json({ error: userErr.message });

          if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
          }
          res.json({ message: "User deleted successfully", userId });
        });
      });
    });
    console.log(`User deleted: ID ${userId}`);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/goals/:id", (req, res) => {
  const goalId = req.params.id;

  // First delete any associated steps (foreign key constraint)
  const deleteStepsQuery = "DELETE FROM Steps WHERE goal_id = ?";
  const deleteGoalQuery = "DELETE FROM Goals WHERE id = ?";

  db.query(deleteStepsQuery, [goalId], (stepErr) => {
    if (stepErr) return res.status(500).json({ error: stepErr.message });

    db.query(deleteGoalQuery, [goalId], (goalErr, result) => {
      if (goalErr) return res.status(500).json({ error: goalErr.message });

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Goal not found" });
      }

      res.json({ message: "Goal deleted successfully", goalId });
    });
  });
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
app.post("/subgoals", (req, res) => {
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

// GET subgoals by goal ID
app.get("/subgoals/:goalId", (req, res) => {
  const goalId = req.params.goalId;
  db.query(
    "SELECT * FROM Steps WHERE goal_id = ?",
    [goalId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});

app.post("/subgoals", (req, res) => {
  const { goal_id, title, description } = req.body;
  if (!goal_id || !title) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  db.query(
    "INSERT INTO Steps (goal_id, title, description) VALUES (?, ?, ?)",
    [goal_id, title, description],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({
        id: results.insertId,
        message: "Subgoal created successfully",
      });
    }
  );
});

app.get("/goalsbyId/:id", (req, res) => {
  const goalId = req.params.id;

  db.query("SELECT * FROM Goals WHERE id = ?", [goalId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({ message: "Goal not found" });
    }

    res.json(results[0]);
  });
});

app.delete("/subgoals/:id", (req, res) => {
  const stepId = req.params.id;

  db.query("DELETE FROM Steps WHERE id = ?", [stepId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Step not found" });
    }

    res.json({ message: `Step ${stepId} deleted successfully.` });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
