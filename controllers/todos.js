// import Todo model
const Todo = require("../models/Todo");

module.exports = {
  getTodos: async (req, res) => {
    // logs user information (req.user) to console
    console.log(req.user);
    try {
      // go to the todos database (Todo model) and finds the todos of the logged in user with unique user id (where userId equals req.user.id (the logged in user's id))
      const todoItems = await Todo.find({ userId: req.user.id });
      const itemsLeft = await Todo.countDocuments({
        userId: req.user.id,
        completed: false,
      });
      // responds by passing the todo list to ejs and rendering the todo list of the user with the above unique user id (req.user.id in todoItems) ONLY as HTML
      res.render("todos.ejs", {
        todos: todoItems,
        left: itemsLeft,
        user: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createTodo: async (req, res) => {
    try {
      // creates todos (req.body)
      await Todo.create({
        // add todo item to the user with the unique user id (req.user.id)
        todo: req.body.todoItem,
        // mark as not completed
        completed: false,
        // unique userId (req.user.id), so creating a todo for the logged in user ONLY
        userId: req.user.id,
      });
      console.log("Todo has been added!");
      res.redirect("/todos");
    } catch (err) {
      console.log(err);
    }
  },
  markComplete: async (req, res) => {
    try {
      await Todo.findOneAndUpdate(
        { _id: req.body.todoIdFromJSFile },
        {
          completed: true,
        }
      );
      console.log("Marked Complete");
      res.json("Marked Complete");
    } catch (err) {
      console.log(err);
    }
  },
  markIncomplete: async (req, res) => {
    try {
      await Todo.findOneAndUpdate(
        { _id: req.body.todoIdFromJSFile },
        {
          completed: false,
        }
      );
      console.log("Marked Incomplete");
      res.json("Marked Incomplete");
    } catch (err) {
      console.log(err);
    }
  },
  deleteTodo: async (req, res) => {
    console.log(req.body.todoIdFromJSFile);
    try {
      await Todo.findOneAndDelete({ _id: req.body.todoIdFromJSFile });
      console.log("Deleted Todo");
      res.json("Deleted It");
    } catch (err) {
      console.log(err);
    }
  },
};
