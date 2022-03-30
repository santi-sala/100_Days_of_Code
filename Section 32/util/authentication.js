// Creating session for loging in
function createUserSession(req, user, action) {
  req.session.uid = user._id.toString();
  // Stroing in the session for the users admin rights
  req.session.isAdmin = user.isAdmin;
  // .save comses from express session package
  req.session.save(action);
}

// Destroying the session when log out
function destroyUserAuthSession(req) {
  req.session.uid = null;
}

module.exports = {
  createUserSession: createUserSession,
  destroyUserAuthSession: destroyUserAuthSession,
};
