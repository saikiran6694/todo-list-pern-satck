import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();
const port = process.env.PORT || 9002;

// middleware
app.use(cors());
app.use(express.json()); //req.body

// Routes

// Create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Get all todo
app.get("/todos", async (req, res) => {
  try {
    const allData = await pool.query("SELECT * FROM todo");
    res.json(allData.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// Get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await pool.query(`SELECT * FROM todo WHERE todo_id = ${id}`);
    res.json(data.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// Update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateData = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json("Todo was updated");
  } catch (error) {
    console.error(error.message);
  }
});

// Delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteData = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("Delete Successfull");
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => console.log(`Server running on ${port}`));
