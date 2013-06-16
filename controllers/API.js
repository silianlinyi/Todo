var Todo = require('../models/Todo'),
	User = require('../models/User');

/**
 * WebServices API
 */
module.exports = {

	/**
	 * @method loginIn
	 * 登录操作
	 */
	loginIn: function(req, res) {
		var user = req.body;
		User.findOne(user, function(err, doc) {
			if (err) {
				console.log(err);
			}

			// 用户验证成功，将用户名记在session中
			if ( !! doc) {
				req.session.username = user.username;
				console.log("Log: user " + req.session.username + " login success!");
				res.json({
					resultCode: 0,
					description: '登录成功'
				});
			} else {
				res.json({
					resultCode: 1000,
					description: '用户名或密码错误，请重新输入！'
				});
			}
		});
	},

	/**
	 * @method signup
	 * 注册操作
	 */
	signup: function(req, res) {
		var user = req.body;
		res.json(user);
	},

	/**
	 * @method loginOut
	 * 注销操作
	 */
	loginOut: function(req, res) {
		req.session.destroy(function() {
			res.json({
				resultCode: 0,
				description: '注销成功'
			});
		});
	},

	/**
	 * @method addTodo
	 * 添加一条Todo项
	 */
	addTodo: function(req, res) {
		var data = req.body,
			username = req.session.username,
			todo;

		User.findOne({
			username: username
		}, function(err, doc) {
			if (err) {
				console.log(err);
			}

			if ( !! doc) {
				data.user_id = doc._id;
				todo = new Todo(data);
				todo.save(function(err) {
					if (err) {
						console.log(err);
					}
					res.json({
						resultCode: 0,
						description: "添加Todo成功"
					});
				});
			}
		});
	},

	/**
	 * @method deleteTodo
	 * 删除一条Todo项
	 */
	deleteTodo: function(req, res) {
		var query = req.body;

		Todo.remove({
			_id: query._id
		}, function(err, doc) {
			if(err) {
				console.log(err);
			}
			res.json({
				resultCode: 0,
				description: "删除Todo成功"
			});
		});
	},

	/**
	 * @method deleteTodo
	 * 更新一条Todo项
	 */
	updateTodo: function(req, res) {

	},

	/**
	 * @method filterTodos
	 * 根据传入的参数不同，来获取todo项
	 */
	filterTodos: function(req, res) {
		var query = req.query,
			username = req.session.username,
			_id;

		User.findOne({
			username: username
		}, function(err, doc) {
			if (err) {
				console.log(err);
			}
			if ( !! doc) {
				query.user_id = doc._id;
				Todo.find(query, function(err, docs) {
					if (err) {
						console.log(err);
					}
					res.json(docs);
				});
			}
		});
	},

	/**
	 * @method getAllTags
	 * 获取所有的分类列表
	 */
	getAllTags: function(req, res) {
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
	},

	/**
	 * @method star
	 * 获取所有的标星Todo项
	 */
	star: function(req, res) {
		Todo.find({
			star: true
		}, function(err, docs) {
			if (err) {
				console.log(err);
			}
			res.json(docs);
		});
	},

	/**
	 * @method unStar
	 * 获取所有的未标星Todo项
	 */
	unStar: function(req, res) {
		Todo.find({
			star: false
		}, function(err, docs) {
			if (err) {
				console.log(err);
			}
			res.json(docs);
		});
	}
}