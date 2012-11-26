var config = require('../config');

exports.index = function(req, res){
  res.render('index', { title: 'Last Player v' + config.version })
};
