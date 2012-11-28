/**
 * Module dependencies.
 */
var
  http = require('http')
  , express = require('express')
  , routes = require('./routes')
  , routes_auth = require('./routes/auth')
  , auth = require('./lib/auth')
  , locals = require('./lib/locals');

var app = express();

// Configuration
app.configure('all', function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(auth.middleware());
  app.use(locals.middleware());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// Routes
app.get('/', routes.index);
app.get('/config.js', routes.config);
app.get('/auth/check', routes_auth.check);
app.get('/auth/vkontakte/ok', routes_auth.vkontakte_ok);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
