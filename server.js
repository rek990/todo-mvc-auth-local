// helps build out API
const express = require("express");
const app = express();
// imports mongoose: heavy lifting for interacting with db
const mongoose = require("mongoose");
// import Passport.js: helps handle authentication (has strategies that help with with login access)
const passport = require("passport");
// import session middleware
// helps with logged in users, helps users stay logged in (cookies)
// creates the cookie
const session = require("express-session");
// helps with logged in users, helps users stay logged in (cookies)
// stores session object in database
const MongoStore = require("connect-mongo")(session);
// helps with notifications on validation (valid email, password fitting criteria, passwords matching, etc.)...flashes to let us know
const flash = require("express-flash");
// logger or debugger...shows us the logs (GET, POST, login, signup, etc.)
const logger = require("morgan");
// allows for connection to db
const connectDB = require("./config/database");
// imports routes for /
const mainRoutes = require("./routes/main");
// imports routes for /todos
const todoRoutes = require("./routes/todos");
// tells Express to use env variables
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

// connect to db
connectDB();

// use EJS
app.set("view engine", "ejs");
// lets Express access public folder
app.use(express.static("public"));
// look at requests and parse what's needed out of request (what bodyParser used to do)
app.use(express.urlencoded({ extended: true }));
// allows for parsing JSON out of requests
app.use(express.json());
// allows for morgan to be used/info to be logged without having to console.log()
app.use(logger("dev"));
// Sessions
// Sets up/use session
// keep user logged in, even when going from page to page
app.use(
  session({
    // randomizing to make strings (cookies) more unique
    // secret can have any value and should be in an .env file
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    // store session info in MongoDB
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
// use passport
app.use(passport.initialize());
// use session authenticates the session
app.use(passport.session());
// use flash
app.use(flash());

// routes (handles requests coming in)
// before signup
// runs mainRoutes to use the appropriate route
app.use("/", mainRoutes);
// after signup or login (where user is directed to once signed up/logged in)
// runs todoRoutes to use the appropriate route
app.use("/todos", todoRoutes);

// start up server to listen on a given port
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
