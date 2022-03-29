function createUserSession(req, user, action) {
  req.session.uid = user._id.toString();
  //   .save comses from express session package
  req.session.save(action);
}

module.exports = {
  createUserSession: createUserSession,
};
