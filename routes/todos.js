const express = require("express");
const router = express.Router();
// import controllers/todos.js
const todosController = require("../controllers/todos");
// import ensureAuth (from middleware/auth.js)
// destructures {} because this can do other things
const { ensureAuth } = require("../middleware/auth");

// /todos
// ensureAuth is placed before the controller to effectively check user authentication (see /middleware/auth.js)
// if user is authenticated, proceed to todos; else, redirect back to home page to login
// proceed toward todosController.getTodos
router.get("/", ensureAuth, todosController.getTodos);

// /todos/createTodo
router.post("/createTodo", todosController.createTodo);

// /todos/markComplete
router.put("/markComplete", todosController.markComplete);

// /todos/markIncomplete
router.put("/markIncomplete", todosController.markIncomplete);

// /todos/deleteTodo
router.delete("/deleteTodo", todosController.deleteTodo);

module.exports = router;
