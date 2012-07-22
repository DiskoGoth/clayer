module.exports.middleware = function() {

  return function(req, res, next) {

    if (req.session.auth) {
      res.locals.everyauth = req.session.auth;
    } else {
      res.locals.everyauth = {loggedIn: false};
    }
    next();

  };

};
