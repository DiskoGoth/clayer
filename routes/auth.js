// Is it global?
var oauthInfoRequests = [];

exports.longpool = function(req, res) {

    var callback = function(oauthsession){
      res.send(oauthsession);
    };

    if (req.session.auth && req.session.auth.loggedIn) {
      callback(req.session.auth.vkontakte.user);
    } else {
      oauthInfoRequests[req.session.id] = callback;

      res.socket.on('end', function(){ // Browser disconnect; cleanup to avoid memleaks;
        if (oauthInfoRequests[req.session.id]) {
          delete oauthInfoRequests[req.session.id];
        }
      });
    }
};

exports.vkontakte_ok = function(req, res) {

  if (oauthInfoRequests[req.session.id]) {
    oauthInfoRequests[req.session.id](req.session.auth.vkontakte.user);
    delete oauthInfoRequests[req.session.id];
  }

  res.render('popup/auth/vkontakte_ok');

};
