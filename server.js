const express = require("express");
const app = express();
const mongoose = require("mongoose");
// import Passport.js
const passport = require("passport");
// import session middleware
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
// imports routes for /todos
const todoRoutes = require("./routes/todos");

require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

connectDB();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));
// Sessions
// keep user logged in, even when going from page to page
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
// authenticates the session
app.use(passport.session());

app.use(flash());

// routes
// before signup
app.use("/", mainRoutes);
// after signup or login (where user is directed to once signed up/logged in)
// runs todoRoutes to use the appropriate route
app.use("/todos", todoRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
