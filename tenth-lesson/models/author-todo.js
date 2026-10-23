import mongoose from "mongoose";

const AuthorTodoSchema = new mongoose.Schema({
    title: String,
    desc: String,
    isDone: Boolean
});

export const AuthorTodo = mongoose.model(
    "AuthorTodo",
    AuthorTodoSchema
);