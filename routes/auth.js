exports.check = function(req, res) {

    if (req.session.auth) {

      res.json({
        error: false,
        data: req.session.auth
      });

    } else {
      res.json({
        error: false,
        data: {
          loggedIn: false
        }
      })
    }
};

exports.vkontakte_ok = function(req, res) {
  res.render('popup/auth/vkontakte_ok');
};
