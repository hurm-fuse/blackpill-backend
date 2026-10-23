import mongoose from "mongoose"
import express from 'express'
import { AuthorTodo } from "./models/author-todo.js"

let a = await mongoose.connect("mongodb://localhost:27017/author-todo")
const app = express()
const port = 3000

// Define a GET route at the root path '/'
app.get('/', (req, res) => {
  // 1st todo
  const FirstAuthorTodo = new AuthorTodo({
    title: "learn JavaScript",
    desc: "complete JavaScript basics",
    isDone: false
  });
  FirstAuthorTodo.save();

  // 2nd todo
  const SecondAuthorTodo = new AuthorTodo({
    title: "learn Node.js",
    desc: "understand backend development",
    isDone: false
  });
  SecondAuthorTodo.save();

  // 3rd todo
  const ThirdAuthorTodo = new AuthorTodo({
    title: "learn Express.js",
    desc: "create a backend server",
    isDone: false
  });
  ThirdAuthorTodo.save();

  // 4th todo
  const FourthAuthorTodo = new AuthorTodo({
    title: "learn MongoDB",
    desc: "store data in a database",
    isDone: true
  });
  FourthAuthorTodo.save();

  // 5th todo
  const FifthAuthorTodo = new AuthorTodo({
    title: "learn Mongoose",
    desc: "perform CRUD operations",
    isDone: false
  });
  FifthAuthorTodo.save();
  res.send('i am creating todosss!');
});

// READ: Find all todos
app.get("/find", async (req, res) => {
    const todos = await AuthorTodo.find({});
    res.json(todos);
});

// READ: Find one todo
app.get("/findone", async (req, res) => {
    const todo = await AuthorTodo.findOne({ isDone: false });
    res.json(todo);
});

// READ: Find by ID
app.get("/findbyid", async (req, res) => {
    const todo = await AuthorTodo.findById(
        "6adbca73c8bc4f6ec693e136"
    );

    res.json(todo);
});

// UPDATE: Update one todo by ID
app.get("/update", async (req, res) => {
    const result = await AuthorTodo.updateOne(
        { _id: "6adbcccd3b11a1f9abf8b25b" },
        { $set: { isDone: true } }
    );

    res.json(result);
});

// FIND AND UPDATE: Return updated todo
app.get("/findupdate", async (req, res) => {
    const todo = await AuthorTodo.findByIdAndUpdate(
        "6adbcccd3b11a1f9abf8b25c",
        { isDone: true },
        { new: true }
    );

    res.json(todo);
});

// DELETE: Delete one todo by ID
app.get("/delete", async (req, res) => {
    const result = await AuthorTodo.deleteOne({
        _id: "6adbcccd3b11a1f9abf8b25f"
    });

    res.json(result);
});

// FIND AND DELETE: Return deleted todo
app.get("/finddelete", async (req, res) => {
    const todo = await AuthorTodo.findByIdAndDelete(
        "6adbcccd3b11a1f9abf8b25e"
    );

    res.json(todo);
});

// COUNT: Count all todos
app.get("/count", async (req, res) => {
    const total = await AuthorTodo.countDocuments({});
    res.json({ total });
});

// DELETE MANY: Delete all completed todos
app.get("/deletemany", async (req, res) => {
    const result = await AuthorTodo.deleteMany({
        isDone: false
    });

    res.json(result);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
