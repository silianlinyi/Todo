var models = require('../models');
var Todo = models.Todo;

exports.filterByUser = function(username, callback) {
	if (username.length === 0) {
		return callback(null, []);
	}
	Todo.find({}, callback);
};