function addCsrfToken(req, res, next) {
  const csrfToken = req.csrfToken();
  res.locals.csrfToken = csrfToken;
  next();
}

module.exports = addCsrfToken;
