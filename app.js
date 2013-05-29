/**
 * Module dependencies.
 */
var express = require('express'),
	http = require('http'),
	path = require('path'),
	routes = require('./routes'),
	mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://127.0.0.1/TodoApplication', function(err) {
	if (!err) {
		console.log('connected to MongoDB!');
	} else {
		throw err;
	}
});

var app = express();
// all environments
app.engine('.html', require('ejs').__express);
app.set('port', process.env.PORT || 8888);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('TodoApplication'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

// 路由
routes(app);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});