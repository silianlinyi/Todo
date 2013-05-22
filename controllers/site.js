var Todo = require('../proxy').Todo;

Todo.filterByUser('kyle', )

exports.index = function(req, res) {



	res.render('index', {
		title: "Todos",
		docs: Todo
	});
}