function protectRoutes(req, res, next) {
  //   User is not authenthicated
  if (!res.locals.isAuth) {
    return res.redirect("/401");
  }

  //   User is trying to acces an /admin page but is not authenticated as admin
  if (req.path.startsWith("/admin") && !res.locals.isAdmin) {
    return res.redirect("/403");
  }

  next();
}

module.exports = protectRoutes;
