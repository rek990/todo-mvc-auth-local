// exports object
module.exports = {
  // method (because it's part of an object)
  ensureAuth: function (req, res, next) {
    // when GET request occurred
    // if user is authenticated (i.e., logged in):
    if (req.isAuthenticated()) {
      // move onto the next thing (proceed to /todos)
      return next();
      // if user is not authenticated:
    } else {
      // redirect user back to home page
      res.redirect("/");
    }
  },
};
