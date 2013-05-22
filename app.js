/**
 * Module dependencies.
 */

var express = require('express'),
	http = require('http'),
	path = require('path'),
	mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/TodoApplication', function(err) {
	if(!err) {
		console.log('connected to MongoDB');
	} else {
		throw err;
	}
});
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
	title: String,
	user: String,
	star: Boolean,
	tag: String
});
var Todo = mongoose.model('Todo', TodoSchema);

var app = express();
app.engine('.html', require('ejs').__express);
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}



app.get('/', function(req, res) {
	res.render('index', {
		title: "Todo Application"
	});
});


app.get('/filterTodos', function(req, res) {
	Todo.find(req.query, function(err, docs) {
		if(err) {
			console.log(err);
		}
		res.json(docs);
	});
});





http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});