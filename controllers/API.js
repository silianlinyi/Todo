var Todo = require('../models/Todo'),
	User = require('../models/User');

/**
 * [exports description]
 * @type {Object}
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

			// 用户验证成功
			if ( !! doc) {
				req.session.loginName = user.loginName;
				console.log(req.session.loginName);

				res.json({
					resultCode: 0,
					description: 'successful'
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
	},

	/**
	 * @method filterTodos
	 * 根据传入的参数不同，来获取todo项
	 */
	filterTodos: function(req, res) {
		Todo.find(req.query, function(err, docs) {
			if (err) {
				console.log(err);
			}
			res.json(docs);
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
