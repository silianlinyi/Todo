var Todo = require('../models/Todo');

/**
 * @method index
 * 渲染index页面
 */
exports.index = function(req, res) {
	res.render('index', {
		title: "Todo Application",
		hasLogin: !!req.session.loginName,
	});
}


exports.todos = function(req, res) {
	res.render('todos', {
		title: "Todos List",
		hasLogin: !!req.session.loginName,
	});
}

/**
 * @method filterTodos
 * 根据传入的参数不同，来获取todo项
 */
exports.filterTodos = function(req, res) {
	Todo.find(req.query, function(err, docs) {
		if (err) {
			console.log(err);
		}
		res.json(docs);
	});
}

/**
 * @method getAllTags
 * 获取所有的分类列表
 */
exports.getAllTags = function(req, res) {
	Todo.find(req.query, function(err, docs) {
		var ret = [];
		if (err) {
			console.log(err);
		}
		for (var i = 0; i < docs.length; i++) {
			if (ret.indexOf(docs[i].tag) === -1) {
				ret.push(docs[i].tag);
			}
		}
		res.send(ret);
	});
}

/**
 * @method star
 * 获取所有的标星Todo项
 */
exports.star = function(req, res) {
	Todo.find({
		star: true
	}, function(err, docs) {
		if (err) {
			console.log(err);
		}
		res.json(docs);
	});
}

/**
 * @method unStar
 * 获取所有的未标星Todo项
 */
exports.unStar = function(req, res) {
	Todo.find({
		star: false
	}, function(err, docs) {
		if (err) {
			console.log(err);
		}
		res.json(docs);
	});
}

/**
 * @method addTodo
 * 添加一条Todo项
 */
exports.addTodo = function(req, res) {
	//create new model
	var todo = new Todo(req.body);

	//save model to MongoDB
	todo.save(function(err) {
		if (err) {
			return err;
		} else {
			console.log("todo saved");
		}
	});

	res.send(req.body);
}