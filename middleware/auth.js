module.exports = {
  ensureAuth: function (req, res, next) {
    // if user is authenticated, proceed to todos
    if (req.isAuthenticated()) {
      return next();
      // else, redirect user back to home page to login
    } else {
      res.redirect("/");
    }
  },
};
